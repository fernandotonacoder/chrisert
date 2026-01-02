import { useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const Lightbox = ({ images, currentIndex, onClose, onNavigate }) => {
  const touchStartX = useRef(null);

  const navigate = useCallback(
    (direction) => {
      if (direction === "prev") {
        onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1);
      } else {
        onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0);
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
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-in fade-in duration-200"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClose();
      }}
      role="button"
      tabIndex={0}
      aria-label="Fechar lightbox"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
        aria-label="Fechar"
      >
        <X className="size-8" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate("prev");
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 p-2"
        aria-label="Foto anterior"
      >
        <ChevronLeft className="size-10" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate("next");
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 p-2"
        aria-label="Próxima foto"
      >
        <ChevronRight className="size-10" />
      </button>

      <figure
        className="aspect-3/4 max-h-[90vh] max-w-[90vw] overflow-hidden rounded-lg animate-in zoom-in-95 duration-200 block m-0"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex].image}
          alt={
            images[currentIndex].alt ||
            `Projeto ${currentIndex + 1} de ${images.length}`
          }
          className="w-full h-full object-cover pointer-events-none"
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
