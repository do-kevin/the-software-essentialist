export class InvalidRequestBodyException extends Error {
  constructor(missingKeys: string[]) {
    super("Body is missing required key: " + missingKeys.join(", "));
  }
}

export class StudentNotFoundException extends Error {
  constructor() {
    super("Student is not found.");
  }
}

export class ClassNotFoundException extends Error {
  constructor(id: string) {
    super(`Class with ${id} is not found.`);
  }
}

export class AssignmentNotFoundException extends Error {
  constructor() {
    super(`Assignment is not found.`);
  }
}

export class StudentAssignmentNotFoundException extends Error {
  constructor() {
    super(`Student's assignment is not found.`);
  }
}

export class StudentAlreadyEnrolledException extends Error {
  constructor() {
    super("Student is already enrolled in the class.");
  }
}

export class IdIsNotValidException extends Error {
  constructor(id: string) {
    super(`The id, ${id}, is not valid.`);
  }
}
