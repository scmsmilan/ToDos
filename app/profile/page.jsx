"use client";
import React from "react";
import { useSession } from "next-auth/react";
const Profile = () => {
  const { data: session } = useSession();
  return (
    <div>
      {session ? (
        <section>
          <div className="text-xl text-center">Signed In As</div>
          <div className="text-5xl text-green-600 text-center">
            {session?.user.name}
          </div>
          <div className="text-2xl text-green-600 text-center">
            {session?.user.email}
          </div>
        </section>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Profile;
