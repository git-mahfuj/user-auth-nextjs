/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(req: NextRequest) {
  try {
    const response = NextResponse.json(
      {
        message: "User Loggedout SuccessFully",
        success: true,
      },
      {
        status: 200,
      },
    );

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        message: "Server Error while logout",
        success: false,
      },
      {
        status: 500,
      },
    );
  }
}
