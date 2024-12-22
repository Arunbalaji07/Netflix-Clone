"use server";

import bcrypt from "bcryptjs";

import prisma from "@/lib/db";
import { getUserByEmail } from "@/data/user";

interface RegisterSchema {
  name: string;
  email: string;
  password: string;
}

export const registerAction = async ({
  name,
  email,
  password,
}: RegisterSchema) => {
  if (!email || !password || !name) {
    return { error: "All fields are required" };
  }
  // Check if email is valid (basic check)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return { error: "Invalid email format" };
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 7);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already exists!" };
  }

  await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return { success: "User registered successfully!" };
};
