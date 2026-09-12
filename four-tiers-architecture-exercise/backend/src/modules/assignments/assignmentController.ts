import { NextFunction, Request, Response, Router } from "express";
import { Errors } from "../../shared";
import { isMissingKeys, isUUID, parseForResponse } from "../../shared/utils";
import { ErrorHandler } from "../../shared/errorExceptionHandler";
import { AssignmentService } from "./assignmentService";
import { StudentService } from "../students/studentService";
import {
  CreateAssignmentDTO,
  FindAssignmentDTO,
  SetAssignmentGradeDTO,
  SetStudentToAssignmentDTO,
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
    this.router.get("/:id", this.getAssignment);
    this.router.post("/student-assignments", this.postStudentToAssignment);
    this.router.post(
      "/student-assignments/submit",
      this.setStudentAssignmentSubmission
    );
    this.router.post("/student-assignments/grade", this.setAssignmentGrade);
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

      const assignment = await this.assignmentService.createNewAssignment(dto);

      res.status(201).json({
        error: undefined,
        data: parseForResponse(assignment),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  getAssignment = async (req: Request, res: Response, next: NextFunction) => {
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

  postStudentToAssignment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let dto = SetStudentToAssignmentDTO.fromRequest(req.body);

      const findStudentDTO = FindStudentDTO.fromRequest({
        id: dto.studentId,
      });

      const student = await this.studentService.findStudentExists(
        findStudentDTO
      );

      if (!student) {
        return res.status(404).json({
          error: Errors.StudentNotFound,
          data: undefined,
          success: false,
        });
      }

      const assignment = await this.assignmentService.findAssignmentExists({
        id: dto.assignmentId,
      });

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

  setStudentAssignmentSubmission = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let dto = FindAssignmentDTO.fromRequest(req.body);

      const studentAssignment =
        await this.assignmentService.findStudentAssignment(dto);

      if (!studentAssignment) {
        return res.status(404).json({
          error: Errors.AssignmentNotFound,
          data: undefined,
          success: false,
        });
      }

      dto = UpdateStudentAssignmentDTO.fromRequest(req.body);

      const studentAssignmentUpdated =
        await this.assignmentService.updateAssignmentToSubmit(dto);

      res.status(200).json({
        error: undefined,
        data: parseForResponse(studentAssignmentUpdated),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  setAssignmentGrade = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const dto = SetAssignmentGradeDTO.fromRequest(req.body);

      const findStudentAssignmentDTO = FindAssignmentDTO.fromRequest(req.body);

      const studentAssignment =
        await this.assignmentService.findStudentAssignment(
          findStudentAssignmentDTO
        );

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
