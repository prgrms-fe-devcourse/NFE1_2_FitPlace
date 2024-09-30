import React from "react";
import Logo from "../assets/FitPlaceLogo.svg";
import notifications from "../assets/notifications.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-white w-140 p-3">
      <div className="flex justify-between">
        {/* fitplace 로고 클릭 시 메인 페이지로 이동 */}
        <Link to="/">
          <button>
            <img src={Logo} alt="Logo" />
          </button>
        </Link>

        {/* 알림 아이콘 클릭 시 알림 페이지로 이동 */}
        <Link to="/notifications">
          <button>
            <img src={notifications} alt="notifications" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
