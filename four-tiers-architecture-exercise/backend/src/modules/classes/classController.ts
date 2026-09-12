import { NextFunction, Request, Response, Router } from "express";
import { Errors } from "../../shared";
import { isMissingKeys, isUUID, parseForResponse } from "../../shared/utils";
import { ErrorHandler } from "../../shared/errorExceptionHandler";
import { ClassService } from "./classService";
import { AssignmentService } from "../assignments/assignmentService";
import { StudentService } from "../students/studentService";

export class ClassController {
  private router: Router;

  constructor(
    private classService: ClassService,
    private assignmentService: AssignmentService,
    private studentService: StudentService,
    private errorHandler: ErrorHandler
  ) {
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

      const cls = await this.classService.createClass(name);

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

      const cls = await this.classService.findClassById(id);

      if (!cls) {
        return res.status(404).json({
          error: Errors.ClassNotFound,
          data: undefined,
          success: false,
        });
      }

      const assignments =
        await this.assignmentService.findManyAssignmentsByClassId(id);

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

      const student = await this.studentService.findStudentById(studentId);

      if (!student) {
        return res.status(404).json({
          error: Errors.StudentNotFound,
          data: undefined,
          success: false,
        });
      }

      const cls = await this.classService.findClassById(classId);

      const duplicatedClassEnrollment =
        await this.classService.findFirstClassEnrollment({
          studentId,
          classId,
        });

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

      const classEnrollment = await this.classService.createClassEnrollment({
        studentId,
        classId,
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
