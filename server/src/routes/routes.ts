import { Router } from "express";
import UserController from "../controllers/userController.js";

const router: Router = Router();
const userController = new UserController();

router.post('/registration', userController.registration.bind(userController));
router.post("/login", userController.login.bind(userController));
router.post("/logout", userController.logout.bind(userController));
router.get("/activate/:link", userController.activate.bind(userController));
router.get("/refresh", userController.refresh.bind(userController));
router.get("/users", userController.getUsers.bind(userController));

export default router;