import React, { useState, useEffect, useRef } from "react";
import iconUser from "../assets/defaultProfileImg.svg";
import iconMore from "../assets/icon_more.svg";

interface CommentProps {
    item: {
        comment: string;
        author: {
            fullName?: string;
        };
        post: string;
    };
}

const CommentItem = ({ item }: CommentProps): JSX.Element => {
    const [showOptions, setShowOptions] = useState(false);
    const timerRef = useRef<number | null>(null);

    const toggleOptions = () => {
        setShowOptions(true);

        if (timerRef.current !== null) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = window.setTimeout(() => {
            setShowOptions(false);
            timerRef.current = null;
        }, 5000);
    };

    const handleEdit = () => {
        // 수정 로직
    };

    const handleDelete = () => {
        // 삭제 로직
    };

    useEffect(() => {
        return () => {
            if (timerRef.current !== null) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    return (
        <div className="relative flex items-start w-full">
            <div className="w-10 mr-4 flex-shrink-0">
                <img
                    src={iconUser}
                    alt="user-icon"
                    className="w-full h-full object-cover rounded-full overflow-hidden"
                />
            </div>
            <div className="flex-grow">
                <div className="text-sm mb-2">{item.author.fullName}</div>
                <div className="text-base">{item.comment}</div>
            </div>
            {item.author.fullName === "선영" && (
                <div className="absolute top-0 right-0">
                    {!showOptions ? (
                        <img
                            src={iconMore}
                            alt="more-options"
                            className="w-6 h-6 object-contain cursor-pointer"
                            onClick={toggleOptions}
                        />
                    ) : (
                        <div className="flex items-center">
                            <div
                                className="cursor-pointer hover:underline"
                                onClick={handleEdit}
                            >
                                수정
                            </div>
                            <div className="mx-4 text-gray-300">|</div>
                            <div
                                className="cursor-pointer text-red-500 hover:underline"
                                onClick={handleDelete}
                            >
                                삭제
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CommentItem;
