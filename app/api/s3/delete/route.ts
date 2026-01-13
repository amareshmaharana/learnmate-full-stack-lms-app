import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

import { env } from "@/lib/env";
import { S3 } from "@/lib/S3Client";

export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    const key = body.key;

    if (!key || typeof key !== "string") {
      return NextResponse.json(
        JSON.stringify({ message: "Invalid or missing object key" }),
        { status: 400 }
      );
    }

    const command = new DeleteObjectCommand({
      Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES,
      Key: key,
    });

    await S3.send(command);

    // Simulate deletion logic here
    // In a real application, you would call your storage service's delete method
    console.log(`Deleting file with key: ${key}`);

    return NextResponse.json(
      { message: `File deleted successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.log("S3 deletion error:", error);
    return NextResponse.json(
      {
        error: "Failed to delete file",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}
