import { LessonContentType } from "@/app/data/course/get-lesson-content";
import { RenderDescription } from "@/components/rich-text-editor/RenderDescription";
import { Button } from "@/components/ui/button";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { CheckCircle, VideoOff } from "lucide-react";

interface iAppProps {
  data: LessonContentType;
}

export default function CourseContent({ data }: iAppProps) {
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

  return (
    <div className="flex flex-col h-full bg-background pl-6">
      <VideoPlayer
        thumbnailKey={data.thumbnailKey ?? ""}
        videoKey={data.videoKey ?? ""}
      />

      <div className="py-4 border-b">
        <Button variant="outline" size="sm">
          <CheckCircle className="size-4 mr-2 text-green-700" />
          Mark as Completed
        </Button>
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
