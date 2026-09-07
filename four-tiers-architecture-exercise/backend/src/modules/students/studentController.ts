import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { Errors, isMissingKeys, isUUID, parseForResponse } from "../../shared";

export class StudentController {
  private router: Router;

  constructor(private db: PrismaClient) {
    this.router = Router();
    this.setupRoutes();
  }

  getRouter = () => {
    return this.router;
  };

  private setupRoutes() {
    this.router.get("/", this.getStudents);
    this.router.get("/:id", this.getStudentById);
    this.router.post("/", this.createStudent);
    this.router.get("/:id/assignments", this.getStudentAssignments);
    this.router.get("/:id/grades", this.getStudentGrades);
  }

  getStudents = async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const students = await this.db.student.findMany({
        include: {
          classes: true,
          assignments: true,
          reportCards: true,
        },
        orderBy: {
          name: "asc",
        },
      });
      res.status(200).json({
        error: undefined,
        data: parseForResponse(students),
        success: true,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: Errors.ServerError, data: undefined, success: false });
    }
  };

  getStudentById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!isUUID(id)) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }
      const student = await this.db.student.findUnique({
        where: {
          id,
        },
        include: {
          classes: true,
          assignments: true,
          reportCards: true,
        },
      });

      if (!student) {
        return res.status(404).json({
          error: Errors.StudentNotFound,
          data: undefined,
          success: false,
        });
      }

      res.status(200).json({
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

      const student = await this.db.student.create({
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

  getStudentAssignments = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!isUUID(id)) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      // check if student exists
      const student = await this.db.student.findUnique({
        where: {
          id,
        },
      });

      if (!student) {
        return res.status(404).json({
          error: Errors.StudentNotFound,
          data: undefined,
          success: false,
        });
      }

      const studentAssignments = await this.db.studentAssignment.findMany({
        where: {
          studentId: id,
          status: "submitted",
        },
        include: {
          assignment: true,
        },
      });

      res.status(200).json({
        error: undefined,
        data: parseForResponse(studentAssignments),
        success: true,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: Errors.ServerError, data: undefined, success: false });
    }
  };

  getStudentGrades = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!isUUID(id)) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      // check if student exists
      const student = await this.db.student.findUnique({
        where: {
          id,
        },
      });

      if (!student) {
        return res.status(404).json({
          error: Errors.StudentNotFound,
          data: undefined,
          success: false,
        });
      }

      const studentAssignments = await this.db.studentAssignment.findMany({
        where: {
          studentId: id,
          status: "submitted",
          grade: {
            not: null,
          },
        },
        include: {
          assignment: true,
        },
      });

      res.status(200).json({
        error: undefined,
        data: parseForResponse(studentAssignments),
        success: true,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: Errors.ServerError, data: undefined, success: false });
    }
  };
}
