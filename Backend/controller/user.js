// export const checkUserAuth = (req, res) => {
//     try {
//       const token = req.cookies.userToken;
  
//       if (!token) {
//         return res.status(401).json({ message: "No token found" });
//       }
  
//       // You can add optional JWT verification if needed
//       return res.status(200).json({ message: "User is authenticated" });
//     } catch (err) {
//       res.status(500).json({ message: "Internal Server Error", error: err.message });
//     }
//   };