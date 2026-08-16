import { Router } from "express";
import { authenticate, AuthRequest } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

router.get(
  "/profile",
  authenticate,
  (req: AuthRequest, res) => {
    return res.json({
      success: true,
      message: "You can access this protected route",
      user: req.user,
    });
  }
);

router.get(
  "/provider-test",
  authenticate,
  authorize("PROVIDER"),
  (req: AuthRequest, res) => {
    return res.json({
      success: true,
      message: "Provider access granted",
      user: req.user,
    });
  }
);

export default router;