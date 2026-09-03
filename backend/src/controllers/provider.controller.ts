import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { createProvider, getApprovedProviders, } from "../services/provider.service";

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

export const getProviders = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const providers = await getApprovedProviders();

    return res.status(200).json({
      success: true,
      message: "Approved providers fetched successfully",
      data: providers,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch providers",
    });
  }
};