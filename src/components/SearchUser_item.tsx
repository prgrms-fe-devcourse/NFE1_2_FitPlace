import React from "react";
import iconUser from "../assets/defaultProfileImg.svg";

interface SearchUserItemProps {
    user: string;
}

const SearchUser_item: React.FC<SearchUserItemProps> = ({ user }) => {
    return (
        <div className="aspect-square min-h-[128px] mb-5 p-5 flex flex-col items-center justify-center  rounded-md bg-[#F6F6F6] shadow-lg ">
            <div className="mb-6 rounded-full overflow-hidden ">
                <img
                    src={iconUser}
                    alt="search-icon"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="font-bold mb-2">{user}</div>
            <div className="text-sm">프로필 보기</div>
        </div>
    );
};

export default SearchUser_item;
