import { Assignment, Class } from "@prisma/client";
import { prisma } from "../../../src/database";
import { ClassroomBuilder } from "./classroomBuilder";

export class AssignmentBuilder {
  private classRoomBuilder?: ClassroomBuilder;
  private assignment: Partial<Assignment>;

  constructor() {
    this.assignment = {};
  }

  from = (classroomBuilder: ClassroomBuilder) => {
    this.classRoomBuilder = classroomBuilder;
    return this;
  };

  withTitle = (title: string) => {
    this.assignment.title = title;
    return this;
  };

  withClassId = (classId: string) => {
    this.assignment.classId = classId;
    return this;
  };

  build = async () => {
    let classId = this.assignment.classId;

    if (!classId) {
      if (!this.classRoomBuilder) {
        throw new Error(
          "Provide either withClassId() or define the classRoomBuilder"
        );
      }
      classId = (await this.classRoomBuilder.build()).id;
    }

    return prisma.assignment.create({
      data: {
        classId,
        title: this.assignment.title as string,
      },
    });
  };
}
