import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

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

        // TODO: Session Management

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: 'Something went wrong' });
    }

}