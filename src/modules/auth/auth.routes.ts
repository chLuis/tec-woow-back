import { Router } from "express";
import { create, login } from "./auth.controller";
import { validate } from "../../middleware/validate";
import { createUserSchema, loginUserSchema } from "./auth.schema";

const route = Router()
route.post('/register', validate(createUserSchema), create);
route.post('/login', validate(loginUserSchema), login);


export default route;