import prisma from "../config/prisma";

interface CreateProviderData {
  userId: number;
  businessName: string;
  description?: string;
  phone?: string;
  address?: string;
}

export const createProvider = async (data: CreateProviderData) => {
  const existingProvider = await prisma.provider.findUnique({
    where: {
      userId: data.userId,
    },
  });

  if (existingProvider) {
    throw new Error("Provider profile already exists");
  }

  const provider = await prisma.provider.create({
    data: {
      userId: data.userId,
      businessName: data.businessName,
      description: data.description,
      phone: data.phone,
      address: data.address,
    },
  });

  return provider;
};

export const getApprovedProviders = async () => {
  const providers = await prisma.provider.findMany({
    where: {
      status: "APPROVED",
    },
    select: {
      id: true,
      businessName: true,
      description: true,
      phone: true,
      address: true,
      status: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return providers;
};