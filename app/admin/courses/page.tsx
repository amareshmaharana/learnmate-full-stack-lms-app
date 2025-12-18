import { buttonVariants } from "@/components/ui/button";
import { IconCirclePlus } from "@tabler/icons-react";
import Link from "next/link";

export default function CoursesPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Courses</h1>

        <Link className={buttonVariants()} href="/admin/courses/create">
          <IconCirclePlus className="size-5" />
          Create Course
        </Link>
      </div>

      <div>
        <h1>All Courses</h1>
      </div>
    </>
  );
}
