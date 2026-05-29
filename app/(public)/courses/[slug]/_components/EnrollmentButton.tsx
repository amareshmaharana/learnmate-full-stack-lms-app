"use client";

import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/try-catch";
import { toast } from "sonner";
import { enrollInCourseAction } from "../actions";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";

export function EnrollmentButton({ courseId }: { courseId: string }) {
  const [pending, startTransition] = useTransition();

  function onSubmit() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        enrollInCourseAction(courseId),
      );

      if (error) {
        toast.error("An unexpected error occurred. Please try again.");
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }

  return (
    <>
      <Button
        onClick={onSubmit}
        disabled={pending}
        className="w-full cursor-pointer"
      >
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            You are enrolling...
          </>
        ) : (
          "Enroll Now"
        )}
      </Button>
    </>
  );
}
