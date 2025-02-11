import _ from "lodash";

import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const contentType = req.headers["content-type"]!;

      if (contentType.includes("application/json")) {
        // It's JSON data
        schema.parse(req.body);
        req.cleanBody = _.pick(req.body, Object.keys(schema.shape));
        next();
      } else if (contentType.includes("multipart/form-data")) {
        // It's FormData
        req.cleanBody = _.pick(
          { ...req.body },
          Object.keys(schema.shape)
        );
        schema.parse(req.cleanBody)
        next()
      } else {
        console.log("Unknown content type");
        throw Error("Unknown content type")
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        res
          .status(400)
          .json({ message: "Invalid data", details: errorMessages });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  };
}
