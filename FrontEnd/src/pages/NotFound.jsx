import { AsciiArt } from "../components/ui/ascii-art";
import image404 from "../assets/404.jpg";
import "./NotFound.css";

function NotFound() {
  return (
    <div className= "not-found">
      <AsciiArt
        src={image404}
        resolution={80}
        color="#00ff00"
        animationStyle="matrix"
        inverted
        animateOnView={false}
        className="ascii-image"
      />

      <h1 className="error-code">404</h1>

      <p className="error-message">
        Looks like this page went extinct. 🦖
      </p>

      <a href="/" className="home-button">
        Back Home
      </a>
    </div>
  );
}

export default NotFound;