const express = require("express");
const router = express.Router();
const {
    registerUser,
    loginUser,
    getUserProfile,
    findAvailableWalkers,
    updateUserProfile,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.get("/profile", protect, getUserProfile);
router.get("/walkers", protect, findAvailableWalkers);

module.exports = router;
