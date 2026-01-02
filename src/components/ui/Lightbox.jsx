import { useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const Lightbox = ({ images, currentIndex, onClose, onNavigate }) => {
  const touchStartX = useRef(null);
  const containerRef = useRef(null);

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < images.length - 1;

  useEffect(() => {
    const enterFullscreen = async () => {
      try {
        if (document.fullscreenElement === null) {
          await containerRef.current?.requestFullscreen();
        }
      } catch {
        // Fullscreen not supported or denied - continue without it
      }
    };

    enterFullscreen();

    return () => {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    };
  }, []);

  const navigate = useCallback(
    (direction) => {
      if (direction === "prev" && currentIndex > 0) {
        onNavigate(currentIndex - 1);
      } else if (direction === "next" && currentIndex < images.length - 1) {
        onNavigate(currentIndex + 1);
      }
    },
    [currentIndex, images.length, onNavigate]
  );

  // Swipe handlers for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;

    if (Math.abs(diff) > 50) {
      navigate(diff > 0 ? "next" : "prev");
    }
    touchStartX.current = null;
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") navigate("prev");
      else if (e.key === "ArrowRight") navigate("next");
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [navigate, onClose]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black animate-in fade-in duration-200"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Backdrop - semantic button element */}
      <button
        type="button"
        className="absolute inset-0 bg-black cursor-default"
        onClick={onClose}
        aria-label="Fechar lightbox"
      />

      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
        aria-label="Fechar"
      >
        <X className="size-8" />
      </button>

      {/* Previous button */}
      <button
        type="button"
        onClick={() => navigate("prev")}
        disabled={!canGoPrev}
        className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors z-10 p-2 ${
          canGoPrev
            ? "text-white/70 hover:text-white cursor-pointer"
            : "text-white/20 cursor-not-allowed"
        }`}
        aria-label="Foto anterior"
      >
        <ChevronLeft className="size-10" />
      </button>

      {/* Next button */}
      <button
        type="button"
        onClick={() => navigate("next")}
        disabled={!canGoNext}
        className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors z-10 p-2 ${
          canGoNext
            ? "text-white/70 hover:text-white cursor-pointer"
            : "text-white/20 cursor-not-allowed"
        }`}
        aria-label="Próxima foto"
      >
        <ChevronRight className="size-10" />
      </button>

      {/* Image container */}
      <figure className="relative z-10 max-h-[95vh] max-w-[95vw] overflow-hidden rounded-lg animate-in zoom-in-95 duration-200 m-0">
        <img
          src={images[currentIndex].image}
          alt={
            images[currentIndex].alt ||
            `Projeto ${currentIndex + 1} de ${images.length}`
          }
          className="max-h-[95vh] max-w-[95vw] object-contain"
        />
      </figure>
    </div>
  );
};

Lightbox.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      alt: PropTypes.string,
    })
  ).isRequired,
  currentIndex: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default Lightbox;
