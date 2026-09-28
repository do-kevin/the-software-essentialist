import { Assignment } from "@prisma/client";
import { prisma } from "../../../src/database";
import { ClassroomBuilder } from "./classroomBuilder";

export class AssignmentBuilder {
  private classRoomBuilder?: ClassroomBuilder;
  private assignment: Partial<Assignment>;

  constructor() {
    this.assignment = {};
  }

  withTitle = (title: string) => {
    this.assignment.title = title;
    return this;
  };

  build = async () => {
    if (!this.classRoomBuilder) {
      throw new Error("You must define the classroom builder");
    }

    const classRoom = await this.classRoomBuilder.build();

    const assignment = await prisma.assignment.create({
      data: {
        classId: classRoom.id,
        title: this.assignment.title as string,
      },
    });

    return assignment;
  };
}
