import { InvalidRequestBodyException } from "../../shared/exceptions";
import { isMissingKeys } from "../../shared/utils";

export class CreateClassDTO {
  constructor(public name: string) {}

  static fromRequest(body: unknown) {
    const requiredKeys = ["name"];

    const isRequestInvalid =
      !body || typeof body !== "object" || isMissingKeys(body, requiredKeys);

    if (isRequestInvalid) {
      throw new InvalidRequestBodyException(requiredKeys);
    }

    const { name } = body as { name: string };

    return new CreateClassDTO(name);
  }
}

export class FindClassDTO {
  constructor(public id: string) {}

  static fromRequest(body: unknown) {
    const requiredKeys = ["id"];

    const isRequestInvalid =
      !body || typeof body !== "object" || isMissingKeys(body, requiredKeys);

    if (isRequestInvalid) {
      throw new InvalidRequestBodyException(requiredKeys);
    }

    const { id } = body as { id: string };

    return new FindClassDTO(id);
  }
}

export class FindClassEnrollmentDTO {
  constructor(public studentId: string, public classId: string) {}

  static fromRequest(body: unknown) {
    const requiredKeys = ["studentId", "classId"];

    const isRequestInvalid =
      !body || typeof body !== "object" || isMissingKeys(body, requiredKeys);

    if (isRequestInvalid) {
      throw new InvalidRequestBodyException(requiredKeys);
    }

    const { studentId, classId } = body as {
      studentId: string;
      classId: string;
    };

    return new FindClassEnrollmentDTO(studentId, classId);
  }
}

export class CreateClassEnrollmentDTO {
  constructor(public studentId: string, public classId: string) {}

  static fromRequest(body: unknown) {
    const requiredKeys = ["studentId", "classId"];

    const isRequestInvalid =
      !body || typeof body !== "object" || isMissingKeys(body, requiredKeys);

    if (isRequestInvalid) {
      throw new InvalidRequestBodyException(requiredKeys);
    }

    const { studentId, classId } = body as {
      studentId: string;
      classId: string;
    };

    return new CreateClassEnrollmentDTO(studentId, classId);
  }
}
