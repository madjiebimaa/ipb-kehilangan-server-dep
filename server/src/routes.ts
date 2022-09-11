import { createUserSessionSchema } from "./schemas/session.schema";
import { validateResources } from "./middlewares/validateResources";
import { Express, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  createUserSessionHandler,
  deleteUserSessionHandler,
  getUserSessionHandler,
} from "./controllers/session.controller";
import {
  changePasswordHandler,
  createUserHandler,
  forgotPasswordHandler,
  meUserHandler,
  updateUserHandler,
} from "./controllers/user.controller";
import {
  changePasswordSchema,
  createUserSchema,
  forgotPasswordSchema,
  updateUserSchema,
} from "./schemas/user.schema";
import { requireUser } from "./middlewares/requireUser";
import {
  createPostHandler,
  getPostHandler,
  getPostsHandler,
  updatePostHandler,
} from "./controllers/post.controller";
import {
  createPostSchema,
  getPostSchema,
  getPostsSchema,
  updatePostSchema,
} from "./schemas/post.schema";

export function routes(app: Express) {
  app.get("/api/healthcheck", (_: Request, res: Response) =>
    res.sendStatus(StatusCodes.OK)
  );

  app.post(
    "/api/users",
    validateResources(createUserSchema),
    createUserHandler
  );
  app.get("/api/users", requireUser, meUserHandler);
  app.put(
    "/api/users",
    [requireUser, validateResources(updateUserSchema)],
    updateUserHandler
  );
  app.get(
    "/api/users/forgot-password",
    validateResources(forgotPasswordSchema),
    forgotPasswordHandler
  );
  app.patch(
    "/api/users/change-password",
    validateResources(changePasswordSchema),
    changePasswordHandler
  );

  app.post(
    "/api/sessions",
    validateResources(createUserSessionSchema),
    createUserSessionHandler
  );
  app.get("/api/sessions", requireUser, getUserSessionHandler);
  app.delete("/api/sessions", requireUser, deleteUserSessionHandler);

  app.post(
    "/api/posts",
    [requireUser, validateResources(createPostSchema)],
    createPostHandler
  );
  app.get(
    "/api/posts/:postId",
    validateResources(getPostSchema),
    getPostHandler
  );
  app.get("/api/posts", validateResources(getPostsSchema), getPostsHandler);
  app.put(
    "/api/posts/:postId",
    [requireUser, validateResources(updatePostSchema)],
    updatePostHandler
  );
}
