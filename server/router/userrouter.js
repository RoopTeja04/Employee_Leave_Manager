const express = require('express');
const router = express.Router();
const authController = require('../controllers/authcontroller');

router.post("/register", authController.CreateAccount);
router.post("/login", authController.Login);
router.get("/all", authController.getAllUsers);

module.exports = router;