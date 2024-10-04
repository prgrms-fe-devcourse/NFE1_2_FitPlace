import React from "react";

// Props 타입 정의
interface ButtonProps {
    label: string;
    size?: "small" | "mid" | "full";
    color?: "green" | "line" | "grey";
    margin?: "btnMr" | "btnMl" | "";
    onClick?: () => void;
    disabled?: boolean; // disabled prop 추가
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
    disabled = false, // disabled prop의 기본값 설정
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
        grey: "bg-[#E7E7E7] text-[#555]",
    };
    const marginClasses: Record<MarginClass, string> = {
        btnMr: "mr-2",
        btnMl: "ml-2",
        "": "",
    };

    // disabled 상태에 따른 추가 클래스
    const disabledClass = disabled
        ? "opacity-50 cursor-not-allowed"
        : "cursor-pointer";

    return (
        <div
            className={`rounded ${sizeClasses[size]} ${colorClasses[color]} ${marginClasses[margin as MarginClass]} ${disabledClass}`}
            onClick={disabled ? undefined : onClick}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-disabled={disabled}
        >
            {label}
        </div>
    );
};

export default Button;
