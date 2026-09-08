import "./Home.css";

import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "@/components/ui/text-reveal-card";

import DownloadBox from "../components/DownloadBox";


export default function Home() {
  return (
    <div className="home-page">
      <nav className="navbar">
        <div className="navbar-logo">
          <span>ZORO</span> Downloader
        </div>

        <div className="navbar-links">
          <a href="/">Home</a>
          <a href="#features">Features</a>
          <a href="#faq">FAQ</a>
        </div>

        <div className="navbar-actions">
          <a href="/login" className="login-nav">
            Log in
          </a>

          <a href="/signup" className="signup-nav">
            Sign up
          </a>
        </div>
      </nav>

      <main className="home-content">
        <h1>Download Anything From YouTube</h1>

        <div className="tagline-reveal">
          <TextRevealCard
            text="Fast, simple, no nonsense."
            revealText="No ads, No clutter, Just paste it."
          >
            <TextRevealCardTitle>
              Fast, simple, no nonsense.
            </TextRevealCardTitle>

            <TextRevealCardDescription>
              Download your favorite YouTube content with ease.
            </TextRevealCardDescription>
          </TextRevealCard>
        </div>

        <DownloadBox />
      </main>
    </div>
  );
}
