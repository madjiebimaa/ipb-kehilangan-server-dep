import { createUserSessionSchema } from "./schemas/session.schema";
import { validateResources } from "./middlewares/validateResources";
import { Express, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  createUserSessionHandler,
  deleteUserSessionHandler,
  getUserSessionHandler,
} from "./controllers/session.controller";
import { createUserHandler } from "./controllers/user.controller";
import { createUserSchema } from "./schemas/user.schema";

export function routes(app: Express) {
  app.get("/api/healthcheck", (_: Request, res: Response) =>
    res.sendStatus(StatusCodes.OK)
  );

  app.post(
    "/api/users",
    validateResources(createUserSchema),
    createUserHandler
  );

  app.post(
    "/api/sessions",
    validateResources(createUserSessionSchema),
    createUserSessionHandler
  );
  app.get("/api/sessions", getUserSessionHandler);
  app.delete("/api/sessions", deleteUserSessionHandler);
}
