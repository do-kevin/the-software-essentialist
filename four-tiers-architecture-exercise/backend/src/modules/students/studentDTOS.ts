import {
  IdIsNotValidException,
  InvalidRequestBodyException,
} from "../../shared/exceptions";
import { isMissingKeys, isUUID } from "../../shared/utils";

export class CreateStudentDTO {
  constructor(public name: string) {}

  static fromRequest(body: unknown) {
    const requiredKeys = ["name"];

    const isRequestInvalid =
      !body || typeof body !== "object" || isMissingKeys(body, requiredKeys);

    if (isRequestInvalid) {
      throw new InvalidRequestBodyException(requiredKeys);
    }

    const { name } = body as { name: string };

    return new CreateStudentDTO(name);
  }
}

export class FindStudentDTO {
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

    return new FindStudentDTO(id);
  }
}

export class FindStudentAssignmentDTO {
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

    return new FindStudentDTO(id);
  }
}
