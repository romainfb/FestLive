import { handleErrorResponse } from "@/utils/errorHandler";
import { ValidationError } from "@/utils/errors";
import rateLimitMiddleware from "@/utils/rateLimiter";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

/**
 * API route for fetching categories with pagination and filtering
 *
 * @param {Request} req - The incoming request object
 * @returns {NextResponse} - The response object
 *
 * @example GET /api/v1/categories?offset=0&limit=20
 */

async function getHandler(req) {
  try {
    const searchParams = req.nextUrl.searchParams;

    // Parse offset
    let offset = searchParams.has("offset")
      ? parseInt(searchParams.get("offset"))
      : undefined;
    if (offset !== undefined && (isNaN(offset) || offset < 0)) {
      throw new ValidationError("Invalid offset parameter");
    }

    // Parse limit
    let limit = searchParams.has("limit")
      ? parseInt(searchParams.get("limit"))
      : undefined;
    if (limit !== undefined && (isNaN(limit) || limit <= 0)) {
      throw new ValidationError("Invalid limit parameter");
    }

    const categories = await prisma.category.findMany({
      skip: offset !== undefined ? offset : 0,
      take: limit !== undefined ? limit : 20,
    });

    await prisma.$disconnect();

    return NextResponse.json({
      status: "success",
      offset: offset !== undefined ? offset : 0,
      limit: limit !== undefined ? limit : 20,
      data: categories || [],
    });
  } catch (error) {
    return handleErrorResponse(error);
  }
}

export const GET = rateLimitMiddleware(getHandler);
