"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";
import { FileRejection, useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";

import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import {
  RenderEmptyState,
  RenderErrorState,
  RenderUploadingState,
  RenderUploadState,
} from "./RenderState";

interface UploaderState {
  id: string | null;
  file: File | null;
  uploading: boolean;
  progress: number;
  key?: string | null;
  isDeleting?: boolean;
  error: boolean;
  objectUrl?: string;
  fileType: "image" | "video";
}

export function Uploader() {
  const [fileState, setFileState] = useState<UploaderState>({
    error: false,
    file: null,
    id: null,
    progress: 0,
    uploading: false,
    fileType: "image",
    isDeleting: false,
  });

  async function uploadFile(file: File) {
    setFileState((prev) => ({ ...prev, uploading: true, progress: 0 }));

    try {
      // Upload via server to avoid cross-origin CORS issues
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", file.name);

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentageCompleted = Math.round(
              (event.loaded / event.total) * 100
            );
            setFileState((prev) => ({
              ...prev,
              progress: percentageCompleted,
            }));
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const response = JSON.parse(xhr.responseText || "{}");
              setFileState((prev) => ({
                ...prev,
                progress: 100,
                uploading: false,
                key: response?.key ?? null,
              }));
              toast.success("File uploaded successfully");
              resolve();
            } catch {
              reject(new Error("Invalid server response"));
            }
          } else {
            reject(new Error("Upload failed"));
          }
        };

        xhr.onerror = () => {
          reject(new Error("Upload error"));
        };

        xhr.open("POST", "/api/s3/upload/direct");
        xhr.send(formData);
      });
    } catch {
      toast.error("Something went wrong during the upload.");
      setFileState((prev) => ({
        ...prev,
        uploading: false,
        progress: 0,
        error: true,
      }));
    }
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const objectUrl = URL.createObjectURL(file);
      setFileState({
        file: file,
        objectUrl: objectUrl,
        progress: 0,
        uploading: false,
        error: false,
        id: uuidv4(),
        isDeleting: false,
        fileType: "image",
      });

      uploadFile(file);
    }
  }, []);

  function rejectedFiles(fileRejection: FileRejection[]) {
    if (fileRejection.length) {
      const tooManyFiles = fileRejection.find(
        (rejection) => rejection.errors[0].code === "too-many-files"
      );

      const fileSizeToBig = fileRejection.find(
        (rejection) => rejection.errors[0].code === "file-too-large"
      );

      if (fileSizeToBig) {
        toast.error("File size exceeds the 5MB limit.");
      }

      if (tooManyFiles) {
        toast.error("You can only upload one file at a time.");
      }
    }
  }

  function renderContent() {
    if (fileState.uploading || fileState.progress > 0) {
      return (
        <RenderUploadingState
          progress={fileState.progress}
          file={fileState.file as File}
        />
      );
    }

    if (fileState.error) {
      return <RenderErrorState />;
    }

    if (fileState.objectUrl) {
      return <RenderUploadState previewUrl={fileState.objectUrl} />;
    }

    return <RenderEmptyState isDragActive={false} />;
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024, // 5 MB
    onDropRejected: rejectedFiles,
  });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "relative flex h-52 w-full flex-col items-center justify-center rounded-md border-2 border-dashed border-border bg-background p-4 transition-colors hover:border-primary/70",
        isDragActive
          ? "border-primary bg-primary/10"
          : "border-border hover:border-primary/70"
      )}
    >
      <CardContent>
        <input {...getInputProps()} />
        {renderContent()}
      </CardContent>
    </Card>
  );
}
