import { prisma } from "../../src/database";

async function resetDatabase() {
  const deleteAllStudentAssignments = prisma.studentAssignment.deleteMany();
  const deleteAllClassEnrollments = prisma.classEnrollment.deleteMany();
  const deleteAllReportCards = prisma.reportCard.deleteMany();
  const deleteAllClassGradeReports = prisma.classGradeReport.deleteMany();
  const deleteAllAssignments = prisma.assignment.deleteMany();
  const deleteAllStudents = prisma.student.deleteMany();
  const deleteAllClasses = prisma.class.deleteMany();

  try {
    await prisma.$transaction([
      deleteAllStudentAssignments,
      deleteAllClassEnrollments,
      deleteAllReportCards,
      deleteAllClassGradeReports,
      deleteAllAssignments,
      deleteAllStudents,
      deleteAllClasses,
    ]);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

export { resetDatabase };
