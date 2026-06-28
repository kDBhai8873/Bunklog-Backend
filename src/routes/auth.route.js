import { Router } from "express";
import { getMe, login, register } from "../controllers/auth.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/home").get((req, res) => {
  res.send("Its home");
});
router.route("/register").post(register);
router.route("/login").post(login);

router.route("/getMe").get(auth,getMe);

export default router;
