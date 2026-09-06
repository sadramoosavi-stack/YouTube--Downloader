import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


import Sidebar from "./Sidebar";


import { getProfile } from "../services/userService";
import { useAuth } from "../context/AuthContext";
import { formatDate } from "../utils/youtube";


import "./Profile.css";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    getProfile()
      .then((data) => setProfile(data))
      .catch(() => setError("Could not load your profile."))
      .finally(() => setLoading(false));
  }, []);

  const avatarLetter = profile?.username?.charAt(0).toUpperCase() || "?";

  return (
    <>
      <Sidebar />
      <main className="profile-page">
        <section className="profile-container">
          <h1>Profile</h1>

          {loading && <p>Loading...</p>}

          {!loading && error && <p className="profile-error">{error}</p>}

          {!loading && profile && (
            <div className="profile-card">
              <div className="profile-avatar">{avatarLetter}</div>

              <div className="profile-info">
                <div className="profile-field">
                  <span className="profile-label">Username</span>
                  <span className="profile-value">{profile.username}</span>
                </div>

                <div className="profile-field">
                  <span className="profile-label">Email</span>
                  <span className="profile-value">{profile.email}</span>
                </div>

                <div className="profile-field">
                  <span className="profile-label">Member since</span>
                  <span className="profile-value">
                    {formatDate(profile.created_at)}
                  </span>
                </div>
              </div>

              <button className="profile-logout-button" onClick={handleLogout}>
                Log out
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default Profile;
