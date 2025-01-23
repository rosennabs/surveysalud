"use client"
import { useAuth } from "@/contexts/AuthContext";
import { MdOutlinePhoneIphone, MdOutlineEmail } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoLocationOutline } from "react-icons/io5";
import { GrUserWorker } from "react-icons/gr";

const Profile = () => {
  const { isAuthenticated, user} = useAuth();
  return (

      <div className="my-16 mx-24 text-xl">
        {isAuthenticated && (
          <>
            <h1 className="flex gap-4 items-center"> <CgProfile className="text-5xl" /> {user.first_name} {user.last_name}</h1>

            <div className="space-y-4 mt-12 ml-16">
              <p className="flex gap-2 items-center"><GrUserWorker />Data Analyst</p>
              <p className="flex gap-2 items-center"><MdOutlinePhoneIphone /> 7802239874</p>
              <p className="flex gap-2 items-center"><MdOutlineEmail /> {user.email}</p>
              <p className="flex gap-2 items-center"><IoLocationOutline />Alberta</p>
            </div>
            
          </>
        )}
      </div>

  )
};

export default Profile;