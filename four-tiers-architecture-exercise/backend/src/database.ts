import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface StudentPersistance {
  save(name: string): any;
  getAll(): any;
  getById(id: string): any;
  getDetailsById(id: string): any;
  getSubmittedAssignments(id: string): any;
  getGradedAssignments(id: string): any;
}

export class Database {
  public students: StudentPersistance;

  constructor(private prisma: PrismaClient) {
    this.students = this.buildStudentPersistance();
  }

  private buildStudentPersistance = (): StudentPersistance => {
    return {
      save: this.saveStudent,
      getAll: this.getAllStudents,
      getById: this.getStudentById,
      getDetailsById: this.getStudentDetailsById,
      getSubmittedAssignments: this.getSubmittedAssignmentsByStudentId,
      getGradedAssignments: this.getGradedAssignmentsByStudentId,
    };
  };

  private saveStudent = async (name: string) => {
    const data = await this.prisma.student.create({
      data: {
        name,
      },
    });

    return data;
  };

  private getAllStudents = async () => {
    const data = await this.prisma.student.findMany({
      include: {
        classes: true,
        assignments: true,
        reportCards: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return data;
  };

  private getStudentById = async (id: string) => {
    const data = await this.prisma.student.findUnique({
      where: {
        id,
      },
    });

    return data;
  };

  private getStudentDetailsById = async (id: string) => {
    const data = await this.prisma.student.findUnique({
      where: {
        id,
      },
      include: {
        classes: true,
        assignments: true,
        reportCards: true,
      },
    });

    return data;
  };

  private getSubmittedAssignmentsByStudentId = async (id: string) => {
    const data = await this.prisma.studentAssignment.findMany({
      where: {
        studentId: id,
        status: "submitted",
      },
      include: {
        assignment: true,
      },
    });

    return data;
  };

  private getGradedAssignmentsByStudentId = async (id: string) => {
    const data = await this.prisma.studentAssignment.findMany({
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
    return data;
  };
}

export { prisma };

export default Database;
