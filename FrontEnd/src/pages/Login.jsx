import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import {
  IconBrandGithub,
  IconBrandGoogle,
  IconEye,
  IconEyeOff,
  IconAlertCircle,
} from "@tabler/icons-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "./Login.css";

function LabelInputContainer({ children, className }) {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
}

function PasswordInput({ id, placeholder, value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        id={id}
        placeholder={placeholder}
        type={showPassword ? "text" : "password"}
        className="pr-10"
        value={value}
        onChange={onChange}
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 transition hover:text-neutral-200"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <IconEyeOff className="h-4 w-4" />
        ) : (
          <IconEye className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}

function BottomGradient() {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />

      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      const message =
        err.response?.data?.detail || "Invalid email or password.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-glow login-glow-one" />
      <div className="login-glow login-glow-two" />

      <div className="login-card">
        <div className="login-header">
          <h1>Welcome back</h1>

          <p>Log in to continue to your account.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <LabelInputContainer>
            <Label htmlFor="email">Email address</Label>

            <Input
              id="email"
              type="email"
              placeholder="Zoro@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="password">Password</Label>

            <PasswordInput
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </LabelInputContainer>

          {error && (
            <div className="login-error">
              <IconAlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          <div className="forgot-password">
            <a href="#">Forgot password?</a>
          </div>

          <button
            className="group/btn login-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "loading" : "Log in"}
            <BottomGradient />
          </button>

          <div className="login-divider">
            <span>or</span>
          </div>

          <div className="social-buttons">
            <button className="group/btn social-button" type="button">
              <IconBrandGoogle className="h-4 w-4" />
              <span>Continue with Google</span>
              <BottomGradient />
            </button>

            <button className="group/btn social-button" type="button">
              <IconBrandGithub className="h-4 w-4" />
              <span>Continue with GitHub</span>
              <BottomGradient />
            </button>
          </div>
        </form>

        <p className="register-link">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
}
