import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  IconChevronLeft,
  IconChevronRight,
  IconLayoutDashboard,
  IconDownload,
  IconHeart,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";

import "./Sidebar.css";

function Sidebar() {
    const navigate = useNavigate();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <aside
      className={`dashboard-sidebar ${
        sidebarCollapsed ? "collapsed" : ""
      }`}
    >
      <div className="sidebar-top">
        <div className="sidebar-logo">
          <span>YT</span>

          {!sidebarCollapsed && (
            <strong>Downloader</strong>
          )}
        </div>

        <button
          className="sidebar-toggle"
          onClick={() =>
            setSidebarCollapsed(!sidebarCollapsed)
          }
          aria-label="Toggle sidebar"
        >
          {sidebarCollapsed ? (
            <IconChevronRight size={18} />
          ) : (
            <IconChevronLeft size={18} />
          )}
        </button>
      </div>

      <nav className="sidebar-nav">
        <Link
          to="/dashboard"
          className="sidebar-link"
          title="Dashboard"
        >
          <IconLayoutDashboard size={19} />

          {!sidebarCollapsed && (
            <span>Dashboard</span>
          )}
        </Link>

        <Link
          to="/dashboard/downloads"
          className="sidebar-link"
          title="Downloads"
        >
          <IconDownload size={19} />

          {!sidebarCollapsed && (
            <span>Downloads</span>
          )}
        </Link>

        <Link
          to="/dashboard/favourites"
          className="sidebar-link"
          title="Favorites"
        >
          <IconHeart size={19} />

          {!sidebarCollapsed && (
            <span>Favourites</span>
          )}
        </Link>
      </nav>

      <div className="sidebar-bottom">
        <Link
          to="/settings"
          className="sidebar-link"
          title="Settings"
        >
          <IconSettings size={19} />

          {!sidebarCollapsed && (
            <span>Settings</span>
          )}
        </Link>

        <button
          className="sidebar-link logout-link"
          title="Log out"
          onClick={() => navigate("/")}
        >
          <IconLogout size={19} />

          {!sidebarCollapsed && (
            <span>Log out</span>
          )}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;