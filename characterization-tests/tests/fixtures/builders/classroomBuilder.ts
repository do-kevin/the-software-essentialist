import { Class } from "@prisma/client";
import { prisma } from "../../../src/database";

export class ClassroomBuilder {
  private classRoom: Partial<Class>;

  constructor() {
    this.classRoom = {};
  }

  withName = (name: string) => {
    this.classRoom.name = name;
    return this;
  };

  build = async () => {
    const classroom = await prisma.class.create({
      data: {
        name: this.classRoom.name as string,
      },
    });

    return classroom;
  };
}
