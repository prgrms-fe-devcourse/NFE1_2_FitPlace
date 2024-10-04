import React from "react";
import iconUser from "../assets/icon_user_profile.svg";

interface CurrentMemberItemProps {
    userName: string;
}
const CurrentMemberItem = ({
    userName,
}: CurrentMemberItemProps): JSX.Element => {
    return (
        <div className="flex flex-col text-center gap-1.5">
            <img src={iconUser} alt="프로필이미지" />
            <p>{userName}</p>
        </div>
    );
};

export default CurrentMemberItem;
