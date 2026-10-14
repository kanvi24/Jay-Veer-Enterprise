import { useEffect } from "react";

// Web Audio API tactile click sound synthesizer
let audioCtx = null;

function playClickSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    if (!audioCtx) {
      audioCtx = new AudioCtx();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    // Crisp, subtle tactile click / tap tone (850Hz -> 320Hz in ~25ms)
    osc.type = "sine";
    osc.frequency.setValueAtTime(850, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.025);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.032);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.032);
  } catch {
    // Graceful fallback if audio is not permitted
  }
}

// Spawns small, smooth animated dots popup burst around click / touch position
function createDotsPopup(x, y) {
  const container = document.createElement("div");
  container.className = "click-dots-burst";
  container.style.left = `${x}px`;
  container.style.top = `${y}px`;

  // Central subtle ripple ring
  const ripple = document.createElement("div");
  ripple.className = "click-ripple";
  container.appendChild(ripple);

  // 7 delicate radiating dots in brand colors
  const colors = [
    "#FE691E", // Brand orange
    "#0c2340", // Brand navy
    "#FE691E", // Brand orange
    "#ffa726", // Warm amber
    "#0284c7", // Sky blue
    "#FE691E", // Brand orange
    "#ffffff"  // Crisp white
  ];
  const count = colors.length;

  for (let i = 0; i < count; i++) {
    const dot = document.createElement("div");
    dot.className = "click-dot";

    const angle = (i * (360 / count) + (Math.random() * 12 - 6)) * (Math.PI / 180);
    const distance = 18 + Math.random() * 12; // 18px - 30px spread
    const dx = Math.round(Math.cos(angle) * distance);
    const dy = Math.round(Math.sin(angle) * distance);
    const size = 4 + (i % 3); // 4px - 6px

    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.backgroundColor = colors[i];
    dot.style.setProperty("--dx", `${dx}px`);
    dot.style.setProperty("--dy", `${dy}px`);
    dot.style.boxShadow = `0 1px 4px ${colors[i]}40`;

    container.appendChild(dot);
  }

  document.body.appendChild(container);

  setTimeout(() => {
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
  }, 480);
}

export default function ClickEffects() {
  useEffect(() => {
    let lastSoundTime = 0;
    let lastDotsTime = 0;

    const handlePointerDown = (e) => {
      // Only process primary click (left button) or touch
      if (e.button !== undefined && e.button !== 0) return;

      const x = e.clientX;
      const y = e.clientY;
      const now = Date.now();

      // 1. Animated Dots Popup Effect around cursor / touch point (debounced 60ms)
      if (x !== undefined && y !== undefined && now - lastDotsTime > 60) {
        lastDotsTime = now;
        createDotsPopup(x, y);
      }

      // 2. Click Sound Effect on interactive elements (debounced 90ms to avoid double trigger)
      if (now - lastSoundTime > 90) {
        const interactive = e.target.closest(
          'button, a, input, select, textarea, [role="button"], [tabindex], .btn, .nav-link, .app-card-b2b, .why-card, .product-card, .contact-phone-row, .contact-action-card, .contact-info-panel-item, .footer-link, label, summary, .contact-directions-btn, .footer-scroll-top-btn, .floating-btn'
        );
        if (interactive) {
          lastSoundTime = now;
          playClickSound();
        }
      }
    };

    document.addEventListener("pointerdown", handlePointerDown, { passive: true });

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return null;
}
