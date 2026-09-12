import Database from "../../database";

export class StudentService {
  constructor(private db: Database) {}

  createStudent = async (name: string) => {
    const student = await this.db.students.save(name);

    return student;
  };

  findStudents = async () => {
    const students = await this.db.students.getAll();

    return students;
  };

  findStudentById = async (id: string) => {
    const student = await this.db.students.getDetailsById(id);

    return student;
  };

  findStudentExists = async (id: string) => {
    const student = await this.db.students.getById(id);

    return student;
  };

  findStudentAssignments = async (id: string) => {
    const studentAssignments = await this.db.students.getSubmittedAssignments(
      id
    );

    return studentAssignments;
  };

  findGradedStudentAssignments = async (id: string) => {
    const studentAssignments = await this.db.students.getGradedAssignments(id);

    return studentAssignments;
  };
}
