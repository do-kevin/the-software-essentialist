import { Student } from "@prisma/client";
import { prisma } from "../../../src/database";
import { faker } from "@faker-js/faker";

export class StudentBuilder {
  private student: Partial<Student>;

  constructor() {
    this.student = {};
  }

  withRandomDetails = () => {
    this.student.name = faker.person.fullName();
    return this;
  };

  withName = (name: string) => {
    this.student.name = name;
    return this;
  };

  build = async () => {
    const student = await prisma.student.create({
      data: {
        name: this.student.name as string,
      },
    });

    return student;
  };
}
