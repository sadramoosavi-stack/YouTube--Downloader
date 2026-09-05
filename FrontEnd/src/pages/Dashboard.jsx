import { useState } from "react";
import { Link } from "react-router-dom";

import {
  IconLayoutDashboard,
  IconDownload,
  IconHeart,
  IconSettings,
  IconLogout,
  IconMenu2,
  IconSearch,
  IconBell,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";

import "./Dashboard.css";

import Sidebar from "@/pages/Sidebar";
import DownloadBox from "../components/DownloadBox";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const  [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user } = useAuth();

  const displayName = user?.username || "user";
  const avatarLetter = displayName.charAt(0).toUpperCase();

  return (
    <div  className="dashboard-page">


      <Sidebar />

      <div
        className={`dashboard-main ${
          sidebarCollapsed ? "sidebar-is-collapsed" : ""
        }`}
      >

        <header className="dashboard-navbar">
          <div className="dashboard-navbar-left">
            <button className="mobile-menu-button" aria-label="Open menu">
              <IconMenu2 size={20} />
            </button>

            <span className="dashboard-page-title">Dashboard</span>
          </div>

          <div className="dashboard-navbar-right">
            <button className="navbar-icon-button" aria-label="Search">
              <IconSearch size ={ 19} />
            </button>

            <button className="navbar-icon-button" aria-label="Notifications">
              <IconBell size={ 19} />
            </button>

            <Link to="/dashboard/profile" className="user-profile">
              <div className="user-avatar">{avatarLetter}</div>

              <div className="user-info">
                <span className="user-name">{displayName}</span>
                <span className="user-role">Free account</span>
              </div>
            </Link>
          </div>
        </header>


        <main className="dashboard-content">
          <section className="dashboard-welcome">
            <div>
              <p className= "dashboard-eyebrow">Dashboard</p>

              <h1>Welcome back, {displayName}.</h1>

              <p className="dashboard-subtitle">
                Download your favorite YouTube content quickly and easily.
              </p>
            </div>
          </section>

          <DownloadBox />
        </main>
      </div>
    </div>
  );
}
