import type Database from "../../database";
import type {
  CreateAssignmentDTO,
  CreateStudentAssignmentDTO,
  FindAssignmentDTO,
  FindAssignmentsByClassDTO,
  UpdateAssignmentGradeDTO,
  UpdateStudentAssignmentDTO,
} from "./assignmentDTOS";

export class AssignmentService {
  constructor(private db: Database) {}

  createAssignment = async (dto: CreateAssignmentDTO) => {
    const { classId, title } = dto;

    const assignment = await this.db.assignments.save({ classId, title });

    return assignment;
  };

  createStudentAssignment = async (dto: CreateStudentAssignmentDTO) => {
    const { studentId, assignmentId } = dto;

    const studentAssignment = await this.db.assignments.saveStudentAssignment({
      studentId,
      assignmentId,
    });

    return studentAssignment;
  };

  findAssignmentsByClass = async (dto: FindAssignmentsByClassDTO) => {
    const id = dto.id;

    const assignments = await this.db.assignments.getClassAssignments(id);

    return assignments;
  };

  findAssignment = async (dto: FindAssignmentDTO) => {
    const id = dto.id;

    const assignment = await this.db.assignments.getById(id);

    return assignment;
  };

  findAssignmentExists = async (dto: FindAssignmentDTO) => {
    const id = dto.id;

    const assignment = this.db.assignments.checkAssignment(id);

    return assignment;
  };

  findStudentAssignmentExists = async (dto: FindAssignmentDTO) => {
    const id = dto.id;

    const studentAssignment = await this.db.assignments.checkStudentAssignment(
      id
    );

    return studentAssignment;
  };

  submitStudentAssignment = async (dto: UpdateStudentAssignmentDTO) => {
    const id = dto.id;

    const studentAssignmentUpdated =
      await this.db.assignments.submitStudentAssignment(id);

    return studentAssignmentUpdated;
  };

  updateAssignmentGrade = async (dto: UpdateAssignmentGradeDTO) => {
    const { grade, id } = dto;

    const studentAssignmentUpdated = await this.db.assignments.setGrade({
      grade,
      id,
    });
    return studentAssignmentUpdated;
  };
}
