"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

function PromptCard({ post, handleEdit, handleDelete, handleTagClick }) {
    const { data: session } = useSession();
    const pathName = usePathname();
    const router = useRouter();

    const [copied, setCopied] = useState("");

    // extra code
    //where i am destructuring props like 'post.creator.username' and ' post.creator.email

    if (!post || !post._id) {
        console.log(post);
        return null; // or handle the case gracefully
    }

    const image = post.creator?.image;
    const username = post.creator?.username;
    const email = post.creator?.email;
    const prompt = post?.prompt;
    const tag = post?.tag;
    const _id = post.creator?._id;

    const handleProfileClick = () => {
        console.log(post);

        if (_id === session?.user.id) return router.push("/profile");

        router.push(`/profile/${_id}?name=${username}`);
    };

    const handleCopy = () => {
        // setCopied(post.prompt);
        setCopied(prompt);
        navigator.clipboard.writeText(prompt);
        setTimeout(() => setCopied(false), 3000);
    };

    return (
        <div className="prompt_card relative">
            <div className="flex flex-col">
                <h3 className="font-satoshi font-semibold text-gray-900">
                    {username}
                </h3>
                <p className="font-inter text-sm text-gray-500">{email}</p>
            </div>

            <div
                className="copy_btn absolute top-3 right-3"
                onClick={handleCopy}>
                <Image
                    src={
                        copied === prompt
                            ? "/assets/icons/tick.svg"
                            : "/assets/icons/copy.svg"
                    }
                    alt={copied === prompt ? "tick_icon" : "copy_icon"}
                    width={12}
                    height={12}
                />
            </div>

            <p className="my-4 font-satoshi text-sm text-gray-700">{prompt}</p>
            <p
                className="font-inter text-sm blue_gradient cursor-pointer"
                onClick={() => handleTagClick && handleTagClick(tag)}>
                #{tag}
            </p>

            {session?.user.id === _id && pathName === "/profile" && (
                <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
                    <p
                        className="font-inter text-sm green_gradient cursor-pointer"
                        onClick={handleEdit}>
                        Edit
                    </p>
                    <p
                        className="font-inter text-sm orange_gradient cursor-pointer"
                        onClick={handleDelete}>
                        Delete
                    </p>
                </div>
            )}
        </div>
    );
}

export default PromptCard;
