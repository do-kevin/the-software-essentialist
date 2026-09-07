import { prisma } from "../../database";

export class StudentService {
  constructor() {}

  createStudent = async (name: string) => {
    const student = await prisma.student.create({
      data: {
        name,
      },
    });

    return student;
  };

  findStudents = async () => {
    const students = await prisma.student.findMany({
      include: {
        classes: true,
        assignments: true,
        reportCards: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return students;
  };

  findStudentById = async (id: string) => {
    const student = await prisma.student.findUnique({
      where: {
        id,
      },
      include: {
        classes: true,
        assignments: true,
        reportCards: true,
      },
    });

    return student;
  };

  findStudentExists = async (id: string) => {
    const student = await prisma.student.findUnique({
      where: {
        id,
      },
    });

    return student;
  };

  findStudentAssignments = async (id: string) => {
    const studentAssignments = await prisma.studentAssignment.findMany({
      where: {
        studentId: id,
        status: "submitted",
      },
      include: {
        assignment: true,
      },
    });

    return studentAssignments;
  };

  findGradedStudentAssignments = async (id: string) => {
    const studentAssignments = await prisma.studentAssignment.findMany({
      where: {
        studentId: id,
        status: "submitted",
        grade: {
          not: null,
        },
      },
      include: {
        assignment: true,
      },
    });
    return studentAssignments;
  };
}
