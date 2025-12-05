import { Router } from "express";
import { create, login } from "@/modules/auth/auth.controller.js";
import { validate } from "@/middleware/validate.js";
import { createUserSchema, loginUserSchema } from "@/modules/auth/auth.schema.js";

const route = Router()
route.post('/register', validate(createUserSchema), create);
route.post('/login', validate(loginUserSchema), login);


export default route;