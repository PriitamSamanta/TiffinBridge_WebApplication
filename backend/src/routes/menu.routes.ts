import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import {
  createMenu,
  getMenu,
  getMenuItem,
  updateMenu,
  deleteMenu,
} from "../controllers/menu.controller";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("PROVIDER"),
  createMenu
);

router.get(
  "/",
  authenticate,
  authorize("PROVIDER"),
  getMenu
);

router.get(
  "/:id",
  authenticate,
  authorize("PROVIDER"),
  getMenuItem
);

router.patch(
  "/:id",
  authenticate,
  authorize("PROVIDER"),
  updateMenu
);

router.delete(
  "/:id",
  authenticate,
  authorize("PROVIDER"),
  deleteMenu
);

export default router;