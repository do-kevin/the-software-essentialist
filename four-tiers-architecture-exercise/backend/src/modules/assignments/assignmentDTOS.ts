import {
  IdIsNotValidException,
  InvalidGradeException,
  InvalidRequestBodyException,
} from "../../shared/exceptions";
import { isMissingKeys, isUUID } from "../../shared/utils";

export class CreateAssignmentDTO {
  constructor(public classId: string, public title: string) {}

  static fromRequest(body: unknown) {
    const requiredKeys = ["classId", "title"];

    const isRequestInvalid =
      !body || typeof body !== "object" || isMissingKeys(body, requiredKeys);

    if (isRequestInvalid) {
      throw new InvalidRequestBodyException(requiredKeys);
    }

    const { classId, title } = body as { classId: string; title: string };

    return new CreateAssignmentDTO(classId, title);
  }
}

export class CreateStudentAssignmentDTO {
  constructor(public studentId: string, public assignmentId: string) {}

  static fromRequest(body: unknown) {
    const requiredKeys = ["studentId", "assignmentId"];

    const isRequestInvalid =
      !body || typeof body !== "object" || isMissingKeys(body, requiredKeys);

    if (isRequestInvalid) {
      throw new InvalidRequestBodyException(requiredKeys);
    }

    const { studentId, assignmentId } = body as {
      studentId: string;
      assignmentId: string;
    };

    return new CreateStudentAssignmentDTO(studentId, assignmentId);
  }
}

export class FindAssignmentsByClassDTO {
  constructor(public id: string) {}

  static fromRequest(body: unknown) {
    const requiredKeys = ["id"];

    const isRequestInvalid =
      !body || typeof body !== "object" || isMissingKeys(body, requiredKeys);

    if (isRequestInvalid) {
      throw new InvalidRequestBodyException(requiredKeys);
    }

    const { id } = body as { id: string };

    return new FindAssignmentsByClassDTO(id);
  }
}

export class FindAssignmentDTO {
  constructor(public id: string) {}

  static fromRequest(body: unknown) {
    const requiredKeys = ["id"];

    const isRequestInvalid =
      !body || typeof body !== "object" || isMissingKeys(body, requiredKeys);

    if (isRequestInvalid) {
      throw new InvalidRequestBodyException(requiredKeys);
    }

    const { id } = body as { id: string };

    if (!isUUID(id)) {
      throw new IdIsNotValidException(id);
    }

    return new FindAssignmentDTO(id);
  }
}

export class UpdateStudentAssignmentDTO {
  constructor(public id: string) {}

  static fromRequest(body: unknown) {
    const requiredKeys = ["id"];

    const isRequestInvalid =
      !body || typeof body !== "object" || isMissingKeys(body, requiredKeys);

    if (isRequestInvalid) {
      throw new InvalidRequestBodyException(requiredKeys);
    }

    const { id } = body as { id: string };

    return new UpdateStudentAssignmentDTO(id);
  }
}

export class UpdateAssignmentGradeDTO {
  constructor(public id: string, public grade: string) {}

  static fromRequest(body: unknown) {
    const requiredKeys = ["id", "grade"];

    const isRequestInvalid =
      !body || typeof body !== "object" || isMissingKeys(body, requiredKeys);

    if (isRequestInvalid) {
      throw new InvalidRequestBodyException(requiredKeys);
    }

    const { id, grade } = body as {
      id: string;
      grade: string;
    };

    if (!["A", "B", "C", "D"].includes(grade)) {
      throw new InvalidGradeException(grade);
    }

    return new UpdateAssignmentGradeDTO(id, grade);
  }
}
