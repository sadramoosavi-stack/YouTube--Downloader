import React, {useState} from "react";

export function TextRevealCard({
    text,
    revealText,
    children,

}) {
    const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="text-reveal-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="text-reveal-card-text">
        {isHovered ? revealText : text}
      </div>

      {children}
    </div>
  );
}

export function TextRevealCardTitle({ children }) {
  return (
    <div className="text-reveal-card-title">
      {children}
    </div>
  );
}

export function TextRevealCardDescription({ children }) {
  return (
    <div className="text-reveal-card-description">
      {children}
    </div>
  );
}