import { prisma } from "../../database";

export class AssignmentService {
  constructor() {}

  findManyAssignmentsByClassId = async (id: string) => {
    const assignments = await prisma.assignment.findMany({
      where: {
        classId: id,
      },
      include: {
        class: true,
        studentTasks: true,
      },
    });

    return assignments;
  };
}
