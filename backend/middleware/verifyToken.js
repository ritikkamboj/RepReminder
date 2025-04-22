import jwt from 'jsonwebtoken';
const SECRET = "repreminder_secret"; // Same secret

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(403).json({ message: "No token provided" });

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Invalid token" });

        req.userId = decoded.userId;
        next();
    });
};

export default verifyToken;