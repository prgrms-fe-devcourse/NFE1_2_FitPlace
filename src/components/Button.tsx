import React from "react";
// Props 타입 정의
interface ButtonProps {
    label: string;
    size?: "small" | "mid" | "full";
    color?: "green" | "line" | "grey";
    margin?: "btnMr" | "btnMl" | "";
    onClick?: () => void; // onClick 이벤트 핸들러 추가
}
// 크기와 색상에 대한 타입 정의
type SizeClass = "small" | "mid" | "full";
type ColorClass = "green" | "line" | "grey";
type MarginClass = "btnMr" | "btnMl" | "";

const Button: React.FC<ButtonProps> = ({
    label,
    size = "full",
    color = "green",
    margin = "",
    // onClick 이벤트 props 추가
    onClick,
}) => {
    // 크기와 색상에 따라 Tailwind CSS 클래스를 설정합니다.
    const sizeClasses: Record<SizeClass, string> = {
        small: "inline-block px-2 py-1 text-sm",
        mid: "inline-block px-4 py-2 text-sm",
        full: "px-4 py-2 text-sm ",
    };
    const colorClasses: Record<ColorClass, string> = {
        green: " bg-[#AFE327] text-[#333] hover:bg-[#C4F545]",
        line: "border-2 border-[#AFE327] text-[#555] hover:bg-[#AFE327] hover:text-[#555]",
        grey: " bg-[#E7E7E7] text-[#555] hover:bg-[#666] hover:text-[#fff]",
    };
    const marginClasses: Record<MarginClass, string> = {
        btnMr: "mr-2",
        btnMl: "ml-2",
        "": "",
    };

    return (
        <div
            className={`rounded ${sizeClasses[size]} ${colorClasses[color]} ${marginClasses[margin as MarginClass]} cursor-pointer`}
            // onClick 이벤트 핸들러 추가
            onClick={onClick}
        >
            {label}
        </div>
    );
};
export default Button;
