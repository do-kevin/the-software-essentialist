import { NextFunction, Request, Response, Router } from "express";
import { Errors } from "../../shared";
import { parseForResponse } from "../../shared/utils";
import { ErrorHandler } from "../../shared/errorExceptionHandler";
import { ClassService } from "./classService";
import { AssignmentService } from "../assignments/assignmentService";
import { StudentService } from "../students/studentService";
import {
  CreateClassDTO,
  CreateClassEnrollmentDTO,
  FindClassDTO,
} from "./classDTOS";
import { FindAssignmentsByClassDTO } from "../assignments/assignmentDTOS";
import { FindStudentDTO } from "../students/studentDTOS";

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
    this.router.get("/:id/assignments", this.findAssignmentsByClass);
    this.router.post("/class-enrollments", this.createClassEnrollment);
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

  findAssignmentsByClass = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const findClassDto = FindClassDTO.fromRequest(req.params);

      const cls = await this.classService.findClassById(findClassDto);

      if (!cls) {
        return res.status(404).json({
          error: Errors.ClassNotFound,
          data: undefined,
          success: false,
        });
      }

      const findAssignmentsDto = FindAssignmentsByClassDTO.fromRequest(
        req.params
      );

      const assignments = await this.assignmentService.findAssignmentsByClass(
        findAssignmentsDto
      );

      res.status(200).json({
        error: undefined,
        data: parseForResponse(assignments),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  createClassEnrollment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const dto = CreateClassEnrollmentDTO.fromRequest(req.body);

      const findStudentDto = FindStudentDTO.fromRequest({ id: dto.studentId });
      const student = await this.studentService.findStudentById(findStudentDto);

      if (!student) {
        return res.status(404).json({
          error: Errors.StudentNotFound,
          data: undefined,
          success: false,
        });
      }

      const findClassDto = FindClassDTO.fromRequest({ id: dto.classId });
      const cls = await this.classService.findClassById(findClassDto);

      if (!cls) {
        return res.status(404).json({
          error: Errors.ClassNotFound,
          data: undefined,
          success: false,
        });
      }

      const duplicateEnrollment =
        await this.classService.findExistingClassEnrollment(dto);

      if (duplicateEnrollment) {
        return res.status(400).json({
          error: Errors.StudentAlreadyEnrolled,
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
