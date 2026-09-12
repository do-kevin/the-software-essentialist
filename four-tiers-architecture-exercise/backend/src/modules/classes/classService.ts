import Database from "../../database";

export class ClassService {
  constructor(private db: Database) {}

  createClass = async (name: string) => {
    const cls = await this.db.classes.save(name);

    return cls;
  };

  findClassById = async (id: string) => {
    const cls = await this.db.classes.getById(id);

    return cls;
  };

  findFirstClassEnrollment = async ({
    studentId,
    classId,
  }: {
    studentId: string;
    classId: string;
  }) => {
    const firstClassEnrollment = await this.db.classes.getEnrollment({
      studentId,
      classId,
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
    const classEnrollment = await this.db.classes.saveEnrollment({
      studentId,
      classId,
    });

    return classEnrollment;
  };
}
