import { Request } from "express-serve-static-core";
console.log("Hello Request !!!!!!!!!!!!!");
declare module "express-serve-static-core" {
  interface Request {
    validatedBody?: any;
    userId?: string;
    role?: string;
  }
}
