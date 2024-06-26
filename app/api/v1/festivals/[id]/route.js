import { handleErrorResponse } from "@/utils/errorHandler";
import rateLimitMiddleware from "@/utils/rateLimiter";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

/**
 * API route for fetching one festival by ID
 *
 * @param {Request} req - The incoming request object
 * @returns {NextResponse} - The response object
 *
 * @example GET /api/v1/festivals/FEST_01004_168
 */

async function getHandler(req) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    const festival = await prisma.festival.findUnique({
      where: {
        festival_id: id,
      },
      include: {
        category: true,
      },
    });

    await prisma.$disconnect();

    return NextResponse.json({
      status: "success",
      data: festival || [],
    });
  } catch (error) {
    return handleErrorResponse(error);
  }
}

export const GET = rateLimitMiddleware(getHandler);
