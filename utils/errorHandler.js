import { AppError, ValidationError } from "@/utils/errors";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export function handleErrorResponse(error) {
  if (error instanceof ValidationError) {
    return NextResponse.json(
      {
        status: "error",
        message: error.message,
      },
      { status: 400 }
    );
  }

  if (error instanceof AppError) {
    return NextResponse.json(
      {
        status: "error",
        message: error.message,
      },
      { status: error.statusCode }
    );
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return NextResponse.json(
      {
        status: "error",
        message: error.message,
      },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      status: "error",
      message: "Internal Server Error",
    },
    { status: 500 }
  );
}
