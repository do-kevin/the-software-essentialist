import { NextFunction, Request, Response, Router } from "express";
import { Errors } from "../../shared";
import { parseForResponse } from "../../shared/utils";
import { ErrorHandler } from "../../shared/errorExceptionHandler";
import { ClassService } from "./classService";
import { AssignmentService } from "../assignments/assignmentService";
import { StudentService } from "../students/studentService";
import {
  CreateClassDTO,
  FindClassDTO,
  FindClassEnrollmentDTO,
} from "./classDTOS";
import { FindClassAssignmentsDTO } from "../assignments/assignmentDTOS";

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
      const dto = CreateClassDTO.fromRequest(req.body);

      const cls = await this.classService.createClass(dto);

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
      let dto = FindClassDTO.fromRequest(req.params);

      const cls = await this.classService.findClassById(dto);

      if (!cls) {
        return res.status(404).json({
          error: Errors.ClassNotFound,
          data: undefined,
          success: false,
        });
      }

      dto = FindClassAssignmentsDTO.fromRequest(req.params);

      const assignments =
        await this.assignmentService.findManyAssignmentsByClassId(dto);

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
      let dto = FindClassEnrollmentDTO.fromRequest(req.body);

      const student = await this.studentService.findStudentById({
        id: dto.studentId,
      });

      if (!student) {
        return res.status(404).json({
          error: Errors.StudentNotFound,
          data: undefined,
          success: false,
        });
      }

      const cls = await this.classService.findClassById({ id: dto.classId });

      const duplicatedClassEnrollment =
        await this.classService.findFirstClassEnrollment(dto);

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

      const data = await this.classService.createClassEnrollment(dto);

      res.status(201).json({
        error: undefined,
        data: parseForResponse(data),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
}
