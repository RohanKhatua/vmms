import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Invalidate Session/Token
    res.status(401).json({ error: 'Logged Out' });
}