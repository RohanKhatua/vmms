import { Inter } from "next/font/google";
import Router from "next/router";
import { isAuthenticated } from "@/lib/auth";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  useEffect(() => {
    if (!isAuthenticated()) {
      Router.push("/login");
    }
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1>Welcome to VMMS - You are authenticated</h1>
    </main>
  );
}
