import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import { Errors, isMissingKeys, isUUID, parseForResponse } from "../../shared";

export class ClassController {
  private router: Router;

  constructor(private db: PrismaClient) {
    this.router = Router();
    this.setupRoutes();
  }

  getRouter = () => {
    return this.router;
  };

  private setupRoutes() {
    this.router.post("/classes", this.createClass);
    this.router.get("/classes/:id/assignments", this.getAssignmentsFromClass);
    this.router.post("/class-enrollments", this.postStudentToClass);
  }

  createClass = async (req: Request, res: Response) => {
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
      res
        .status(500)
        .json({ error: Errors.ServerError, data: undefined, success: false });
    }
  };

  getAssignmentsFromClass = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!isUUID(id)) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      // check if class exists
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
      res
        .status(500)
        .json({ error: Errors.ServerError, data: undefined, success: false });
    }
  };

  postStudentToClass = async (req: Request, res: Response) => {
    try {
      if (isMissingKeys(req.body, ["studentId", "classId"])) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      const { studentId, classId } = req.body;

      // check if student exists
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

      // check if class exists
      const cls = await this.db.class.findUnique({
        where: {
          id: classId,
        },
      });

      // check if student is already enrolled in class
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
      res
        .status(500)
        .json({ error: Errors.ServerError, data: undefined, success: false });
    }
  };
}
