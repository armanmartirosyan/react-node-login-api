import { Router } from "express";
import { body } from "express-validator";
import UserController from "../controllers/userController.js";

const router: Router = Router();
const userController = new UserController();

router.post('/registration', 
	body("email").isEmail(),
	body("password").isLength({ min: 3, max: 32 }),
	userController.registration.bind(userController)
);
router.post("/login", 
	body("email").isEmail(),
	body("password").isLength({ min: 3, max: 32 }),
	userController.login.bind(userController)
);
router.post("/logout", userController.logout.bind(userController));
router.get("/activate/:link", userController.activate.bind(userController));
router.get("/refresh", userController.refresh.bind(userController));
router.get("/users", userController.getUsers.bind(userController));

export default router;