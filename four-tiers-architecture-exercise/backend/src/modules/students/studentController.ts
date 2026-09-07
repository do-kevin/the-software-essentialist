import { PrismaClient } from "@prisma/client";
import { prisma } from "../../database";
import { Request, Response } from "express";
import { Errors, isMissingKeys, parseForResponse } from "../../shared";

class StudentController {
  constructor(private prisma: PrismaClient) {}

  // POST student created
  createStudent = async (req: Request, res: Response) => {
    try {
      if (isMissingKeys(req.body, ["name"])) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      const { name } = req.body;

      const student = await this.prisma.student.create({
        data: {
          name,
        },
      });

      res.status(201).json({
        error: undefined,
        data: parseForResponse(student),
        success: true,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: Errors.ServerError, data: undefined, success: false });
    }
  };
}

export default new StudentController(prisma);
