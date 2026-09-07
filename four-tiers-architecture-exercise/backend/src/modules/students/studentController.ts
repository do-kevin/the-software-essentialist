import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { Errors, isMissingKeys, isUUID, parseForResponse } from "../../shared";
import { ErrorHandler } from "../../shared/errorExceptionHandler";

export class StudentController {
  private router: Router;

  constructor(private db: PrismaClient, private errorHandler: ErrorHandler) {
    this.router = Router();
    this.setupRoutes();
    this.setupErrorHandler();
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

  private setupErrorHandler() {
    this.router.use(this.errorHandler);
  }

  getStudents = async (req: Request, res: Response, next: NextFunction) => {
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
      next(error);
    }
  };

  getStudentById = async (req: Request, res: Response, next: NextFunction) => {
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
      next(error);
    }
  };

  createStudent = async (req: Request, res: Response, next: NextFunction) => {
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
      next(error);
    }
  };

  getStudentAssignments = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
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
      next(error);
    }
  };

  getStudentGrades = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
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
      next(error);
    }
  };
}
