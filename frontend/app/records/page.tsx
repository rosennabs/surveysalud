"use client";
import { useAuth } from "@/contexts/AuthContext";


const Records = () => {
  const { isAuthenticated} = useAuth();
  return (

    <div className="my-16 mx-24 text-xl">
      {isAuthenticated && (
        <>
          <h1 className="flex gap-4 items-center">Records</h1>

          <div className="space-y-4 mt-12 ml-16">
            <p className="flex gap-2 items-center">Child vaccination survey : 6</p>
            <p className="flex gap-2 items-center">Child nutrition survey : 4</p>
            <p className="flex gap-2 items-center">Antenatal survey : 2</p>
            <p className="flex gap-2 items-center">Postnatal survey : 7</p>
          </div>

        </>
      )}
    </div>

  );
};

export default Records;