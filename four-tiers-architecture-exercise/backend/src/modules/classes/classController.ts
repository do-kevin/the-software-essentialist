import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import { Errors, isMissingKeys, isUUID, parseForResponse } from "../../shared";
import { ErrorHandler } from "../../shared/errorExceptionHandler";

export class ClassController {
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
    this.router.post("/", this.createClass);
    this.router.get("/:id/assignments", this.getAssignmentsFromClass);
    this.router.post("/class-enrollments", this.postStudentToClass);
  }

  private setupErrorHandler() {
    this.router.use(this.errorHandler);
  }

  createClass = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (isMissingKeys(req.body, ["name"])) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      const { name } = req.body;

      const cls = await this.db.class.create({
        data: {
          name,
        },
      });

      res
        .status(201)
        .json({ error: undefined, data: parseForResponse(cls), success: true });
    } catch (error) {
      next(error);
    }
  };

  getAssignmentsFromClass = async (
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

      const cls = await this.db.class.findUnique({
        where: {
          id,
        },
      });

      if (!cls) {
        return res.status(404).json({
          error: Errors.ClassNotFound,
          data: undefined,
          success: false,
        });
      }

      const assignments = await this.db.assignment.findMany({
        where: {
          classId: id,
        },
        include: {
          class: true,
          studentTasks: true,
        },
      });

      res.status(200).json({
        error: undefined,
        data: parseForResponse(assignments),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  postStudentToClass = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (isMissingKeys(req.body, ["studentId", "classId"])) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      const { studentId, classId } = req.body;

      const student = await this.db.student.findUnique({
        where: {
          id: studentId,
        },
      });

      if (!student) {
        return res.status(404).json({
          error: Errors.StudentNotFound,
          data: undefined,
          success: false,
        });
      }

      const cls = await this.db.class.findUnique({
        where: {
          id: classId,
        },
      });

      const duplicatedClassEnrollment = await this.db.classEnrollment.findFirst(
        {
          where: {
            studentId,
            classId,
          },
        }
      );

      if (duplicatedClassEnrollment) {
        return res.status(400).json({
          error: Errors.StudentAlreadyEnrolled,
          data: undefined,
          success: false,
        });
      }

      if (!cls) {
        return res.status(404).json({
          error: Errors.ClassNotFound,
          data: undefined,
          success: false,
        });
      }

      const classEnrollment = await this.db.classEnrollment.create({
        data: {
          studentId,
          classId,
        },
      });

      res.status(201).json({
        error: undefined,
        data: parseForResponse(classEnrollment),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
}
