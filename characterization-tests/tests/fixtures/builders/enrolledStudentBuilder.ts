import { Student } from "@prisma/client";
import { prisma } from "../../../src/database";
import { faker } from "@faker-js/faker";
import { ClassroomBuilder } from "./classroomBuilder";
import { StudentBuilder } from "./studentBuilder";

export class EnrolledStudentBuilder {
  private classroomBuilder: ClassroomBuilder;
  private studentBuilder: StudentBuilder;

  from = (classroomBuilder: ClassroomBuilder) => {
    this.classroomBuilder = classroomBuilder;
    return this;
  };

  and = (studentBuilder: StudentBuilder) => {
    this.studentBuilder = studentBuilder;
    return this;
  };

  build = async () => {
    if (!this.classroomBuilder) {
      throw new Error("You must define the classroom builder");
    }
    if (!this.studentBuilder) {
      throw new Error("You must define the student builder");
    }

    const classroom = this.classroomBuilder;
    const student = this.studentBuilder;

    return {
      classroom,
      student,
    };
  };
}
