import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA } from "../../utils/data";
import CharAvatar from "../Cards/CharAvatar";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "/logout") {
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

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
      <div className="flex flex-col items-center justify-center mb-7 gap-3 mt-3">
        {user?.profileImageUrl ?
          (
            <img
              src={user?.profileImageUrl || ""}
              alt="Profile Image"
              className="w-20 h-20 bg-slate-400 rounded-full"
            />
          ) : (
            <CharAvatar
              fullName={user?.fullName} width='w-20' height='h-20' style="text-xl"
            />
          )}

        <h5 className="text-gray-950 font-medium leading-6">
          {user?.fullName || ""}
        </h5>
      </div>

      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] ${activeMenu === item.label ? "text-white bg-primary" : ""} py-3 px-6 rounded-lg mb-3`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  )
};

export default SideMenu;
























// import React, { useContext } from "react";
// import { UserContext } from "../../context/userContext";
// import { useNavigate } from "react-router-dom";
// import { SIDE_MENU_DATA } from "../../utils/data";
// import CharAvatar from "../Cards/CharAvatar";

// const SideMenu = ({ activeMenu }) => {
//   const { user, clearUser } = useContext(UserContext);
//   const navigate = useNavigate();

//   const handleClick = (route) => {
//     if (route === "logout") {
//       handleLogout();
//     } else {
//       navigate(route);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.clear();   // Clear auth data
//     clearUser();            // Clear context
//     navigate("/login");     // Redirect to login
//   };

//   return (
//     <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
//       {/* User Profile Section */}
//       <div className="flex flex-col items-center justify-center mb-7 gap-3 mt-3">
//         {user?.profileImageUrl ? (
//           <img
//             src={user?.profileImageUrl}
//             alt="Profile"
//             className="w-20 h-20 bg-slate-400 rounded-full"
//           />
//         ) : (
//           <CharAvatar
//             fullName={user?.fullName}
//             width="w-20"
//             height="h-20"
//             style="text-xl"
//           />
//         )}
//         <h5 className="text-gray-950 font-medium leading-6">
//           {user?.fullName || ""}
//         </h5>
//       </div>

//       {/* Menu Items */}
//       {SIDE_MENU_DATA.map((item, index) => {
//         const isLogout = item.path === "logout";
//         const isActive = activeMenu === item.label;

//         return (
//           <button
//             key={`menu_${index}`}
//             onClick={() => handleClick(item.path)}
//             className={`w-full flex items-center gap-4 text-[15px]
//               ${isLogout
//                 ? "text-red-500 hover:bg-red-50"
//                 : isActive
//                 ? "text-white bg-primary"
//                 : "text-gray-700 hover:bg-gray-100"}
//               py-3 px-6 rounded-lg mb-3 transition-all`}
//           >
//             <item.icon className="text-xl" />
//             {item.label}
//           </button>
//         );
//       })}
//     </div>
//   );
// };

// export default SideMenu;
