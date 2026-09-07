import express, { Request, Response } from "express";
import { prisma } from "./database";
// import { Student, Class, Assignment, StudentAssignment } from "@prisma/client";
// import { error } from "console";
import { Errors, isMissingKeys, isUUID, parseForResponse } from "./shared";
import StudentController from "./modules/students/studentController";
import ClassController from "./modules/classes/classController";
import AssignmentController from "./modules/assignments/assignmentController";

const cors = require("cors");
const app = express();
const router = express.Router();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

router.get("/students", StudentController.getStudents);
router.get("/students/:id", StudentController.getStudentById);
router.post("/students", StudentController.createStudent);
router.get("/student/:id/assignments", StudentController.getStudentAssignments);
router.get("/student/:id/grades", StudentController.getStudentGrades);
router.post("/classes", ClassController.createClass);
router.get("/classes/:id/assignments", ClassController.getAssignmentsFromClass);
router.post("/class-enrollments", ClassController.postStudentToClass);
router.post("/assignments", AssignmentController.createAssignment);
router.get("/assignments/:id", AssignmentController.getAssignment);
router.post(
  "/student-assignments",
  AssignmentController.postStudentToAssignment
);
router.post(
  "/student-assignments/submit",
  AssignmentController.setStudentAssignmentSubmission
);
router.post(
  "/student-assignments/grade",
  AssignmentController.setAssignmentGrade
);

app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
