import { auth } from "@/auth";
// import prisma from "@/lib/db";

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};

export const serverAuth = async () => {
  const session = await auth();

  if (!session?.user.email) {
    throw new Error("Not signed in");
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error("Not signed in");
  }
  return { currentUser };
};
