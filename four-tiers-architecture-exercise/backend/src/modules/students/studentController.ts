import { NextFunction, Request, Response, Router } from "express";
import { Errors } from "../../shared";
import { isMissingKeys, isUUID, parseForResponse } from "../../shared/utils";
import { ErrorHandler } from "../../shared/errorExceptionHandler";
import { StudentService } from "./studentService";

export class StudentController {
  private router: Router;

  constructor(
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
      const students = await this.studentService.findStudents();

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
      const student = await this.studentService.findStudentById(id);

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

      const student = await this.studentService.createStudent(name);

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

      const student = await this.studentService.findStudentExists(id);

      if (!student) {
        return res.status(404).json({
          error: Errors.StudentNotFound,
          data: undefined,
          success: false,
        });
      }

      const studentAssignments =
        await this.studentService.findStudentAssignments(id);

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

      const student = await this.studentService.findStudentExists(id);

      if (!student) {
        return res.status(404).json({
          error: Errors.StudentNotFound,
          data: undefined,
          success: false,
        });
      }

      const studentAssignments =
        await this.studentService.findGradedStudentAssignments(id);

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
