import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: 'Something went wrong' });
    }
}