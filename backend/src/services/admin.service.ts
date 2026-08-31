import prisma from "../config/prisma";

export const getPendingProviders = async () => {
  const providers = await prisma.provider.findMany({
    where: {
      status: "PENDING",
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return providers;
};

export const approveProvider = async (providerId: number) => {
  const provider = await prisma.provider.findUnique({
    where: {
      id: providerId,
    },
  });

  if (!provider) {
    throw new Error("Provider not found");
  }

  if (provider.status === "APPROVED") {
    throw new Error("Provider is already approved");
  }

  const updatedProvider = await prisma.provider.update({
    where: {
      id: providerId,
    },
    data: {
      status: "APPROVED",
    },
  });

  return updatedProvider;
};

export const rejectProvider = async (providerId: number) => {
  const provider = await prisma.provider.findUnique({
    where: {
      id: providerId,
    },
  });

  if (!provider) {
    throw new Error("Provider not found");
  }

  if (provider.status === "REJECTED") {
    throw new Error("Provider is already rejected");
  }

  const updatedProvider = await prisma.provider.update({
    where: {
      id: providerId,
    },
    data: {
      status: "REJECTED",
    },
  });

  return updatedProvider;
};