
import React from 'react'
import { useSession, signOut } from "next-auth/react";
import {Link} from "nextjs13-progress";

const getFirstName = (fullName) => {
  const firstName = fullName?.split(" ")[0];
  return firstName;
};



function Logged_name({ scrollY, isHomePage }) {
  const { data: session } = useSession();

  const id = session?.user?.id;
  const firstName = getFirstName(session?.user?.name);
  return (
    <div className="flex py-1 pr-5 items-center ">
      {session ? (
        <div className="flex ">
          <Link
            href={`/profile/${id}`}
            className={`flex items-center font-semibold text-nowrap text-xs lg:text-sm px-2         `}
          >
            Hi, {firstName}
          </Link>
          <div
            className="md:text-sm   px-2 
               rounded-xl font-semibold  text-nowrap cursor-pointer"
            onClick={() => signOut()}
          >
            Log Out
          </div>
        </div>
      ) : (
        <div className="flex gap-3 ">
          <Link href={`/login`}>Login</Link>
          <Link href={`/register`}>Register</Link>
        </div>
      )}
    </div>
  );
}

export default Logged_name