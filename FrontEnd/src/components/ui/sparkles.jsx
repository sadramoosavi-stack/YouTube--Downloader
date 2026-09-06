import { useEffect } from "react";
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export function SparklesCore({
  id = "signup-sparkles",
  className = "",
  particleColor = "#ffffff",
  particleDensity = 80,
}) {
  useEffect(() => {
    let container;

    async function init() {
      await loadSlim(tsParticles);

      container = await tsParticles.load({
        id,
        options: {
          fullScreen: {
            enable: false,
          },

          background: {
            color: "transparent",
          },

          particles: {
            number: {
              value: particleDensity,
              density: {
                enable: true,
              },
            },

            color: {
              value: particleColor,
            },

            opacity: {
              value: {
                min: 0.2,
                max: 0.8,
              },
            },

            size: {
              value: {
                min: 0.6,
                max: 1.5,
              },
            },

            move: {
              enable: true,
              speed: 0.3,
              direction: "none",
              random: true,
              outModes: {
                default: "out",
              },
            },

            shape: {
              type: "circle",
            },
          },

          detectRetina: true,
        },
      });
    }

    init();

    return () => {
      container?.destroy();
    };
  }, [id, particleColor, particleDensity]);

  return (
    <div
      id={id}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
      }}
    />
  );
}