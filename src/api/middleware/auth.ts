import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

type JWTType = {
  user: string
}
export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("token");
  if (!token) return res.status(401).json({ message: "Auth Error" });

  try {
    const decoded = <any>jwt.verify(token, "secret");
    req.headers[`user`] = decoded.user;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
};