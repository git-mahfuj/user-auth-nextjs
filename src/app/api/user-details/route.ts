/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "@/database/user.schema";
import { connectDB } from "@/lib/db";
import { getTokenData } from "@/utils/get.token.data";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(req: NextRequest) {
  try {
    const userId = await getTokenData(req);

    const user = await User.findOne({ _id: userId }).select("-password");

    return NextResponse.json(
      {
        message: "User Found",
        success: true,
        user,
      },
      {
        status: 201,
      },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        message: "Server Error while getting user data",
      },
      {
        status: 500,
      },
    );
  }
}
