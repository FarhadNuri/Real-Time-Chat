import express from express;
import { getUserForSidebar, getMessages, sendMessage } from '../controllers/message.controller.js';
import { protectRotue } from '../middleware/protectRoute.middleware.js';
const router = express.Router();

router.get("/user",protectRotue, getUserForSidebar);
router.get("/:id",protectRotue, getMessages);
router.post("/send/:id",protectRotue, sendMessage);

export default router;