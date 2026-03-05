/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/db";
import User from "@/database/user.schema";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "http2";

connectDB();
export async function GET(req: NextRequest) {
  try {
    const users = await User.find({}).select("-password");
    if (!users) {
      return NextResponse.json(
        {
          message: "No Users Created",
          sucess: true,
        },
        {
          status: 200,
        },
      );
    }
    return NextResponse.json(
      {
        message: "Users Fetched Successfully",
        success: true,
        users,
      },
      {
        status: 201,
      },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        message: "Error while Getting Users",
        Success: false,
      },
      {
        status: 400,
      },
    );
  }
}
