import { Server } from "./server";
import { PrismaClient } from "@prisma/client";
import { AssignmentController } from "./modules/assignments/assignmentController";
import { ClassController } from "./modules/classes/classController";
import { StudentController } from "./modules/students/studentController";
import { ErrorExceptionHandler } from "./shared/errorExceptionHandler";
import { StudentService } from "./modules/students/studentService";
import { ClassService } from "./modules/classes/classService";
import { AssignmentService } from "./modules/assignments/assignmentService";
import Database from "./database";

const prisma = new PrismaClient();

const database = new Database(prisma);

const errorExceptionHandler = new ErrorExceptionHandler();

const studentService = new StudentService(database);

const studentController = new StudentController(
  studentService,
  errorExceptionHandler.handle
);

const classService = new ClassService(database);
const assignmentService = new AssignmentService(database);

const classController = new ClassController(
  classService,
  assignmentService,
  studentService,
  errorExceptionHandler.handle
);

const assignmentController = new AssignmentController(
  assignmentService,
  studentService,
  errorExceptionHandler.handle
);

const server = new Server(
  studentController,
  classController,
  assignmentController
);

export { server };
