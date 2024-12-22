import {NextResponse} from "next/server";

import { serverAuth } from "@/lib/auth";

export async function GET() {
  try {
    const { currentUser } = await serverAuth();
    console.log("Current user : " +currentUser)
    return NextResponse.json(currentUser);
  } catch (err) {
    console.log(err);
    // return res.status(400).end();
  }
}
