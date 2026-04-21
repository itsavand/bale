import { useState, useEffect, useRef } from "react";
import squirrelImg from "@assets/dbe1de91a004e543776d16eea62eea68_1776791715145.jpg";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
}

function Confetti({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#e91e8c", "#f48fb1", "#f8bbd9", "#ad1457", "#fff", "#fce4ec"];
    particlesRef.current = Array.from({ length: 120 }, (_, i) => ({
      id: i,
      x: Math.random() * canvas.width,
      y: -20,
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 10 + 5,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 6,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.5);
        ctx.restore();
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.vy += 0.05;
      });
      particlesRef.current = particlesRef.current.filter((p) => p.y < canvas.height + 30);
      if (particlesRef.current.length > 0) {
        animRef.current = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}

function CelebrationPopup({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        backdropFilter: "blur(6px)",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: "24px",
          padding: "48px 40px",
          textAlign: "center",
          boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
          maxWidth: "360px",
          width: "90%",
          animation: "popIn 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <div style={{ fontSize: "64px", marginBottom: "8px", lineHeight: 1 }}>
          💍
        </div>
        <div style={{ fontSize: "32px", marginBottom: "16px" }}>
          🎉 Yaaaay! 🎉
        </div>
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "#333",
            marginBottom: "32px",
            lineHeight: 1.5,
          }}
        >
          Ne as zanm bas toya znxe o dene o pise
        </h2>
        <button
          onClick={onClose}
          style={{
            padding: "12px 36px",
            fontSize: "16px",
            fontWeight: "bold",
            background: "#e91e8c",
            color: "white",
            border: "none",
            borderRadius: "50px",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(233, 30, 140, 0.35)",
          }}
        >
          Mwah 💋
        </button>
      </div>

      <style>{`
        @keyframes popIn {
          from { transform: scale(0.5); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function App() {
  const [naxerClicks, setNaxerClicks] = useState(0);
  const [naxerGone, setNaxerGone] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);

  const MAX_CLICKS = 6;

  const handleNaxer = () => {
    const next = naxerClicks + 1;
    if (next >= MAX_CLICKS) {
      setNaxerGone(true);
    } else {
      setNaxerClicks(next);
    }
  };

  const handleBale = () => {
    setShowPopup(true);
    setConfettiActive(true);
    setTimeout(() => setConfettiActive(false), 4000);
  };

  const baleScale = Math.pow(2, naxerClicks);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fdf6f9",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "20px",
        overflow: "hidden",
      }}
    >
      <Confetti active={confettiActive} />

      {showPopup && <CelebrationPopup onClose={() => setShowPopup(false)} />}

      <div
        style={{
          background: "#fff",
          borderRadius: "24px",
          padding: "48px 40px",
          textAlign: "center",
          boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
          maxWidth: "440px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <img
            src={squirrelImg}
            alt="cute squirrels in love"
            style={{
              width: "220px",
              height: "160px",
              objectFit: "cover",
              borderRadius: "16px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
            }}
          />
        </div>

        <h1
          style={{
            fontSize: "clamp(26px, 6vw, 44px)",
            color: "#222",
            fontWeight: "bold",
            marginBottom: "40px",
            letterSpacing: "0.5px",
          }}
        >
          Tu Hash Mn Dkay
        </h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <button
            onClick={handleBale}
            style={{
              padding: "14px 36px",
              fontSize: "18px",
              fontWeight: "bold",
              background: "#e91e8c",
              color: "white",
              border: "none",
              borderRadius: "50px",
              cursor: "pointer",
              transform: `scale(${Math.min(baleScale, 4)})`,
              transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
              boxShadow: "0 4px 18px rgba(233, 30, 140, 0.35)",
              whiteSpace: "nowrap",
            }}
          >
            Bale Bale! 💘
          </button>

          {!naxerGone && (
            <button
              onClick={handleNaxer}
              style={{
                padding: "10px 24px",
                fontSize: "14px",
                fontWeight: "600",
                background: "transparent",
                color: "#aaa",
                border: "1.5px solid #ddd",
                borderRadius: "50px",
                cursor: "pointer",
              }}
            >
              Naxer 🙅
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
