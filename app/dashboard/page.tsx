import { EmptyState } from "@/components/general/EmptyState";
import { getAllCourses } from "../data/course/get-all-courses";
import { getEnrolledCourses } from "../data/user/get-enrolled-courses";
import { PublicCourseCard } from "../(public)/_components/PublicCourseCard";
import Link from "next/link";

export default async function DashboardPage() {
  const [courses, enrolledCourses] = await Promise.all([
    getAllCourses(),
    getEnrolledCourses(),
  ]);

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Enrolled Courses</h1>
        <p className="text-muted-foreground">
          Here are the courses you are currently enrolled in. Click on a course
          to view its details and start learning!
        </p>
      </div>

      {enrolledCourses.length === 0 ? (
        <EmptyState
          title="No Enrolled Courses"
          description="You are not enrolled in any courses yet. Browse our course catalog and start learning today!"
          buttonText="Browse Courses"
          href="/courses"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {enrolledCourses.map(({ Course: course }) => (
            <Link key={course.id} href={`/dashboard/${course.slug}`}>
              {course.title}
            </Link>
          ))}
        </div>
      )}

      <section className="mt-10">
        <div className="flex flex-col gap-2 mb-5">
          <h1 className="text-3xl font-bold">All Courses</h1>
          <p className="text-muted-foreground">
            Here are all the courses available. Click on a course to view its
            details and start learning!
          </p>
        </div>

        {courses.filter(
          (course) =>
            !enrolledCourses.some(
              ({ Course: enrolled }) => enrolled.id === course.id,
            ),
        ).length === 0 ? (
          <EmptyState
            title="No Available Courses"
            description="You are enrolled in all available courses. Great job! Check back later for new courses."
            buttonText="Browse Courses"
            href="/courses"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses
              .filter(
                (course) =>
                  !enrolledCourses.some(
                    ({ Course: enrolled }) => enrolled.id === course.id,
                  ),
              )
              .map((course) => (
                <PublicCourseCard key={course.id} data={course} />
              ))}
          </div>
        )}
      </section>
    </>
  );
}
