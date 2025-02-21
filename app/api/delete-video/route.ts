import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";

const prisma = new PrismaClient();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Ensure secure URLs
});

export async function DELETE(request: Request) {
  try {
    const body = await request.text(); // Read raw text
    const { id } = JSON.parse(body); // Parse JSON manually

    if (!id) {
      return NextResponse.json(
        { message: "Missing video ID" },
        { status: 400 }
      );
    }

    // First, find the video to get the Cloudinary public ID
    const video = await prisma.video.findUnique({
      where: { id },
      select: { publicId: true }, // Select only publicId field
    });

    if (!video || !video.publicId) {
      return NextResponse.json(
        { message: "Video not found or missing publicId" },
        { status: 404 }
      );
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(video.publicId, {
      resource_type: "video",
    });

    // Delete from Prisma
    await prisma.video.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Video deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json(
      { message: "Error deleting video" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
