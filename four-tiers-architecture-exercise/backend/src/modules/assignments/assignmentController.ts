import { NextFunction, Request, Response, Router } from "express";
import { Errors } from "../../shared";
import { parseForResponse } from "../../shared/utils";
import { ErrorHandler } from "../../shared/errorExceptionHandler";
import { AssignmentService } from "./assignmentService";
import { StudentService } from "../students/studentService";
import {
  CreateAssignmentDTO,
  CreateStudentAssignmentDTO,
  FindAssignmentDTO,
  UpdateAssignmentGradeDTO,
  UpdateStudentAssignmentDTO,
} from "./assignmentDTOS";
import { FindStudentDTO } from "../students/studentDTOS";

export class AssignmentController {
  private router: Router;

  constructor(
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
    this.router.post("/", this.createAssignment);
    this.router.get("/:id", this.findAssignment);
    this.router.post("/student-assignments", this.createStudentAssignment);
    this.router.post(
      "/student-assignments/submit",
      this.submitStudentAssignment
    );
    this.router.post("/student-assignments/grade", this.updateAssignmentGrade);
  }

  private setupErrorHandler() {
    this.router.use(this.errorHandler);
  }

  createAssignment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const dto = CreateAssignmentDTO.fromRequest(req.body);

      const assignment = await this.assignmentService.createAssignment(dto);

      res.status(201).json({
        error: undefined,
        data: parseForResponse(assignment),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  findAssignment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = FindAssignmentDTO.fromRequest(req.params);

      const assignment = await this.assignmentService.findAssignment(dto);

      if (!assignment) {
        return res.status(404).json({
          error: Errors.AssignmentNotFound,
          data: undefined,
          success: false,
        });
      }

      res.status(200).json({
        error: undefined,
        data: parseForResponse(assignment),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  createStudentAssignment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const dto = CreateStudentAssignmentDTO.fromRequest(req.body);

      const findStudentDto = FindStudentDTO.fromRequest({
        id: dto.studentId,
      });

      const student = await this.studentService.findStudentExists(
        findStudentDto
      );

      if (!student) {
        return res.status(404).json({
          error: Errors.StudentNotFound,
          data: undefined,
          success: false,
        });
      }

      const findAssignmentDto = FindAssignmentDTO.fromRequest({
        id: dto.assignmentId,
      });

      const assignment = await this.assignmentService.findAssignmentExists(
        findAssignmentDto
      );

      if (!assignment) {
        return res.status(404).json({
          error: Errors.AssignmentNotFound,
          data: undefined,
          success: false,
        });
      }

      const studentAssignment =
        await this.assignmentService.createStudentAssignment(dto);

      res.status(201).json({
        error: undefined,
        data: parseForResponse(studentAssignment),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  submitStudentAssignment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const findDto = FindAssignmentDTO.fromRequest(req.body);

      const studentAssignment =
        await this.assignmentService.findStudentAssignmentExists(findDto);

      if (!studentAssignment) {
        return res.status(404).json({
          error: Errors.AssignmentNotFound,
          data: undefined,
          success: false,
        });
      }

      const updateDto = UpdateStudentAssignmentDTO.fromRequest(req.body);

      const studentAssignmentUpdated =
        await this.assignmentService.submitStudentAssignment(updateDto);

      res.status(200).json({
        error: undefined,
        data: parseForResponse(studentAssignmentUpdated),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  updateAssignmentGrade = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const dto = UpdateAssignmentGradeDTO.fromRequest(req.body);

      const findDto = FindAssignmentDTO.fromRequest(req.body);

      const studentAssignment =
        await this.assignmentService.findStudentAssignmentExists(findDto);

      if (!studentAssignment) {
        return res.status(404).json({
          error: Errors.AssignmentNotFound,
          data: undefined,
          success: false,
        });
      }

      const studentAssignmentUpdated =
        await this.assignmentService.updateAssignmentGrade(dto);

      res.status(200).json({
        error: undefined,
        data: parseForResponse(studentAssignmentUpdated),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
}
