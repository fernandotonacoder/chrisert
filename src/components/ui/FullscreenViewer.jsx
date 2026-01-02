import PropTypes from "prop-types";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const FullscreenViewer = ({
  images,
  currentIndex,
  scale,
  position,
  isFullscreen,
  isZoomed,
  canGoPrev,
  canGoNext,
  isDragging,
  containerRef,
  onClose,
  onPrev,
  onNext,
  onWheel,
  onImageClick,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}) => {
  return (
    <div
      ref={containerRef}
      aria-label="Visualizador de imagens em ecrã inteiro"
      className={`${
        isFullscreen ? "flex" : "hidden"
      } items-center justify-center bg-black w-full h-full`}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-20 p-2 text-white/70 hover:text-white transition-colors"
        aria-label="Fechar"
      >
        <X className="size-8" />
      </button>

      {/* Previous button */}
      <button
        type="button"
        onClick={onPrev}
        className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 transition-colors ${
          canGoPrev
            ? "text-white/70 hover:text-white"
            : "text-white/20 cursor-not-allowed"
        }`}
        aria-label="Foto anterior"
      >
        <ChevronLeft className="size-10" />
      </button>

      {/* Next button */}
      <button
        type="button"
        onClick={onNext}
        className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 transition-colors ${
          canGoNext
            ? "text-white/70 hover:text-white"
            : "text-white/20 cursor-not-allowed"
        }`}
        aria-label="Próxima foto"
      >
        <ChevronRight className="size-10" />
      </button>

      {/* Image */}
      {isFullscreen && (
        <img
          src={images[currentIndex].image}
          alt={images[currentIndex].alt}
          className={`max-h-full max-w-full object-contain select-none ${
            isZoomed ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
          }`}
          style={{
            transform: `scale(${scale}) translate(${position.x / scale}px, ${
              position.y / scale
            }px)`,
            transition: isDragging.current
              ? "none"
              : "transform 0.15s ease-out",
          }}
          draggable={false}
        />
      )}

      {/* Gesture capture layer - handles all mouse/touch interactions */}
      <button
        type="button"
        aria-label={isZoomed ? "Arraste para mover a imagem" : "Clique para ampliar"}
        className={`absolute inset-0 z-10 bg-transparent border-none ${
          isZoomed ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
        }`}
        onClick={onImageClick}
        onWheel={onWheel}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      />

      {/* Image counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

FullscreenViewer.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      alt: PropTypes.string,
    })
  ).isRequired,
  currentIndex: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  isFullscreen: PropTypes.bool.isRequired,
  isZoomed: PropTypes.bool.isRequired,
  canGoPrev: PropTypes.bool.isRequired,
  canGoNext: PropTypes.bool.isRequired,
  isDragging: PropTypes.shape({ current: PropTypes.bool }).isRequired,
  containerRef: PropTypes.shape({ current: PropTypes.any }).isRequired,
  onClose: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onWheel: PropTypes.func.isRequired,
  onImageClick: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onMouseMove: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
  onTouchStart: PropTypes.func.isRequired,
  onTouchMove: PropTypes.func.isRequired,
  onTouchEnd: PropTypes.func.isRequired,
};

export default FullscreenViewer;
