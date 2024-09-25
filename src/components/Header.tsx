import React from "react";
import Logo from "../assets/FitPlaceLogo.svg";
import notifications from "../assets/notifications.svg";

const Header = () => {
  return (
    <div className="bg-white w-140 p-3">
      <div className="flex justify-between">
        <button>
          <img src={Logo} alt="Logo" />
        </button>
        <button>
          <img src={notifications} alt="notifications" />
        </button>
      </div>
    </div>
  );
};

export default Header;
