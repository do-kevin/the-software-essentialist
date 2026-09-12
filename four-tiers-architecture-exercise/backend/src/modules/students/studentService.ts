import Database from "../../database";
import {
  CreateStudentDTO,
  FindStudentAssignmentDTO,
  FindStudentDTO,
} from "./studentDTOS";

export class StudentService {
  constructor(private db: Database) {}

  createStudent = async (dto: CreateStudentDTO) => {
    const name = dto.name;

    const student = await this.db.students.save(name);

    return student;
  };

  findStudents = async () => {
    const students = await this.db.students.getAll();

    return students;
  };

  findStudentById = async (dto: FindStudentDTO) => {
    const id = dto.id;

    const student = await this.db.students.getDetailsById(id);

    return student;
  };

  findStudentExists = async (dto: FindStudentDTO) => {
    const id = dto.id;

    const student = await this.db.students.getById(id);

    return student;
  };

  findStudentAssignments = async (dto: FindStudentAssignmentDTO) => {
    const id = dto.id;

    const studentAssignments = await this.db.students.getSubmittedAssignments(
      id
    );

    return studentAssignments;
  };

  findGradedStudentAssignments = async (dto: FindStudentAssignmentDTO) => {
    const id = dto.id;

    const studentAssignments = await this.db.students.getGradedAssignments(id);

    return studentAssignments;
  };
}
