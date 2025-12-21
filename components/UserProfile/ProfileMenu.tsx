import React from "react";

interface Props {
  menu: number;
  setMenu: (value: number) => void;
}

export default function ProfileMenu({ menu, setMenu }: Props) {
  const menus = ["Orders", "Info"];

  return (
    <nav className="flex flex-row lg:flex-col gap-5 lg:divide-y divide-x lg:divide-x-0 text-lg lg:text-2xl px-5">
      {menus.map((label, index) => (
        <button
          key={label}
          className={`p-3 w-full text-left ${menu === index + 1 ? "font-bold text-green-500" : ""}`}
          onClick={() => setMenu(index + 1)}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
