import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./layouts/ProtectedRoute";


import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Downloads from "./pages/Downloads";
import Favourites from "./pages/Favourites";
import Profile from "./pages/Profile"

console.log("API URL:", import.meta.env.VITE_API_BASE_URL);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /> </ProtectedRoute>} />
          <Route path="/dashboard/downloads" element={<ProtectedRoute> <Downloads /> </ProtectedRoute>} />
          <Route path="/dashboard/favourites" element={<ProtectedRoute><Favourites /> </ProtectedRoute>} />
          <Route path="/dashboard/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  </AuthProvider>
  );
}

export default App;