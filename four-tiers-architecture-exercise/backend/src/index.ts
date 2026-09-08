import express from "express";
import { PrismaClient } from "@prisma/client";
// import { Student, Class, Assignment, StudentAssignment } from "@prisma/client";

import { AssignmentController } from "./modules/assignments/assignmentController";
import { ClassController } from "./modules/classes/classController";
import { StudentController } from "./modules/students/studentController";
import { ErrorExceptionHandler } from "./shared/errorExceptionHandler";
import { StudentService } from "./modules/students/studentService";
import { ClassService } from "./modules/classes/classService";
import { AssignmentService } from "./modules/assignments/assignmentService";
import Database from "./database";

const cors = require("cors");
const app = express();

const prisma = new PrismaClient();

const database = new Database(prisma);

const router = express.Router();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

const errorExceptionHandler = new ErrorExceptionHandler();

const studentService = new StudentService(database);

const studentController = new StudentController(
  studentService,
  errorExceptionHandler.handle
);
app.use("/students", studentController.getRouter());

const classService = new ClassService();
const assignmentService = new AssignmentService();

const classController = new ClassController(
  classService,
  assignmentService,
  studentService,
  errorExceptionHandler.handle
);
app.use("/classes", classController.getRouter());

const assignmentController = new AssignmentController(
  assignmentService,
  studentService,
  errorExceptionHandler.handle
);
app.use("/assignments", assignmentController.getRouter());

app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
