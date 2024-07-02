import React from 'react';
import { useRouter } from "next/navigation";
import { DropDownContainer, dropdownMenu } from './DropDown';
import { useAuth } from "../contexts/AuthContext";



function ProfileDropDown() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <DropDownContainer>
      <p className={dropdownMenu}>My Profile</p>
      <p className={dropdownMenu}>Contact Admin</p>
      <p className={dropdownMenu} onClick={() => handleLogout()}>Sign out</p>

    </DropDownContainer>
  );
}

export default ProfileDropDown;