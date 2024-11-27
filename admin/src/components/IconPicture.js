import React from "react";

const ProfileIcon = ({ name, bgColor = "bg-gray-500", textColor = "text-white" }) => {
  const initial = name ? name.charAt(0).toUpperCase() : "?";

  return (
    <div
      className={`flex items-center justify-center ${bgColor} ${textColor} w-8 h-8 rounded-full text-lg font-bold`}
    >
      {initial}
    </div>
  );
};

export default ProfileIcon;
