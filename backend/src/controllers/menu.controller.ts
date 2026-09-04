import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import {
  createMenuItem,
  getProviderMenu,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
} from "../services/menu.service";
import prisma from "../config/prisma";

const getProviderId = async (userId: number) => {
  const provider = await prisma.provider.findUnique({
    where: {
      userId,
    },
  });

  if (!provider) {
    throw new Error("Provider profile not found");
  }

  return provider.id;
};

export const createMenu = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const { name, description, price, category } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "Name and price are required",
      });
    }

    const numericPrice = Number(price);

    if (Number.isNaN(numericPrice) || numericPrice < 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be a valid non-negative number",
      });
    }

    const providerId = await getProviderId(req.user.userId);

    const menuItem = await createMenuItem({
      providerId,
      name,
      description,
      price: numericPrice,
      category,
    });

    return res.status(201).json({
      success: true,
      message: "Menu item created successfully",
      data: menuItem,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMenu = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const providerId = await getProviderId(req.user.userId);

    const menuItems = await getProviderMenu(providerId);

    return res.status(200).json({
      success: true,
      message: "Menu fetched successfully",
      data: menuItems,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMenuItem = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const menuItemId = Number(req.params.id);

    if (Number.isNaN(menuItemId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid menu item ID",
      });
    }

    const providerId = await getProviderId(req.user.userId);

    const menuItem = await getMenuItemById(
      menuItemId,
      providerId
    );

    return res.status(200).json({
      success: true,
      message: "Menu item fetched successfully",
      data: menuItem,
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateMenu = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const menuItemId = Number(req.params.id);

    if (Number.isNaN(menuItemId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid menu item ID",
      });
    }

    const { name, description, price, category, isAvailable } =
      req.body;

    if (
      name === undefined &&
      description === undefined &&
      price === undefined &&
      category === undefined &&
      isAvailable === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "At least one field is required for update",
      });
    }

    let numericPrice: number | undefined;

    if (price !== undefined) {
      numericPrice = Number(price);

      if (Number.isNaN(numericPrice) || numericPrice < 0) {
        return res.status(400).json({
          success: false,
          message: "Price must be a valid non-negative number",
        });
      }
    }

    const providerId = await getProviderId(req.user.userId);

    const menuItem = await updateMenuItem(
      menuItemId,
      providerId,
      {
        name,
        description,
        price: numericPrice,
        category,
        isAvailable,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Menu item updated successfully",
      data: menuItem,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteMenu = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const menuItemId = Number(req.params.id);

    if (Number.isNaN(menuItemId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid menu item ID",
      });
    }

    const providerId = await getProviderId(req.user.userId);

    await deleteMenuItem(menuItemId, providerId);

    return res.status(200).json({
      success: true,
      message: "Menu item deleted successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};