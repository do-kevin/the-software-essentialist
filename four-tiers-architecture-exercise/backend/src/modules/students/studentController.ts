import { NextFunction, Request, Response, Router } from "express";
import { parseForResponse } from "../../shared/utils";
import { ErrorHandler } from "../../shared/errorExceptionHandler";
import { StudentService } from "./studentService";
import { CreateStudentDTO, FindStudentDTO } from "./studentDTOS";
import { StudentNotFoundException } from "../../shared/exceptions";

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
      const dto = FindStudentDTO.fromRequest(req.params);

      const student = await this.studentService.findStudentById(dto);

      if (!student) {
        throw new StudentNotFoundException();
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
      const dto = CreateStudentDTO.fromRequest(req.body);

      const data = await this.studentService.createStudent(dto);

      res.status(201).json({
        error: undefined,
        data: parseForResponse(data),
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
      const dto = FindStudentDTO.fromRequest(req.params);

      const student = await this.studentService.findStudentExists(dto);

      if (!student) {
        throw new StudentNotFoundException();
      }

      const studentAssignments =
        await this.studentService.findStudentAssignments(dto);

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
      const dto = FindStudentDTO.fromRequest(req.params);

      const student = await this.studentService.findStudentExists(dto);

      if (!student) {
        throw new StudentNotFoundException();
      }

      const studentAssignments =
        await this.studentService.findGradedStudentAssignments(dto);

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
