import React from 'react';


const ProfileMenu = ({ setMenu,menu }) => {
	return (
    <div className="flex lg:flex-col flex-row gap-5 text-lg lg:text-2xl  mr-0 ml-auto lg:divide-y-2 divide-x-2 lg:divide-x-0 lg:w-[70%] px-5 lg:px-0">
      <button
        className={`p-3 w-full text-left ${menu === 1 && "font-bold"}`}
        onClick={() => setMenu(1)}
      >
        Info
      </button>
      <button
        className={`p-3 w-full text-left ${menu === 2 && "font-bold"}`}
        onClick={() => setMenu(2)}
      >
        Orders
      </button>
      <button className={`p-3 w-full text-left ${menu === 3 && "font-bold"}`}>
        Change Password
      </button>
      <button className={`p-3 w-full text-left ${menu === 4 && "font-bold"}`}>
        Logout
      </button>
    </div>
  );
};

export default ProfileMenu