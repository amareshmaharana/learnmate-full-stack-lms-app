import "server-only";

import { prisma } from "@/lib/db";
import { requireAdmin } from "./require-admin";

export async function adminGetDashboardStats() {
  await requireAdmin();

  const [totalUsers, totalLearners, totalCourses, totalLessons] =
    await Promise.all([
      // Total Users
      prisma.user.count(),
      // Total Learners
      prisma.user.count({ where: { enrollment: { some: {} } } }),
      // Total Courses
      prisma.course.count(),
      // Total Lessons
      prisma.lesson.count(),
    ]);

  return { totalUsers, totalLearners, totalCourses, totalLessons };
}
