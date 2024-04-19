import Router from "next/router";
import { useEffect, useState } from "react";
import { isAuthenticated, parseJWT } from "@/lib/auth";

import { Meeting } from "@prisma/client";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { CommandIcon } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [email, setEmail] = useState('');
  const [userID, setUserID] = useState('');
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = isAuthenticated();
    if (!token) {
      Router.push("/login");
    } else {
      const decoded = parseJWT(token);
      setEmail(decoded.email);
      setUserID(decoded.userId); // Update userID here
    }
  }, []);

  useEffect(() => {
    if (userID) { // Only fetch meetings if userID is set
      fetchMeetings();
    }
  }, [userID]); // This useEffect depends on userID

  const fetchMeetings = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/meeting/getMeetings?userId=${userID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch meetings');
      }

      const data = await response.json();
      setMeetings(data.meetings);
    } catch (error) {
      console.error('Error fetching meetings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex flex-row gap-2">
        <CommandIcon />
        <div className="text-6xl font-bold p-5">
          Visit Inc.
        </div>
      </div>
      <div>
        {meetings.length > 0 ? (
          <Card>
            <CardTitle className="p-5 text-2xl">Your Meetings</CardTitle>
            <Table className="mx-10 w-[500]">
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Date and Time</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>User ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {meetings.map(meeting => (
                  <TableRow key={meeting.id}>
                    <TableCell>{meeting.id}</TableCell>
                    <TableCell>{meeting.dateTime.toString()}</TableCell>
                    <TableCell>{meeting.description}</TableCell>
                    <TableCell>{meeting.userId}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        ) : (
          <p>No meetings found</p>
        )}
      </div>
    </main>
  );
}
