import { NavLink } from "react-router-dom";
import {
  IconHome,
  IconDownload,
  IconHistory,
  IconSettings,
  IconUser,
  IconLogout,
} from "@tabler/icons-react";



export default function Sidebar() {
  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: IconHome,
    },
    {
      name: "Downloads",
      path: "/dashboard/downloads",
      icon: IconDownload,
    },
    {
      name: "History",
      path: "/dashboard/history",
      icon: IconHistory,
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: IconSettings,
    },
  ];


  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span>YT</span> Downloader
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key ={item.path}
              to ={item.path}
              className ={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <Icon className="sidebar-icon" size={18} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <IconUser className="sidebar-icon" size= {18} />
          <span>Profile</span>
        </NavLink>

        <button className="sidebar-link sidebar-logout">
          <IconLogout className="sidebar-icon" size= {18} />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}