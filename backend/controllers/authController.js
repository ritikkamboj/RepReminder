import User from '../models/User.js'; //  .js extension is now often required
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// const SECRET = "repreminder_secret"; // Ideally store this in env
const SECRET = process.env.SECRET; // Ideally store this in env

// Register (if needed in future)
export const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hash });
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ message: "Invalid credentials" });

        console.log(SECRET, process.env.SECRET, "jai baabe ki ");

        const token = jwt.sign({ userId: user._id }, process.env.SECRET, { expiresIn: "1d" });

        res.json({ token });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
};

// export register login;