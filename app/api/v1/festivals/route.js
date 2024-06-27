import { handleErrorResponse } from "@/utils/errorHandler";
import { ValidationError } from "@/utils/errors";
import rateLimitMiddleware from "@/utils/rateLimiter";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

/**
 * API route for fetching festivals with pagination and filtering
 *
 * @param {Request} req - The incoming request object
 * @returns {NextResponse} - The response object
 *
 * @example GET /api/v1/festivals?offset=0&limit=20&category=1&search=rock
 */

async function getHandler(req) {
  try {
    const { searchParams } = new URL(req.url);

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

    // Validate and parse category
    const category = searchParams.get("category");
    let categoryId = null;
    if (category) {
      categoryId = parseInt(category);
      if (isNaN(categoryId)) {
        throw new ValidationError("Category must be a number");
      }
    }

    const searchQuery = searchParams.get("search") || null;

    const whereClause = {
      AND: [
        categoryId ? { category_id: categoryId } : {}, // Filter by category if provided
        searchQuery
            ? {
              OR: [
                {
                  category: {
                    name: { contains: searchQuery, mode: "insensitive" },
                  },
                },
                { city: { contains: searchQuery, mode: "insensitive" } },
                { name: { contains: searchQuery, mode: "insensitive" } },
              ],
            }
          : {},
      ],
    };

    const totalFestivals = await prisma.festival.count({
      where: whereClause,
    });

    const festivals = await prisma.festival.findMany({
      where: whereClause,
      skip: offset !== undefined ? offset : 0,
      take: limit !== undefined ? limit : 20,
      include: {
        category: true,
      },
    });

    await prisma.$disconnect();

    return NextResponse.json({
      status: "success",
      nb_results: totalFestivals,
      offset: offset !== undefined ? offset : 0,
      limit: limit !== undefined ? limit : 20,
      data: festivals || [],
    });
  } catch (error) {
    return handleErrorResponse(error);
  }
}

export const GET = rateLimitMiddleware(getHandler);