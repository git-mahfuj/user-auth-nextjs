/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "@/database/user.schema";
import { connectDB } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const { email , password} = await req.json();

    console.log(email)
    console.log(password)

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
          success: false,
        },
        {
          status: 400,
        },
      );
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
      return NextResponse.json(
        {
          error: "Check Your Credentials",
          sucess: false,
        },
        {
          status: 400,
        },
      );
    }

    const tokenData = {
      id: user._id,
      email: user.email,
    };

    const tokenSecret = process.env.TOKEN_SECRET!;

    const token = await jwt.sign(tokenData, tokenSecret, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      {
        message: "User Logged In",
        success: true,
      },
      {
        status: 201,
      },
    );

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        message: "Server Error While Login",
        success: false,
      },
      {
        status: 500,
      },
    );
  }
}
