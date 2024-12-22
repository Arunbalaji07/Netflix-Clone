"use server";

import bcrypt from "bcryptjs";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";

interface LoginSchema {
  email: string;
  password: string;
}

export const loginAction = async ({ email, password }: LoginSchema) => {
  try {
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return { error: "User not found" };
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.hashedPassword as string,
    );

    if (!isPasswordValid) {
      return { error: "Invalid password" };
    }

    await signIn("credentials", {
      email,
      password,
      redirectTo: "/profiles",
      redirect: false
    });

    return { success: "Signed in successfully!" };
  } catch (err) {
    console.log(err);
  }
};

export const oAuthLogin = async (provider: "google" | "github") => {
  await signIn(provider, {
    redirectTo: "/profiles",
    redirect: true,
  });
};
