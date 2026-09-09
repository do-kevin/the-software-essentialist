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

interface ClassPersistence {
  save(name: string): any;
  getById(id: string): any;
  getEnrollment({
    studentId,
    classId,
  }: {
    studentId: string;
    classId: string;
  }): any;
  saveEnrollment({
    studentId,
    classId,
  }: {
    studentId: string;
    classId: string;
  }): any;
}

interface AssignmentPersistence {
  save({ title, classId }: { title: string; classId: string }): any;
  saveStudentAssignment({
    studentId,
    assignmentId,
  }: {
    studentId: string;
    assignmentId: string;
  }): any;
  getClassAssignments(id: string): any;
  getById(id: string): any;
  checkAssignment(id: string): any;
  checkStudentAssignment(id: string): any;
  submitStudentAssignment(id: string): any;
  setGrade({ id, grade }: { id: string; grade: string }): any;
}

export class Database {
  public students: StudentPersistance;
  public classes: ClassPersistence;
  public assignments: AssignmentPersistence;

  constructor(private prisma: PrismaClient) {
    this.students = this.buildStudentPersistance();
    this.classes = this.buildClassPersistence();
    this.assignments = this.buildAssignmentPersistence();
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

  private buildClassPersistence = () => {
    return {
      save: this.saveClass,
      getById: this.getClassById,
      getEnrollment: this.getFirstEnrollment,
      saveEnrollment: this.saveEnrollment,
    };
  };

  private saveClass = async (name: string) => {
    const cls = await this.prisma.class.create({
      data: {
        name,
      },
    });

    return cls;
  };

  private getClassById = async (id: string) => {
    const cls = await this.prisma.class.findUnique({
      where: {
        id,
      },
    });

    return cls;
  };

  private getFirstEnrollment = async ({
    studentId,
    classId,
  }: {
    studentId: string;
    classId: string;
  }) => {
    const firstClassEnrollment = await this.prisma.classEnrollment.findFirst({
      where: {
        studentId,
        classId,
      },
    });

    return firstClassEnrollment;
  };

  private saveEnrollment = async ({
    studentId,
    classId,
  }: {
    studentId: string;
    classId: string;
  }) => {
    const classEnrollment = await this.prisma.classEnrollment.create({
      data: {
        studentId,
        classId,
      },
    });

    return classEnrollment;
  };

  private buildAssignmentPersistence = () => {
    return {
      save: this.saveAssignment,
      saveStudentAssignment: this.saveStudentAssignment,
      getClassAssignments: this.getClassAssignments,
      getById: this.getAssignmentById,
      checkAssignment: this.checkAssignment,
      checkStudentAssignment: this.checkStudentAssignment,
      submitStudentAssignment: this.submitStudentAssignment,
      setGrade: this.setAssignmentGrade,
    };
  };

  private saveAssignment = async ({
    title,
    classId,
  }: {
    title: string;
    classId: string;
  }) => {
    const assignment = await this.prisma.assignment.create({
      data: {
        classId,
        title,
      },
    });

    return assignment;
  };

  private saveStudentAssignment = async ({
    studentId,
    assignmentId,
  }: {
    studentId: string;
    assignmentId: string;
  }) => {
    const studentAssignment = await this.prisma.studentAssignment.create({
      data: {
        studentId,
        assignmentId,
      },
    });

    return studentAssignment;
  };

  private getClassAssignments = async (id: string) => {
    const assignments = await this.prisma.assignment.findMany({
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

  private getAssignmentById = async (id: string) => {
    const assignment = await this.prisma.assignment.findUnique({
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

  private checkAssignment = async (id: string) => {
    const assignment = this.prisma.assignment.findUnique({
      where: {
        id,
      },
    });

    return assignment;
  };

  private checkStudentAssignment = async (id: string) => {
    const studentAssignment = await this.prisma.studentAssignment.findUnique({
      where: {
        id,
      },
    });

    return studentAssignment;
  };

  private submitStudentAssignment = async (id: string) => {
    const studentAssignmentUpdated = await this.prisma.studentAssignment.update(
      {
        where: {
          id,
        },
        data: {
          status: "submitted",
        },
      }
    );

    return studentAssignmentUpdated;
  };

  private setAssignmentGrade = async ({
    id,
    grade,
  }: {
    id: string;
    grade: string;
  }) => {
    const studentAssignmentUpdated = await this.prisma.studentAssignment.update(
      {
        where: {
          id,
        },
        data: {
          grade,
        },
      }
    );

    return studentAssignmentUpdated;
  };
}

export { prisma };

export default Database;
