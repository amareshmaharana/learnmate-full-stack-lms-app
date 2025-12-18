import { CloudUploadIcon, ImageIcon, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Image from "next/image";

export function RenderEmptyState({ isDragActive }: { isDragActive: boolean }) {
  return (
    <div className="text-center">
      <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-muted mb-2">
        <CloudUploadIcon
          className={cn(
            "size-6",
            isDragActive && "text-primary animate-bounce"
          )}
        />
      </div>

      <p className="text-base font-semibold text-foreground">
        Drop your files here or{" "}
        <span className="text-primary font-bold cursor-pointer">
          click to upload
        </span>
      </p>

      <Button className="mt-3" type="button">
        Select
      </Button>
    </div>
  );
}

export function RenderErrorState() {
  return (
    <div className="text-center">
      <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-destructive/30 mb-2">
        <ImageIcon className={cn("size-6 text-destructive")} />
      </div>

      <p className="text-base font-semibold">Upload failed</p>
      <p className="text-sm mt-1 text-muted-foreground">Something went wrong</p>

      <Button className="mt-3 cursor-pointer" type="button">
        Retry
      </Button>
    </div>
  );
}

export function RenderUploadState({ previewUrl }: { previewUrl: string }) {
  return (
    <div>
      <Image
        src={previewUrl}
        alt="uploaded-file"
        fill
        className="object-contain p-2"
      />

      <Button
        variant="destructive"
        size="icon"
        className={cn("absolute top-4 right-4")}
      >
        <XIcon className="size-4" />
      </Button>
    </div>
  );
}

export function RenderUploadingState({
  progress,
  file,
}: {
  progress: number;
  file: File;
}) {
  return (
    <div className="text-center flex justify-center items-center flex-col">
      <p>{progress}%</p>

      <p className="mt-2 text-sm font-medium text-foreground">Uploading...</p>

      <p className="mt-1 text-xs text-muted-foreground truncate max-w-xs">
        {file.name}
      </p>
    </div>
  );
}
