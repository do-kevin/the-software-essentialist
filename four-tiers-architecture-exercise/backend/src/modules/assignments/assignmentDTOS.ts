import { InvalidRequestBodyException } from "../../shared/exceptions";
import { isMissingKeys } from "../../shared/utils";

export class FindClassAssignmentsDTO {
  constructor(public id: string) {}

  static fromRequest(body: unknown) {
    const requiredKeys = ["id"];

    const isRequestInvalid =
      !body || typeof body !== "object" || isMissingKeys(body, requiredKeys);

    if (isRequestInvalid) {
      throw new InvalidRequestBodyException(requiredKeys);
    }

    const { id } = body as { id: string };

    return new FindClassAssignmentsDTO(id);
  }
}
