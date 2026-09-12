import Database, { prisma } from "../../database";

export class AssignmentService {
  constructor(private db: Database) {}

  createNewAssignment = async ({
    classId,
    title,
  }: {
    classId: string;
    title: string;
  }) => {
    const assignment = await this.db.assignments.save({ classId, title });

    return assignment;
  };

  createStudentAssignment = async ({
    studentId,
    assignmentId,
  }: {
    studentId: string;
    assignmentId: string;
  }) => {
    const studentAssignment = await this.db.assignments.saveStudentAssignment({
      studentId,
      assignmentId,
    });

    return studentAssignment;
  };

  findManyAssignmentsByClassId = async (id: string) => {
    const assignments = await this.db.assignments.getClassAssignments(id);

    return assignments;
  };

  findAssignment = async (id: string) => {
    const assignment = await this.db.assignments.getById(id);

    return assignment;
  };

  findAssignmentExists = async (id: string) => {
    const assignment = this.db.assignments.checkAssignment(id);

    return assignment;
  };

  findStudentAssignment = async (id: string) => {
    const studentAssignment = await this.db.assignments.checkStudentAssignment(
      id
    );

    return studentAssignment;
  };

  updateAssignmentToSubmit = async (id: string) => {
    const studentAssignmentUpdated =
      await this.db.assignments.submitStudentAssignment(id);

    return studentAssignmentUpdated;
  };

  updateAssignmentGrade = async ({
    id,
    grade,
  }: {
    grade: string;
    id: string;
  }) => {
    const studentAssignmentUpdated = await this.db.assignments.setGrade({
      grade,
      id,
    });
    return studentAssignmentUpdated;
  };
}
