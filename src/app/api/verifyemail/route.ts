/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "@/database/user.schema";
import { connectDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    
    console.log(token);

    const verifiedUser = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!verifiedUser) {
      return NextResponse.json(
        {
          error: "User is not Verified",
          success: false,
        },
        {
          status: 400,
        },
      );
    }

    verifiedUser.isVerified = true;

    verifiedUser.verifyToken = undefined;

    verifiedUser.verifyTokenExpiry = undefined;

    console.log(verifiedUser);

    await verifiedUser.save();

    return NextResponse.json(
      {
        message: "User Verified Successfully",
        success: true,
      },
      {
        status: 201,
      },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        message: "Server Error",
        success: false,
      },
      {
        status: 500,
      },
    );
  }
}
