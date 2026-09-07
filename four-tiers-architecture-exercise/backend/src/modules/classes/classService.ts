import { prisma } from "../../database";

export class ClassService {
  constructor() {}

  createClass = async (name: string) => {
    const cls = await prisma.class.create({
      data: {
        name,
      },
    });

    return cls;
  };

  findClassById = async (id: string) => {
    const cls = await prisma.class.findUnique({
      where: {
        id,
      },
    });

    return cls;
  };

  findFirstClassEnrollment = async ({
    studentId,
    classId,
  }: {
    studentId: string;
    classId: string;
  }) => {
    const firstClassEnrollment = await prisma.classEnrollment.findFirst({
      where: {
        studentId,
        classId,
      },
    });

    return firstClassEnrollment;
  };

  createClassEnrollment = async ({
    studentId,
    classId,
  }: {
    studentId: string;
    classId: string;
  }) => {
    const classEnrollment = await prisma.classEnrollment.create({
      data: {
        studentId,
        classId,
      },
    });

    return classEnrollment;
  };
}
