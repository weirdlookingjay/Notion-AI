"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Editor from "./Editor";

function Document({ id }: { id: string }) {
    const [input, setInput] = useState("");
    const [isUpdating, startTransition] = useTransition();
    const [data, laoding, error] = useDocumentData(doc(db, "documents", id));

    useEffect(() => {
        if (data) {
            setInput(data.title);
        }
    }, [data]);

    const updateTile = (e: FormEvent) => {
        e.preventDefault();

        if (input.trim()) {
            startTransition(async () => {
                await updateDoc(doc(db, "documents", id), {
                    title: input
                });
            })
        }
    }

    return (
        <div>
            <div className="flex max-w-6xl mx-auto justify-between pb-5">
                <form onSubmit={updateTile} className="flex flex-1 spce-x-2">
                    {/* Update Title */}
                    <Input value={input} onChange={(e) => setInput(e.target.value)} />

                    <Button type="submit" disabled={isUpdating}>
                        {isUpdating ? "Updating..." : "Update"}
                    </Button>

                    {/* IF */}
                    {/* isOwner && InviteUser, DeleteDocument */}
                </form>
            </div>
            {/* Mange Users */}
            {/* Avatars */}
            <hr className="pb-10" />
            {/* Collaborative Editor */}
            <Editor />

        </div>
    )
}

export default Document