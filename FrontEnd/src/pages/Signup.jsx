import SignupForm from "../components/Signup-form";

import { SparklesCore } from "@/components/ui/sparkles";

import "./Signup.css";


export default function Signup() {
  return (
    <main className="signup-page">
      <div className= "signup-sparkles">
        <SparklesCore
      id = "signup-sparkles"
      background = "transparent"
      minSize = {0.6}
      maxSize = {1.4}
      particleDensity = {150}
      className = "w=full h-full"
      particleColor = "#FFFFFF" />
    </div>

      <div className="signup-glow signup-glow-one" />
      <div className="signup-glow signup-glow-two" />
      
    
      <SignupForm />
    </main>
  );
}