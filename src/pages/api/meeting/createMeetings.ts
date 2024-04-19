import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();

    const { description, date, userId, duration } = req.body;

    if (req.method === 'POST') {
        const meeting = await prisma.meeting.create({
            data: {
                description,
                dateTime: new Date(date),
                duration,
                userId
            }
        });

        res.status(200).json({ meeting });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}