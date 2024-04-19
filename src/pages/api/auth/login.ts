import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        // Create JWT Token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Set Cookie
        // res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=${2 * 60 * 60}; SameSite=Strict`);

        res.status(200).json({ message: "Login Successful", token });
    } catch (error) {
        res.status(400).json({ error: 'Something went wrong' });
    }

}