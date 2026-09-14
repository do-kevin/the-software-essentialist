import type Database from "../../database";
import type {
  CreateClassDTO,
  CreateClassEnrollmentDTO,
  FindClassDTO,
} from "./classDTOS";

export class ClassService {
  constructor(private db: Database) {}

  createClass = async (dto: CreateClassDTO) => {
    const name = dto.name;

    const cls = await this.db.classes.save(name);

    return cls;
  };

  findClassById = async (dto: FindClassDTO) => {
    const id = dto.id;

    const cls = await this.db.classes.getById(id);

    return cls;
  };

  findExistingClassEnrollment = async (dto: CreateClassEnrollmentDTO) => {
    const ids = {
      studentId: dto.studentId,
      classId: dto.classId,
    };

    const existingEnrollment = await this.db.classes.getEnrollment(ids);

    return existingEnrollment;
  };

  createClassEnrollment = async (dto: CreateClassEnrollmentDTO) => {
    const ids = { studentId: dto.studentId, classId: dto.classId };

    const classEnrollment = await this.db.classes.saveEnrollment(ids);

    return classEnrollment;
  };
}
