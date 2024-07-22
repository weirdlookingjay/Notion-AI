"use client";

import { FormEvent, useState, useTransition } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { InviteUserToDocument } from "@/actions/actions";
import { toast } from "sonner";
import { Input } from "./ui/input";

function InviteUser() {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState("");
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleInvite = async (e: FormEvent) => {
        e.preventDefault();

        const roomId = pathname.split("/").pop();
        if (!roomId) return;

        startTransition(async () => {
            const { success } = await InviteUserToDocument(roomId, email);

            if (success) {
                setIsOpen(false);
                setEmail("");
                router.replace("/");
                toast.success("User Added to Room successfully!");
            } else {
                toast.error("Failed to add user to room!");
            }
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant="outline">
                <DialogTrigger>Invite</DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Invite a User to collaborate!</DialogTitle>
                    <DialogDescription>
                        Enter the email of the user you want to invite.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleInvite} className="flex gap-2">
                    <Input type="email" placeholder="Email" className="w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Button type="submit" disabled={!email || isPending}>{isPending ? "Inviting..." : "Invite"}</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default InviteUser