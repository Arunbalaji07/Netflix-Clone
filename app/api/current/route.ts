import {NextResponse} from "next/server";

import {auth} from "@/auth";

export async function GET() {
  try {
    const session = await auth()

    if(!session?.user?.email) {
      throw new Error("Not signed in!")
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!currentUser) {
      throw new Error("Not signed in");
    }

    console.log("Current user : " +currentUser)
    return NextResponse.json(currentUser, {status: 200});
  } catch (err) {
    console.log(err);
    // return res.status(400).end();
  }
}
