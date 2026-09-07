import express from "express";
import { prisma } from "./database";
// import { Student, Class, Assignment, StudentAssignment } from "@prisma/client";

import { AssignmentController } from "./modules/assignments/assignmentController";
import { ClassController } from "./modules/classes/classController";
import { StudentController } from "./modules/students/studentController";

const cors = require("cors");
const app = express();
const router = express.Router();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

const studentController = new StudentController(prisma);
app.use("/students", studentController.getRouter());

const classController = new ClassController(prisma);
app.use("/classes", classController.getRouter());

const assignmentController = new AssignmentController(prisma);
app.use("/assignments", assignmentController.getRouter());

app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
