import express from "express";
import authController from "../controllers/auth.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const router = express.Router();

// router.get('/register', (req, res) => {
//     const __dirname = dirname(fileURLToPath(import.meta.url));
//     const filePath = join(__dirname, "../../frontend/src/pages/SignUp");
//     res.render(filePath);
// });

router.post('/register', authController.register);

router.get('/register', authController.register);


export default router;