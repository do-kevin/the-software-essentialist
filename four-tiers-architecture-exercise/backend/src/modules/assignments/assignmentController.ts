import { NextFunction, Request, Response, Router } from "express";
import { Errors } from "../../shared";
import { isMissingKeys, isUUID, parseForResponse } from "../../shared/utils";
import { ErrorHandler } from "../../shared/errorExceptionHandler";
import { AssignmentService } from "./assignmentService";
import { StudentService } from "../students/studentService";

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
      if (isMissingKeys(req.body, ["classId", "title"])) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      const { classId, title } = req.body;

      const assignment = await this.assignmentService.createNewAssignment({
        classId,
        title,
      });

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
      const { id } = req.params;
      if (!isUUID(id)) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }
      const assignment = await this.assignmentService.findAssignment(id);

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
      if (isMissingKeys(req.body, ["studentId", "assignmentId"])) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      const { studentId, assignmentId, grade } = req.body;

      const student = await this.studentService.findStudentExists(studentId);

      if (!student) {
        return res.status(404).json({
          error: Errors.StudentNotFound,
          data: undefined,
          success: false,
        });
      }

      const assignment = await this.assignmentService.findAssignmentExists(
        assignmentId
      );

      if (!assignment) {
        return res.status(404).json({
          error: Errors.AssignmentNotFound,
          data: undefined,
          success: false,
        });
      }

      const studentAssignment =
        await this.assignmentService.createStudentAssignment({
          studentId,
          assignmentId,
        });

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
      if (isMissingKeys(req.body, ["id"])) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      const { id } = req.body;

      const studentAssignment =
        await this.assignmentService.findStudentAssignment(id);

      if (!studentAssignment) {
        return res.status(404).json({
          error: Errors.AssignmentNotFound,
          data: undefined,
          success: false,
        });
      }

      const studentAssignmentUpdated =
        await this.assignmentService.updateAssignmentToSubmit(id);

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
      if (isMissingKeys(req.body, ["id", "grade"])) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      const { id, grade } = req.body;

      if (!["A", "B", "C", "D"].includes(grade)) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      const studentAssignment =
        await this.assignmentService.findStudentAssignment(id);

      if (!studentAssignment) {
        return res.status(404).json({
          error: Errors.AssignmentNotFound,
          data: undefined,
          success: false,
        });
      }

      const studentAssignmentUpdated =
        await this.assignmentService.updateAssignmentGrade({
          id,
          grade,
        });

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
