import jwt from "jsonwebtoken";

const authCheckMiddleware = (req, res, next) => {
    try {
        // Check for token in both cookie and Authorization header
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            console.log("token missing");
            return res.status(401).json({ message: "No token provided" });
        }
        // Verify token
        console.log("token received");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded user:", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

export default authCheckMiddleware;