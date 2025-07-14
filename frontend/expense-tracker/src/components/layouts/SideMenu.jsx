import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA } from "../../utils/data";

const SideMenu = ({activeMenu}) => {
  const { user, clearUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleClick = (route) => {
    if(route === "logout") {
        handleLogout();
        return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return <div className="">
    <div className="">
        {user?.profileImageUrl ? 
        (
            <img
                src={user?.profileImageUrl || ""}
                alt="Profile Image"
                className=""
            />
        ) : (
            <></>
        )}

        <h5 className="">
            {user?.fullName || ""} 
        </h5>
    </div>

    {SIDE_MENU_DATA.map ((item))}
  </div>;
};

export default SideMenu;
