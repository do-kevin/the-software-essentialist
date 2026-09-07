import { prisma } from "../../database";

export class AssignmentService {
  constructor() {}

  // TO-DO: may want to name this create new class assignment instead
  createNewAssignment = async ({
    classId,
    title,
  }: {
    classId: string;
    title: string;
  }) => {
    const assignment = await prisma.assignment.create({
      data: {
        classId,
        title,
      },
    });

    return assignment;
  };

  createStudentAssignment = async ({
    studentId,
    assignmentId,
  }: {
    studentId: string;
    assignmentId: string;
  }) => {
    const studentAssignment = await prisma.studentAssignment.create({
      data: {
        studentId,
        assignmentId,
      },
    });

    return studentAssignment;
  };

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

  findAssignment = async (id: string) => {
    const assignment = await prisma.assignment.findUnique({
      include: {
        class: true,
        studentTasks: true,
      },
      where: {
        id,
      },
    });

    return assignment;
  };

  findAssignmentExists = async (id: string) => {
    const assignment = prisma.assignment.findUnique({
      where: {
        id,
      },
    });

    return assignment;
  };

  findStudentAssignment = async (id: string) => {
    const studentAssignment = await prisma.studentAssignment.findUnique({
      where: {
        id,
      },
    });

    return studentAssignment;
  };

  updateAssignmentToSubmit = async (id: string) => {
    const studentAssignmentUpdated = await prisma.studentAssignment.update({
      where: {
        id,
      },
      data: {
        status: "submitted",
      },
    });

    return studentAssignmentUpdated;
  };

  updateAssignmentGrade = async ({
    id,
    grade,
  }: {
    grade: string;
    id: string;
  }) => {
    const studentAssignmentUpdated = await prisma.studentAssignment.update({
      where: {
        id,
      },
      data: {
        grade,
      },
    });

    return studentAssignmentUpdated;
  };
}
