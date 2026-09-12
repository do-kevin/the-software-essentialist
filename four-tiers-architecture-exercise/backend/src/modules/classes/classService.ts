import Database from "../../database";
import {
  CreateClassDTO,
  CreateClassEnrollmentDTO,
  FindClassDTO,
  FindClassEnrollmentDTO,
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

  findFirstClassEnrollment = async (dto: FindClassEnrollmentDTO) => {
    const ids = {
      studentId: dto.studentId,
      classId: dto.classId,
    };

    const firstClassEnrollment = await this.db.classes.getEnrollment(ids);

    return firstClassEnrollment;
  };

  createClassEnrollment = async (dto: CreateClassEnrollmentDTO) => {
    const ids = { studentId: dto.studentId, classId: dto.classId };

    const classEnrollment = await this.db.classes.saveEnrollment(ids);

    return classEnrollment;
  };
}
