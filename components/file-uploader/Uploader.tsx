"use client";

import { useCallback, useEffect, useState } from "react";
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
import { useConstructUrl } from "@/hooks/use-construct-url";

interface UploaderState {
  id: string | null;
  file: File | null;
  uploading: boolean;
  progress: number;
  key?: string | null;
  isDeleting: boolean;
  error: boolean;
  objectUrl?: string;
  fileType: "image" | "video";
}

interface iAppProps {
  value?: string;
  onChange?: (value: string) => void;
  fileTypeAccepted: "image" | "video";
}

export function Uploader({ onChange, value, fileTypeAccepted }: iAppProps) {
  const fileUrl = useConstructUrl(value || "");
  const [fileState, setFileState] = useState<UploaderState>({
    error: false,
    file: null,
    id: null,
    progress: 0,
    uploading: false,
    fileType: fileTypeAccepted,
    isDeleting: false,
    key: value,
    objectUrl: value ? fileUrl : undefined,
  });

  const uploadFile = useCallback(
    async (file: File) => {
      setFileState((prev) => ({ ...prev, uploading: true, progress: 0 }));

      try {
        // 1. Get presigned URL
        const presignedResponse = await fetch("/api/s3/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileName: file.name,
            contentType: file.type,
            size: file.size,
            isImage: fileTypeAccepted === "image" ? true : false,
          }),
        });

        if (!presignedResponse.ok) {
          toast.error("Failed to get presigned URL");
          setFileState((prev) => ({
            ...prev,
            uploading: false, // Fix: set uploading to false on error
            error: true,
          }));
          return;
        }

        const { presignedUrl, key } = await presignedResponse.json();

        // 2. Upload DIRECTLY to Tigris/S3 (Bypassing Next.js Server)
        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();

          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const percentageCompleted = (event.loaded / event.total) * 100;
              setFileState((prev) => ({
                ...prev,
                progress: Math.round(percentageCompleted),
              }));
            }
          };

          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              setFileState((prev) => ({
                ...prev,
                progress: 100,
                uploading: false,
                key: key,
              }));

              onChange?.(key);
              toast.success("File uploaded successfully");
              resolve();
            } else {
              reject(new Error("Upload failed"));
            }
          };

          xhr.onerror = () => {
            reject(new Error("Upload error"));
          };

          xhr.open("PUT", presignedUrl);
          xhr.setRequestHeader("Content-Type", file.type);
          xhr.send(file);
        });
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong during the upload.");
        setFileState((prev) => ({
          ...prev,
          uploading: false,
          progress: 0,
          error: true,
        }));
      }
    },
    [fileTypeAccepted, onChange],
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const objectUrl = URL.createObjectURL(file);

        if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
          URL.revokeObjectURL(fileState.objectUrl);
        }

        setFileState({
          file: file,
          objectUrl: objectUrl,
          progress: 0,
          uploading: false,
          error: false,
          id: uuidv4(),
          isDeleting: false,
          fileType: fileTypeAccepted,
        });

        uploadFile(file);
      }
    },
    [fileState.objectUrl, fileTypeAccepted, uploadFile],
  );

  async function handleRemoveFile() {
    if (fileState.isDeleting || !fileState.objectUrl) return;

    try {
      setFileState((prev) => ({
        ...prev,
        isDeleting: true,
      }));

      const response = await fetch("/api/s3/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: fileState.key }),
      });

      if (!response.ok) {
        toast.error("Failed to delete file");

        setFileState((prev) => ({ ...prev, isDeleting: true, error: true }));
        return;
      }

      if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }

      onChange?.("");

      setFileState({
        error: false,
        file: null,
        id: null,
        progress: 0,
        uploading: false,
        objectUrl: undefined,
        fileType: fileTypeAccepted,
        isDeleting: false,
      });

      toast.success("File deleted successfully");
    } catch {
      toast.error("Something went wrong during the deletion.");
      setFileState((prev) => ({
        ...prev,
        isDeleting: false,
        error: true,
      }));
    }
  }

  function rejectedFiles(fileRejection: FileRejection[]) {
    if (fileRejection.length) {
      const tooManyFiles = fileRejection.find(
        (rejection) => rejection.errors[0].code === "too-many-files",
      );

      const fileSizeToBig = fileRejection.find(
        (rejection) => rejection.errors[0].code === "file-too-large",
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
    if (fileState.uploading) {
      return (
        <RenderUploadingState
          file={fileState.file as File}
          progress={fileState.progress}
        />
      );
    }

    if (fileState.error) {
      return <RenderErrorState />;
    }

    if (fileState.objectUrl) {
      return (
        <RenderUploadState
          handleRemoveFile={handleRemoveFile}
          isDeleting={fileState.isDeleting as boolean}
          previewUrl={fileState.objectUrl}
          fileType={fileState.fileType}
        />
      );
    }

    return <RenderEmptyState isDragActive={false} />;
  }

  useEffect(() => {
    return () => {
      if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }
    };
  }, [fileState.objectUrl]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept:
      fileTypeAccepted === "video" ? { "video/*": [] } : { "image/*": [] },
    maxFiles: 1,
    multiple: false,
    maxSize:
      fileTypeAccepted === "image" ? 5 * 1024 * 1024 : 5000 * 1024 * 1024, // 5MB for images, 5GB for videos
    onDropRejected: rejectedFiles,
    disabled: fileState.uploading || !!fileState.objectUrl,
  });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "relative flex h-52 w-full flex-col items-center justify-center rounded-md border-2 border-dashed border-border bg-background p-4 transition-colors hover:border-primary/70",
        isDragActive
          ? "border-primary bg-primary/10"
          : "border-border hover:border-primary/70",
      )}
    >
      <CardContent>
        <input {...getInputProps()} />
        {renderContent()}
      </CardContent>
    </Card>
  );
}
