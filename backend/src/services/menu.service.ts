import prisma from "../config/prisma";

interface CreateMenuItemData {
  providerId: number;
  name: string;
  description?: string;
  price: number;
  category?: string;
}

interface UpdateMenuItemData {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  isAvailable?: boolean;
}

export const createMenuItem = async (data: CreateMenuItemData) => {
  const provider = await prisma.provider.findUnique({
    where: {
      id: data.providerId,
    },
  });

  if (!provider) {
    throw new Error("Provider not found");
  }

  const menuItem = await prisma.menuItem.create({
    data: {
      providerId: data.providerId,
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
    },
  });

  return menuItem;
};

export const getProviderMenu = async (providerId: number) => {
  const provider = await prisma.provider.findUnique({
    where: {
      id: providerId,
    },
  });

  if (!provider) {
    throw new Error("Provider not found");
  }

  const menuItems = await prisma.menuItem.findMany({
    where: {
      providerId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return menuItems;
};

export const getMenuItemById = async (
  menuItemId: number,
  providerId: number
) => {
  const menuItem = await prisma.menuItem.findFirst({
    where: {
      id: menuItemId,
      providerId,
    },
  });

  if (!menuItem) {
    throw new Error("Menu item not found");
  }

  return menuItem;
};

export const updateMenuItem = async (
  menuItemId: number,
  providerId: number,
  data: UpdateMenuItemData
) => {
  const existingMenuItem = await getMenuItemById(
    menuItemId,
    providerId
  );

  const menuItem = await prisma.menuItem.update({
    where: {
      id: existingMenuItem.id,
    },
    data,
  });

  return menuItem;
};

export const deleteMenuItem = async (
  menuItemId: number,
  providerId: number
) => {
  const existingMenuItem = await getMenuItemById(
    menuItemId,
    providerId
  );

  await prisma.menuItem.delete({
    where: {
      id: existingMenuItem.id,
    },
  });

  return existingMenuItem;
};