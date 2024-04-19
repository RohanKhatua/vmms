import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("Request received at getMeetings API");
    const prisma = new PrismaClient();

    const userId = req.query.userId as string;

    console.log("Used ID received from query", userId);

    if (req.method === 'GET') {
        const meetings = await prisma.meeting.findMany({
            where: {
                userId
            }
        });

        console.log("Meetings fetched", meetings);

        res.status(200).json({ meetings });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}