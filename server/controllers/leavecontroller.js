const Leave = require("../models/leave");
const Main = require("../models/main");
const Notification = require("../models/notifications");
const sendMail = require("../utils/sendmail");

exports.applyLeave = async (req, res) => {

    const { employeeName, startDate, endDate, reason } = req.body;

    try {

        const employee = await Main.findOne({ name: employeeName });

        if (!employee)
            return res.status(404).json({ message: "Employee Not Found!" });

        else if (new Date(startDate) < new Date(employee.joinedAt))
            return res.status(400).json({ message: "Leave cannot be applied before joining date" })

        else if (new Date(endDate) < new Date(startDate))
            return res.status(400).json({ message: "End date cannot be before start date" })

        const leaveDays = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1

        if (leaveDays > employee.levaes)
            return res.status(400).json({ message: "No Leaves Available" })

        const overlap = await Leave.findOne({
            employee: employee._id,
            $or: [
                { startDate: { $lte: endDate }, endDate: { $gte: startDate } },
            ],
        });

        if (overlap) {
            return res.status(400).json({ error: "Overlapping leave request exists" });
        }

        await Leave.create({ employee: employee._id, startDate, endDate, reason });

        return res.status(200).json({ message: "Leave Applied Successfully" });

    }
    catch (err) {
        return res.status(500).json({ message: "Server Error...! " });
    }

}

exports.getLeaveStatus = async (req, res) => {

    const { employeeName } = req.params;

    try {
        const employeeFounded = await Main.findOne({ name: employeeName });

        if (!employeeFounded)
            return res.status(404).json({ message: "Employee Not Found!" });

        const leaves = await Leave.find({ employee: employeeFounded._id })
            .select('startDate endDate reason status')
            .sort({ startDate: 1 });

        return res.status(200).json({
            leaves,
            totalLeaves: employeeFounded.levaes
        });
    }
    catch (err) {
        return res.status(500).json({ message: "Server Error" });
    }
}

exports.getLeaveBalance = async (req, res) => {

    const { employeeName } = req.params;

    try {

        const employee = await Main.findOne({ name: employeeName });

        if (!employee)
            return res.status(404).json({ message: "Employee Not Found!" });

        const TotalLeavesPerYear = employee.levaes

        const leaves = await Leave.find({ employee: employee._id, status: "approved" });

        const totalLeaveDaysTaken = leaves.reduce((total, leave) => {
            const start = new Date(leave.startDate);
            const end = new Date(leave.endDate);
            const leaveDays = (end - start) / (1000 * 60 * 60 * 24) + 1;
            return total + leaveDays;
        }, 0);

        employee.levaes = Math.max(0, TotalLeavesPerYear - totalLeaveDaysTaken);

        return res.status(200).json({ leaves, totalLeaves: employee.levaes, TotalLeavesPerYear, totalLeaveDaysTaken });

    }
    catch (err) {
        return res.status(500).json({ message: "Server Error..." });
    }

}

exports.updateLeaveStatus = async (req, res) => {
    const { leaveId } = req.params;
    const { status } = req.body;

    try {
        if (!["approved", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid Status" });
        }

        const leave = await Leave.findById(leaveId).populate("employee");

        if (!leave) {
            return res.status(404).json({ message: "Leave Not Found!" });
        }

        if (leave.status !== "pending") {
            return res.status(400).json({ message: `Leave is already ${leave.status}` });
        }

        if (status === "approved") {
            const start = new Date(leave.startDate);
            const last = new Date(leave.endDate);
            const leaveDays = (last - start) / (1000 * 60 * 60 * 24) + 1;

            const approvedLeaves = await Leave.find({
                employee: leave.employee._id,
                status: "approved",
            });

            const approvedLeaveDays = approvedLeaves.reduce((sum, l) => {
                const s = new Date(l.startDate);
                const e = new Date(l.endDate);
                return sum + ((e - s) / (1000 * 60 * 60 * 24) + 1);
            }, 0);

            const remaining = leave.employee.levaes - approvedLeaveDays;

            if (leaveDays > remaining) {
                return res.status(400).json({ message: "No Leaves Available" });
            }

            leave.status = "approved";
            await leave.save();

            await Notification.create({
                user: leave.employee._id,
                message: `Your Leave from ${leave.startDate.toDateString()} to ${leave.endDate.toDateString()} has been approved ✅`,
            })

            await sendMail(
                leave.employee.email,
                "Leave Approved",
                `Hello, ${leave.employee.name} Your Leave from ${leave.startDate.toDateString()} to ${leave.endDate.toDateString()} has been approved ✅`
            )

            return res.status(200).json({
                message: `${leave.employee.name} Leave Approved Successfully`,
                leave,
                remainingLeaves: remaining - leaveDays
            });
        }

        if (status === "rejected") {
            leave.status = "rejected";
            await leave.save();

            await Notification.create({
                user: leave.employee._id,
                message: `Your leave from ${leave.startDate.toDateString()} to ${leave.endDate.toDateString()} has been rejected ❌`,
            })

            await sendMail(
                leave.employee.email,
                "Leave Rejected",
                `Hello ${leave.employee.name}, your leave from ${leave.startDate.toDateString()} to ${leave.endDate.toDateString()} has been rejected ❌`
            )

            return res.status(200).json({
                message: `${leave.employee.name} Leave Rejected Successfully`,
                leave,
            });
        }

    } catch (err) {
        return res.status(500).json({ message: "Server Error..." });
    }
};

exports.getLeaves = async (req, res) => {

    try {
        const leaves = await Leave.find()
            .populate("employee", "-password -__v")
            .sort({ createdAt: -1 });

        return res.status(200).json({ leaves });
    }
    catch (err) {
        return res.status(500).json({ message: "Server Error..." });
    }

}