const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Main = require("../models/main");

exports.CreateAccount = async (req, res) => {

    const { name, email, password, department, role, joinedAt } = req.body;

    try {

        const existingUser = await Main.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await Main.create({
            name, email,
            password: hashedPassword,
            department, role : role ? role : "employee" ,
            joinedAt: joinedAt ? new Date(joinedAt) : Date.now()
        })

        res.status(200).json({ message: "User registered successfully" });

    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }

}

exports.Login = async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await Main.findOne({ email });

        if (!user)
            return res.status(400).json({ message: "User Not Found!" });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect || !user)
            return res.status(400).json({ message: "Invalid Credentials!" });

        const token = jwt.sign({ name: user.name, id: user._id }, process.env.JWT_SECRET, { expiresIn: "2h" })

        return res.status(200).json({ message: "Login Successful", token, name: user.name, role: user.role });

    }
    catch (err) {
        return res.status(500).json({ message: "Server Error...! " });
    }

}

exports.getAllUsers = async (req, res) => {

    try {

        const Users = await Main.find({ role: "employee" });
        return res.status(200).json(Users);

    }
    catch (err) {
        return res.send(500).json({ message: "Server Error...! " });
    }

}