import express, { Application } from "express";
import { StudentController } from "./modules/students/studentController";
import { ClassController } from "./modules/classes/classController";
import { AssignmentController } from "./modules/assignments/assignmentController";
import { Server as HttpServer } from "http";

const cors = require("cors");

type PosixSignals = {
  interrupt: "SIGINT";
  terminate: "SIGTERM";
};

export class Server {
  private app: Application;

  private posixSignals: PosixSignals = {
    interrupt: "SIGINT",
    terminate: "SIGTERM",
  };

  constructor(
    private studentController: StudentController,
    private classController: ClassController,
    private assignmentController: AssignmentController
  ) {
    this.app = express();
    this.addMiddlewares();
    this.setupRouters();
  }

  private addMiddlewares = () => {
    this.app.use(express.json());
    this.app.use(cors());
  };

  setupRouters = () => {
    this.app.use("/students", this.studentController.getRouter());
    this.app.use("/classes", this.classController.getRouter());
    this.app.use("/assignments", this.assignmentController.getRouter());
  };

  start = (port: number = 3000) => {
    const _server = this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    this.handleShutdownGracefully(_server);
  };

  handleShutdownGracefully = (httpServer: HttpServer) => {
    const handleShutdown = () => {
      httpServer.close(() => {
        console.log("Closing connections.");
        process.exit(0);
      });

      setTimeout(() => {
        console.error("Forcing shutdown.");
        process.exit(1);
      }, 30000);
    };

    process.on(this.posixSignals.interrupt, handleShutdown);
    process.on(this.posixSignals.terminate, handleShutdown);
  };
}
