import { Request, Response } from "express";
import {
  getPendingProviders,
  approveProvider,
  rejectProvider,
} from "../services/admin.service";

export const getPendingProvidersController = async (
  _req: Request,
  res: Response
) => {
  try {
    const providers = await getPendingProviders();

    return res.status(200).json({
      success: true,
      data: providers,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const approveProviderController = async (
  req: Request,
  res: Response
) => {
  try {
    const providerId = Number(req.params.id);

    if (Number.isNaN(providerId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid provider ID",
      });
    }

    const provider = await approveProvider(providerId);

    return res.status(200).json({
      success: true,
      message: "Provider approved successfully",
      data: provider,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const rejectProviderController = async (
  req: Request,
  res: Response
) => {
  try {
    const providerId = Number(req.params.id);

    if (Number.isNaN(providerId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid provider ID",
      });
    }

    const provider = await rejectProvider(providerId);

    return res.status(200).json({
      success: true,
      message: "Provider rejected successfully",
      data: provider,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};