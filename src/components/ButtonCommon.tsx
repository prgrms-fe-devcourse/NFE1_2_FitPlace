import React from "react";

// Props 타입 정의
interface ButtonProps {
    label: string;
    size?: "small" | "mid" | "full";
    color?: "green" | "line" | "grey";
}

// 크기와 색상에 대한 타입 정의
type SizeClass = "small" | "mid" | "full";
type ColorClass = "green" | "line" | "grey";

const ButtonCommon: React.FC<ButtonProps> = ({
    label,
    size = "mid",
    color = "green",
}) => {
    // 크기와 색상에 따라 Tailwind CSS 클래스를 설정합니다.
    const sizeClasses: Record<SizeClass, string> = {
        small: "inline-block px-2 py-1 text-sm",
        mid: "inline-block roundedpx-4 px-4 py-2 text-sm ",
        full: "px-4 py-2 text-sm ",
    };

    const colorClasses: Record<ColorClass, string> = {
        green: " bg-[#AFE327] text-[#333] hover:bg-[#C4F545]",
        line: "border-2 border-[#AFE327] text-[#555] hover:bg-[#AFE327] hover:text-[#555]",
        grey: " bg-[#e7e7e7] text-[#555] hover:bg-[#666] hover:text-[#fff]",
    };

    return (
        <div
            className={`rounded ${sizeClasses[size]} ${colorClasses[color]} cursor-pointer`}
        >
            {label}
        </div>
    );
};

export default ButtonCommon;
