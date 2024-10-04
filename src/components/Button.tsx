import React from "react";

// Props 타입 정의
interface ButtonProps {
    label: string;
    size?: "small" | "mid" | "full";
    color?: "green" | "line" | "grey";
    margin?: "btnMr" | "btnMl" | "";
    onClick?: () => void;
}

// 크기와 색상에 대한 타입 정의
type SizeClass = "small" | "mid" | "full";
type ColorClass = "green" | "line" | "grey";
type MarginClass = "btnMr" | "btnMl" | "";

const Button = ({
    label,
    size = "full",
    color = "green",
    margin = "",
    onClick,
}: ButtonProps): JSX.Element => {
    // 크기와 색상에 따라 Tailwind CSS 클래스를 설정합니다.
    const sizeClasses: Record<SizeClass, string> = {
        small: "inline-block px-2 py-1 text-sm flex items-center justify-center min-w-14",
        mid: "inline-block px-4 py-2 text-sm",
        full: "flex items-center justify-center w-full px-4 py-2 text-sm",
    };
    const colorClasses: Record<ColorClass, string> = {
        green: "bg-[#AFE327] text-[#333] hover:bg-[#C4F545]",
        line: "border-2 border-[#AFE327] text-[#555] hover:bg-[#AFE327] hover:text-[#555]",
        grey: "bg-[#E7E7E7] text-[#555] cursor-not-allowed opacity-50",
    };
    const marginClasses: Record<MarginClass, string> = {
        btnMr: "mr-2",
        btnMl: "ml-2",
        "": "",
    };

    // grey 색상일 때 비활성화 상태를 설정
    const isDisabled = color === "grey";

    return (
        <div
            className={`rounded ${sizeClasses[size]} ${colorClasses[color]} ${marginClasses[margin as MarginClass]} ${isDisabled ? "" : "cursor-pointer"}`}
            onClick={isDisabled ? undefined : onClick}
            role="button"
            tabIndex={isDisabled ? -1 : 0}
            aria-disabled={isDisabled}
        >
            {label}
        </div>
    );
};

export default Button;
