import { Express, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  createUserSessionHandler,
  deleteUserSessionHandler,
  getUserSessionHandler,
} from "./controllers/session.controller";
import { createUserHandler } from "./controllers/user.controller";

export function routes(app: Express) {
  app.get("/api/healthcheck", (_: Request, res: Response) =>
    res.sendStatus(StatusCodes.OK)
  );

  app.post("/api/users", createUserHandler);

  app.post("/api/sessions", createUserSessionHandler);
  app.get("/api/sessions", getUserSessionHandler);
  app.delete("/api/sessions", deleteUserSessionHandler);
}
