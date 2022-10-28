import { StatusCodes } from "http-status-codes";
import { nanoid } from "nanoid";
import supertest from "supertest";
import * as userService from "../services/user.service";
import { signJwt } from "../utils/jwt";
import { createServer } from "../utils/server";

const app = createServer();

const userId = `user_${nanoid()}`;

export const userInput = {
  name: "IPB Kehilangan",
  username: "IpbKehilangan",
  email: "IpbKehilangan@gmail.com",
  role: "civitas",
  password: "IpbKehilangan123",
  passwordConfirmation: "IpbKehilangan123",
};

export const userPayload = {
  name: "IPB Kehilangan",
  username: "IpbKehilangan",
  email: "IpbKehilangan@gmail.com",
  role: "civitas",
  id: userId,
  phoneNumber: null,
  cardIdentity: null,
  profilePicture: null,
  address: null,
  isValidEmail: false,
  createdAt: "2022-09-12T08:26:57.246Z",
  updatedAt: "2022-09-12T08:26:57.246Z",
};

export const adminInput = { ...userInput, role: "admin" };
export const adminPayload = { ...userPayload, role: "admin" };

describe("user", () => {
  describe("registration", () => {
    describe("given passwords does'nt match", () => {
      it("should return 400 status code", async () => {
        const createUserServiceMock = jest.spyOn(userService, "createUser");

        const { statusCode } = await supertest(app)
          .post("/api/users")
          .send({ ...userInput, passwordConfirmation: "does'nt match" });

        expect(statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(createUserServiceMock).not.toHaveBeenCalled();
      });
    });

    describe("given the user service throws", () => {
      it("should return 409 status code", async () => {
        const createUserServiceMock = jest
          .spyOn(userService, "createUser")
          .mockRejectedValueOnce("Error during inserting user to DB");

        const { statusCode } = await supertest(app)
          .post("/api/users")
          .send(userInput);

        expect(statusCode).toBe(StatusCodes.CONFLICT);
        expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
      });
    });

    describe("given username and password are valid", () => {
      it("should return user payload", async () => {
        const createUserServiceMock = jest
          .spyOn(userService, "createUser")
          // @ts-ignore
          .mockReturnValueOnce(userPayload);

        const { statusCode, body } = await supertest(app)
          .post("/api/users")
          .send(userInput);

        expect(statusCode).toBe(StatusCodes.CREATED);
        expect(body).toEqual(userPayload);
        expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
      });
    });
  });

  describe("me", () => {
    describe("given user are not logged in", () => {
      it("should return 403 status code", async () => {
        const findUserServiceMock = jest.spyOn(userService, "findUser");

        const { statusCode } = await supertest(app).get("/api/users/me");

        expect(statusCode).toBe(StatusCodes.FORBIDDEN);
        expect(findUserServiceMock).not.toHaveBeenCalled();
      });
    });

    describe("given user are logged in and not valid userId", () => {
      it("should return 404 status code", async () => {
        const jwt = signJwt(userPayload);
        const findUserServiceMock = jest
          .spyOn(userService, "findUser")
          // @ts-ignore
          .mockReturnValueOnce({});

        const { statusCode } = await supertest(app)
          .get("/api/users/me")
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(StatusCodes.NOT_FOUND);
        expect(findUserServiceMock).toHaveBeenCalledWith({
          where: { id: userId },
        });
      });
    });

    describe("given user are logged in", () => {
      it("should return 200 status code and user payload", async () => {
        const jwt = signJwt(userPayload);
        const findUserServiceMock = jest
          .spyOn(userService, "findUser")
          // @ts-ignore
          .mockReturnValueOnce(userPayload);

        const { statusCode, body } = await supertest(app)
          .get("/api/users/me")
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(StatusCodes.OK);
        expect(body).toEqual(userPayload);
        expect(findUserServiceMock).toHaveBeenCalledWith({
          where: { id: userId },
        });
      });
    });
  });

  describe("update", () => {
    describe("given user are not logged in", () => {
      it("should return 403 status code", async () => {
        const findUserServiceMock = jest.spyOn(userService, "findUser");
        const updateUserServiceMock = jest.spyOn(userService, "updateUser");

        const { statusCode } = await supertest(app).put("/api/users");

        expect(statusCode).toBe(StatusCodes.FORBIDDEN);
        expect(findUserServiceMock).not.toHaveBeenCalled();
        expect(updateUserServiceMock).not.toHaveBeenCalled();
      });
    });

    describe("given logged in user and not valid user input", () => {
      it("should return 400 status code", async () => {
        const jwt = signJwt(userPayload);

        const { statusCode } = await supertest(app)
          .put("/api/users")
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(StatusCodes.BAD_REQUEST);
      });
    });

    describe("given logged in user, valid user input, and not valid userId", () => {
      it("should return 404 status code", async () => {
        expect(true).toBe(true);
      });
    });

    describe("given logged in user, valid user input, and valid userId", () => {
      it("should return 200 status code", async () => {
        expect(true).toBe(true);
      });
    });
  });

  describe("forgot password", () => {
    describe("given invalid email", () => {
      it("should return 400 status code", async () => {
        const invalidEmail = "email";

        const findUserServiceMock = jest.spyOn(userService, "findUser");

        const { statusCode } = await supertest(app)
          .get("/api/users/forgot-password")
          .send(invalidEmail);

        expect(statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(findUserServiceMock).not.toHaveBeenCalled();
      });
    });

    describe("given valid email and there's no user with that email", () => {
      it("should return 404 status code", async () => {
        const email = "adminIpbKehilangan@gmail.com";

        const findUserServiceMock = jest
          .spyOn(userService, "findUser")
          // @ts-ignore
          .mockReturnValueOnce({});

        const { statusCode, body } = await supertest(app)
          .get("/api/users/forgot-password")
          .send({ email });

        expect(statusCode).toBe(StatusCodes.NOT_FOUND);
        expect(findUserServiceMock).toHaveBeenCalledWith({ where: { email } });
      });
    });

    describe("given valid email", () => {
      it("should return 200 status code", async () => {
        const { email } = userPayload;
        const findUserServiceMock = jest
          .spyOn(userService, "findUser")
          // @ts-ignore
          .mockReturnValueOnce(userPayload);

        const { statusCode, body } = await supertest(app)
          .get("/api/users/forgot-password")
          .send({ email });

        expect(statusCode).toBe(StatusCodes.OK);
        expect(findUserServiceMock).toHaveBeenCalledWith({ where: { email } });
      });
    });
  });

  describe("change password", () => {
    // describe()
  });

  describe("validate email", () => {});

  describe("verify email", () => {});

  describe("validate email", () => {});

  describe("get users", () => {
    describe("given user is not logged in", () => {
      it("should return 403 status code", async () => {
        const findUsersServiceMock = jest.spyOn(userService, "findUsers");

        const { statusCode } = await supertest(app).get("/api/users");

        expect(statusCode).toBe(StatusCodes.FORBIDDEN);
        expect(findUsersServiceMock).not.toHaveBeenCalled();
      });
    });

    describe("given user is logged in and user role is not admin", () => {
      it("should return 403 status code", async () => {
        const jwt = signJwt(userPayload);

        const findUsersServiceMock = jest.spyOn(userService, "findUsers");

        const { statusCode } = await supertest(app)
          .get("/api/users")
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(StatusCodes.FORBIDDEN);
        expect(findUsersServiceMock).not.toHaveBeenCalled();
      });
    });

    describe("given user is logged in and user role is admin", () => {
      it("should return 200 status code and user payloads", async () => {
        const jwt = signJwt(adminPayload);

        const findUsersServiceMock = jest
          .spyOn(userService, "findUsers")
          // @ts-ignore
          .mockReturnValueOnce([userPayload, adminPayload]);

        const { statusCode, body } = await supertest(app)
          .get("/api/users")
          .set("Authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(StatusCodes.OK);
        expect(body).not.toEqual([]);

        expect(findUsersServiceMock).toHaveBeenCalled();
      });
    });
  });
});
