import { useState, useEffect, useRef, useCallback } from "react";

const ZOOM_LEVELS = [1, 1.5, 2.5, 4];

export const useFullscreenGallery = (images, carouselApi) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const hasMoved = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const touchStart = useRef({ x: 0, y: 0 });
  const pinchStart = useRef({ distance: 0, scale: 1 });

  const isZoomed = scale > 1;
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < images.length - 1;

  // Clamp position to keep image visible
  const clampPosition = useCallback((x, y, currentScale) => {
    const maxOffset = ((currentScale - 1) / currentScale) * 50;
    const maxX = (window.innerWidth * maxOffset) / 100;
    const maxY = (window.innerHeight * maxOffset) / 100;
    return {
      x: Math.min(Math.max(x, -maxX), maxX),
      y: Math.min(Math.max(y, -maxY), maxY),
    };
  }, []);

  // Open fullscreen
  const open = useCallback((index) => {
    setCurrentIndex(index);
    setScale(1);
    setPosition({ x: 0, y: 0 });

    const container = containerRef.current;
    if (container) {
      if (container.requestFullscreen) {
        container
          .requestFullscreen()
          .then(() => setIsFullscreen(true))
          .catch(() => {});
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
        setIsFullscreen(true);
      }
    }
  }, []);

  // Close fullscreen
  const close = useCallback(() => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }, []);

  // Navigate with zoom reset
  const goToPrev = useCallback(() => {
    if (canGoPrev) {
      setCurrentIndex((i) => i - 1);
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [canGoPrev]);

  const goToNext = useCallback(() => {
    if (canGoNext) {
      setCurrentIndex((i) => i + 1);
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [canGoNext]);

  // Handle fullscreen change - sync carousel when exiting
  useEffect(() => {
    const handleChange = () => {
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        setIsFullscreen(false);
        setScale(1);
        setPosition({ x: 0, y: 0 });
        carouselApi?.scrollTo(currentIndex, true);
      }
    };
    document.addEventListener("fullscreenchange", handleChange);
    document.addEventListener("webkitfullscreenchange", handleChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleChange);
      document.removeEventListener("webkitfullscreenchange", handleChange);
    };
  }, [carouselApi, currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isFullscreen) return;

    const handleKey = (e) => {
      if (e.key === "ArrowLeft") goToPrev();
      else if (e.key === "ArrowRight") goToNext();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isFullscreen, goToPrev, goToNext]);

  // Cycle to next zoom level
  const cycleZoom = useCallback(() => {
    const currentLevelIndex = ZOOM_LEVELS.findIndex((z) => scale <= z);
    const nextIndex =
      currentLevelIndex === -1 || currentLevelIndex === ZOOM_LEVELS.length - 1
        ? 0
        : currentLevelIndex + 1;
    const newScale = ZOOM_LEVELS[nextIndex];

    setScale(newScale);
    if (newScale === 1) setPosition({ x: 0, y: 0 });
  }, [scale]);

  // Wheel zoom - use native event listener with passive: false to allow preventDefault
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isFullscreen) return;

    const handleWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.3 : 0.3;
      setScale((s) => {
        const newScale = Math.min(Math.max(s + delta, 1), 4);
        if (newScale === 1) setPosition({ x: 0, y: 0 });
        return newScale;
      });
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [isFullscreen]);

  const handleImageClick = useCallback(() => {
    if (!isFullscreen || hasMoved.current) return;
    cycleZoom();
  }, [isFullscreen, cycleZoom]);

  const handleMouseDown = useCallback(
    (e) => {
      if (!isFullscreen) return;
      hasMoved.current = false;
      if (!isZoomed) return;
      isDragging.current = true;
      dragStart.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
    },
    [isFullscreen, isZoomed, position]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging.current) return;
      hasMoved.current = true;
      const newX = e.clientX - dragStart.current.x;
      const newY = e.clientY - dragStart.current.y;
      setPosition(clampPosition(newX, newY, scale));
    },
    [clampPosition, scale]
  );

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  // Touch handlers
  const handleTouchStart = useCallback(
    (e) => {
      if (!isFullscreen) return;
      if (e.touches.length === 2) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        pinchStart.current = { distance: dist, scale };
      } else if (e.touches.length === 1) {
        touchStart.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
        hasMoved.current = false;
        if (isZoomed) {
          isDragging.current = true;
          dragStart.current = {
            x: e.touches[0].clientX - position.x,
            y: e.touches[0].clientY - position.y,
          };
        }
      }
    },
    [isFullscreen, scale, isZoomed, position]
  );

  const handleTouchMove = useCallback(
    (e) => {
      if (!isFullscreen) return;
      if (e.touches.length === 2) {
        hasMoved.current = true;
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const newScale = Math.min(
          Math.max(
            pinchStart.current.scale * (dist / pinchStart.current.distance),
            1
          ),
          4
        );
        setScale(newScale);
        if (newScale === 1) setPosition({ x: 0, y: 0 });
      } else if (isDragging.current && isZoomed) {
        hasMoved.current = true;
        const newX = e.touches[0].clientX - dragStart.current.x;
        const newY = e.touches[0].clientY - dragStart.current.y;
        setPosition(clampPosition(newX, newY, scale));
      }
    },
    [isFullscreen, isZoomed, clampPosition, scale]
  );

  const handleTouchEnd = useCallback(
    (e) => {
      if (!isFullscreen) return;

      if (isDragging.current) {
        isDragging.current = false;
        return;
      }

      // Swipe to navigate
      if (!isZoomed && e.changedTouches.length === 1) {
        const diff = touchStart.current.x - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
          hasMoved.current = true;
          if (diff > 0) goToNext();
          else goToPrev();
          return;
        }
      }

      // Tap to zoom
      if (!hasMoved.current && e.changedTouches.length === 1) {
        cycleZoom();
      }
    },
    [isFullscreen, isZoomed, goToNext, goToPrev, cycleZoom]
  );

  return {
    // State
    isFullscreen,
    currentIndex,
    scale,
    position,
    isZoomed,
    canGoPrev,
    canGoNext,
    containerRef,
    isDragging,

    // Actions
    open,
    close,
    goToPrev,
    goToNext,

    // Handlers
    handleImageClick,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};
