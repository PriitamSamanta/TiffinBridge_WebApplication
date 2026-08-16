import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { createProvider } from "../services/provider.service";

export const registerProvider = async (
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

    const { businessName, description, phone, address } = req.body;

    if (!businessName) {
      return res.status(400).json({
        success: false,
        message: "Business name is required",
      });
    }

    const provider = await createProvider({
      userId: req.user.userId,
      businessName,
      description,
      phone,
      address,
    });

    return res.status(201).json({
      success: true,
      message: "Provider profile submitted for approval",
      data: provider,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};