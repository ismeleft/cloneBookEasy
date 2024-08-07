"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCar,
  faPlane,
  faTaxi,
  faToriiGate,
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const options = [
  { icon: faBed, label: "住宿" },
  { icon: faPlane, label: "航班" },
  { icon: faCar, label: "租車" },
  { icon: faToriiGate, label: "景點/活動" },
  { icon: faTaxi, label: "機場計程車" },
];

interface NavbarButtonProps {
  icon: IconDefinition;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavbarButton: React.FC<NavbarButtonProps> = ({
  icon,
  label,
  active,
  onClick,
}) => (
  <div
    className={`flex items-center gap-2.5 rounded-full px-4 py-2 hover:bg-white hover:bg-opacity-10 whitespace-pre cursor-pointer ${
      active ? "border border-white bg-white bg-opacity-10" : ""
    }`}
    onClick={onClick}
    role="button"
    aria-pressed={active}
  >
    <FontAwesomeIcon icon={icon} className="w-4" />
    <span>{label}</span>
  </div>
);

const Navbar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <div className="w-full h-40 bg-primary flex justify-center">
      <div className="w-11/12 h-full max-w-screen-lg text-white mx-auto">
        <div className="flex h-1/2 items-center justify-between">
          <div className="flex">
            <span
              className="text-xl font-medium cursor-pointer"
              onClick={() => (window.location.href = "/")}
            >
              BOOKEASY
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-full h-[30px] w-[30px] border-none bg-[url('https://q-xx.bstatic.com/backend_static/common/flags/new/48-squared/tw.png')] bg-cover hover:cursor-pointer hover:border hover:border-gray-300" />
            <button className="text-sm ml-2 px-4 py-2 border border-white bg-primary text-white hover:bg-white hover:bg-opacity-10">
              使用 webpack 測試
            </button>
            <button className="text-sm ml-2 px-4 py-2 bg-white text-primary">
              註冊
            </button>
            <button className="text-sm ml-2 px-4 py-2 bg-white text-primary">
              登入
            </button>
          </div>
        </div>
        <div className="flex h-1/2 items-start gap-5">
          {options.map((option, index) => (
            <NavbarButton
              key={index}
              icon={option.icon}
              label={option.label}
              active={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
