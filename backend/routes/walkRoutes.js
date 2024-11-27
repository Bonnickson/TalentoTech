const express = require("express");
const router = express.Router();
const {
    createWalk,
    getWalks,
    updateWalkStatus,
} = require("../controllers/walkController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createWalk);
router.get("/", protect, getWalks);
router.put("/:id", protect, updateWalkStatus);

module.exports = router;
