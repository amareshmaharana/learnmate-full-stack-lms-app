"use client";

import { CheckCircle, VideoOff } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

import { LessonContentType } from "@/app/data/course/get-lesson-content";
import { RenderDescription } from "@/components/rich-text-editor/RenderDescription";
import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/try-catch";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { markLessonCompletedAction } from "../actions";
import { useConfetti } from "@/hooks/use-confetti";

interface iAppProps {
  data: LessonContentType;
}

export default function CourseContent({ data }: iAppProps) {
  const [pending, startTransition] = useTransition();
  const { triggerConfetti } = useConfetti();

  function VideoPlayer({
    thumbnailKey,
    videoKey,
  }: {
    thumbnailKey: string;
    videoKey: string;
  }) {
    const videoUrl = useConstructUrl(videoKey);
    const thumbnailUrl = useConstructUrl(thumbnailKey);

    if (!videoKey) {
      return (
        <div className="aspect-video bg-muted rounded-lg flex flex-col items-center justify-center">
          <VideoOff className="size-16 text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Video not available!!</p>
        </div>
      );
    }

    return (
      <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
        <video
          src={videoUrl}
          controls
          className="w-full h-full object-cover"
          poster={thumbnailUrl}
          controlsList="nodownload"
        />
      </div>
    );
  }

  function onSubmit() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        markLessonCompletedAction(data.id, data.chapter.course.slug),
      );

      if (error) {
        toast.error("An unexpected error occurred. Please try again.");
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
        triggerConfetti();
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }

  return (
    <div className="flex flex-col h-full bg-background pl-6">
      <VideoPlayer
        thumbnailKey={data.thumbnailKey ?? ""}
        videoKey={data.videoKey ?? ""}
      />

      <div className="py-4 border-b">
        {data.lessonProgress.length > 0 ? (
          <Button
            variant="outline"
            className="bg-green-500/10 text-green-700 border-green-300 cursor-default hover:bg-green-500/10"
          >
            <CheckCircle className="size-4 text-green-700" />
            <p className="text-sm text-muted-foreground">Lesson completed</p>
          </Button>
        ) : (
          <Button
            variant="outline"
            className="w-auto cursor-pointer"
            onClick={onSubmit}
            disabled={pending}
          >
            <CheckCircle className="size-4 mr-2 text-green-700" />
            Mark as Completed
          </Button>
        )}
      </div>

      <div className="space-y-3 pt-3">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          {data.title}
        </h2>
        {data.description && (
          <RenderDescription json={JSON.parse(data.description)} />
        )}
      </div>
    </div>
  );
}
