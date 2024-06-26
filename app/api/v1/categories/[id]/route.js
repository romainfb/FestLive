import { handleErrorResponse } from "@/utils/errorHandler";
import { ValidationError } from "@/utils/errors";
import rateLimitMiddleware from "@/utils/rateLimiter";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

/**
 * API route for fetching one category by ID
 *
 * @param {Request} req - The incoming request object
 * @returns {NextResponse} - The response object
 *
 * @example GET /api/v1/categories/7
 */

async function getHandler(req) {
  try {
    const url = new URL(req.url);
    const id = parseInt(url.pathname.split("/").pop());

    if (isNaN(id)) {
      throw new ValidationError("Category ID is must be a number");
    }

    const category = await prisma.category.findUnique({
      where: {
        category_id: id,
      },
    });

    await prisma.$disconnect();

    return NextResponse.json({
      status: "success",
      data: category || [],
    });
  } catch (error) {
    return handleErrorResponse(error);
  }
}

export const GET = rateLimitMiddleware(getHandler);
