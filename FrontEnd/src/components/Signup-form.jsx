import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconEye,
  IconEyeOff,
} from "@tabler/icons-react";
import { registerUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

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

export default function SignupForm() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const username = `${formData.firstname}${formData.lastname}`.toLowerCase();

    setLoading(true);

    try {
      await registerUser(username, formData.email, formData.password);

      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (err) {
      const message =
        err.response?.data?.detail || "Something went wrong, please try again later.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-card">
      <div className="signup-header">
        <h1>Create your account</h1>

        <p>
          Create an account to save your downloads and keep everything
          organized.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="signup-form">
        <div className="name-row">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              id="firstname"
              placeholder="Zodiac"
              type="text"
              value={formData.firstname}
              onChange={(e) =>
                setFormData({ ...formData, firstname: e.target.value })
              }
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input
              id="lastname"
              placeholder="Corleone"
              type="text"
              value={formData.lastname}
              onChange={(e) =>
                setFormData({ ...formData, lastname: e.target.value })
              }
            />
          </LabelInputContainer>
        </div>

        <LabelInputContainer>
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            placeholder="Zoro@example.com"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            id="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="confirm-password">Confirm password</Label>
          <PasswordInput
            id="confirm-password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({
                ...formData,
                confirmPassword: e.target.value,
              })
            }
          />
        </LabelInputContainer>

        {error && <p className="signup-error">{error}</p>}

        <button className="group/btn signup-button" type="submit" disabled={loading}>
          {loading ? "Creating your account..." : "Create account"}
          <BottomGradient />
        </button>

        <div className="signup-divider">
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
      <p className="login-link">
        Already have an account? <a href="/login">Log in</a>
      </p>
    </div>
  );
}
