import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

import { CommandIcon, GithubIcon } from "lucide-react"
import LoginPage from "@/components/login-form"

export default function Component() {
    return (
        <div className="min-h-screen flex">
            <div className="flex-1 flex flex-col justify-between p-8 bg-zinc-900">
                <div className="flex flex-row items-center gap-5">
                    <CommandIcon className="h-6 w-6 text-white" />
                    <h1 className="text-white text-2xl">Visit Inc.</h1>
                </div>
                <div className="text-white">
                    <blockquote>
                        For Meetings that cannot be emails.
                    </blockquote>
                </div>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center bg-black">
                <LoginPage></LoginPage>
            </div>
        </div>
    )
}