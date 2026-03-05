/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { connectDB } from "@/lib/db";
import User from "@/database/user.schema";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/utils/mailer";
import bcrypt from "bcryptjs";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();

    const { name, email, password } = reqBody;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          error: "User Already Exists",
        },
        {
          status: 400,
        },
      );
    }

    

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword)
    const user = await new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    console.log(savedUser);

    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
        message : "User Created Successfully",
        success : true
    } , {
        status : 201
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 400,
      },
    );
  }
}
