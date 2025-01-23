import React from 'react';
import { useRouter } from "next/navigation";
import { DropDownContainer, dropdownMenu } from './DropDown';
import { useAuth } from "../contexts/AuthContext";
import Link from "next/link";



function ProfileDropDown(props) {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleClick = () => {
    props.setDropdownMenu(false);
  }

  return (
    <DropDownContainer>
      <p className={dropdownMenu} onClick={() => handleClick()}>
        <Link
          href="/profile"
        > My Profile
        </Link >
      </p >
      <p className={dropdownMenu} onClick={() => handleClick()}>
        <Link
          href="/records"
        > My Records
        </Link >
      </p >
      <p className={dropdownMenu} onClick={() => handleLogout()}>Sign out</p>

    </DropDownContainer>
  );
}

export default ProfileDropDown;