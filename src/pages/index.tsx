import Router from "next/router";
import { useEffect, useState } from "react";
import { isAuthenticated, parseJWT } from "@/lib/auth";

import { Meeting } from "@prisma/client";

export default function Home() {
  const [email, setEmail] = useState('');
  const [userID, setUserID] = useState('');
  const [meetings, setMeetings] = useState<Meeting[]>([]); // State to store meetings data

  useEffect(() => {
    const token = isAuthenticated();
    if (!token) {
      Router.push("/login");
    } else {
      console.log("Authenticated, printing token from index");
      const decoded = parseJWT(token);
      console.log(decoded);
      setEmail(decoded.email);
      setUserID(decoded.userId);

      // Fetch meetings once the user is authenticated
      if (userID != '') {
        fetchMeetings();
      }
    }
  }, []);

  const fetchMeetings = async () => {
    try {
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
      console.log('Meetings:', data);
      setMeetings(data.meetings);
    } catch (error) {
      console.error('Error fetching meetings:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>Welcome to VMMS - You are authenticated</h1>
      <p>Your email is {email}</p>
      <p>Your user id is {userID}</p>
      <div>
        <h2>Your Meetings</h2>
        {meetings && meetings.length > 0 ? (
          <ul>
            {meetings.map(meeting => (
              <li key={meeting.id}>{meeting.description} - {meeting.duration}</li>
            ))}
          </ul>
        ) : (
          <p>No meetings found</p>
        )}
      </div>
    </main>
  );
}
