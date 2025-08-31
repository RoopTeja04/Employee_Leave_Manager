const express = require("express");
const router = express.Router();
const leaveController = require("../controllers/leavecontroller");

router.post("/apply", leaveController.applyLeave);
router.get("/status/:employeeName", leaveController.getLeaveStatus);
router.get("/balance/:employeeName", leaveController.getLeaveBalance);
router.get("/all", leaveController.getLeaves);
router.put("/update/:leaveId", leaveController.updateLeaveStatus);

module.exports = router;