import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useFullscreenGallery } from "./useFullscreenGallery";

const mockImages = [
  { id: 1, image: "/image1.jpg", alt: "Imagem 1" },
  { id: 2, image: "/image2.jpg", alt: "Imagem 2" },
  { id: 3, image: "/image3.jpg", alt: "Imagem 3" },
];

const mockCarouselApi = {
  scrollTo: vi.fn(),
};

// Helper to setup fullscreen state
const setupFullscreen = async (result, index = 0) => {
  const mockContainer = document.createElement("div");
  mockContainer.requestFullscreen = vi.fn().mockResolvedValue();
  result.current.containerRef.current = mockContainer;

  await act(async () => {
    result.current.open(index);
  });

  // Simulate fullscreen being active
  Object.defineProperty(document, "fullscreenElement", {
    value: mockContainer,
    writable: true,
    configurable: true,
  });

  await act(async () => {
    document.dispatchEvent(new Event("fullscreenchange"));
  });

  return mockContainer;
};

describe("useFullscreenGallery", () => {
  let originalRequestFullscreen;
  let originalExitFullscreen;
  let originalFullscreenElement;

  beforeEach(() => {
    originalRequestFullscreen = Element.prototype.requestFullscreen;
    originalExitFullscreen = document.exitFullscreen;
    originalFullscreenElement = Object.getOwnPropertyDescriptor(document, "fullscreenElement");

    Element.prototype.requestFullscreen = vi.fn().mockResolvedValue();
    document.exitFullscreen = vi.fn().mockResolvedValue();

    // Reset fullscreenElement
    Object.defineProperty(document, "fullscreenElement", {
      value: null,
      writable: true,
      configurable: true,
    });

    vi.clearAllMocks();
  });

  afterEach(() => {
    Element.prototype.requestFullscreen = originalRequestFullscreen;
    document.exitFullscreen = originalExitFullscreen;
    if (originalFullscreenElement) {
      Object.defineProperty(document, "fullscreenElement", originalFullscreenElement);
    }
  });

  it("initializes with default state", () => {
    const { result } = renderHook(() =>
      useFullscreenGallery(mockImages, mockCarouselApi)
    );

    expect(result.current.isFullscreen).toBe(false);
    expect(result.current.currentIndex).toBe(0);
    expect(result.current.scale).toBe(1);
    expect(result.current.position).toEqual({ x: 0, y: 0 });
    expect(result.current.isZoomed).toBe(false);
    expect(result.current.canGoPrev).toBe(false);
    expect(result.current.canGoNext).toBe(true);
  });

  it("opens fullscreen at specified index", async () => {
    const { result } = renderHook(() =>
      useFullscreenGallery(mockImages, mockCarouselApi)
    );

    const mockContainer = document.createElement("div");
    mockContainer.requestFullscreen = vi.fn().mockResolvedValue();
    result.current.containerRef.current = mockContainer;

    await act(async () => {
      result.current.open(1);
    });

    expect(result.current.currentIndex).toBe(1);
    expect(mockContainer.requestFullscreen).toHaveBeenCalled();
  });

  it("closes fullscreen", () => {
    const { result } = renderHook(() =>
      useFullscreenGallery(mockImages, mockCarouselApi)
    );

    act(() => {
      result.current.close();
    });

    expect(document.exitFullscreen).toHaveBeenCalled();
  });

  it("navigates to previous image", async () => {
    const { result } = renderHook(() =>
      useFullscreenGallery(mockImages, mockCarouselApi)
    );

    const mockContainer = document.createElement("div");
    mockContainer.requestFullscreen = vi.fn().mockResolvedValue();
    result.current.containerRef.current = mockContainer;

    await act(async () => {
      result.current.open(1);
    });

    act(() => {
      result.current.goToPrev();
    });

    expect(result.current.currentIndex).toBe(0);
  });

  it("navigates to next image", () => {
    const { result } = renderHook(() =>
      useFullscreenGallery(mockImages, mockCarouselApi)
    );

    act(() => {
      result.current.goToNext();
    });

    expect(result.current.currentIndex).toBe(1);
  });

  it("does not navigate past first image", async () => {
    const { result } = renderHook(() =>
      useFullscreenGallery(mockImages, mockCarouselApi)
    );

    const mockContainer = document.createElement("div");
    mockContainer.requestFullscreen = vi.fn().mockResolvedValue();
    result.current.containerRef.current = mockContainer;

    await act(async () => {
      result.current.open(0);
    });

    act(() => {
      result.current.goToPrev();
    });

    expect(result.current.currentIndex).toBe(0);
  });

  it("does not navigate past last image", async () => {
    const { result } = renderHook(() =>
      useFullscreenGallery(mockImages, mockCarouselApi)
    );

    const mockContainer = document.createElement("div");
    mockContainer.requestFullscreen = vi.fn().mockResolvedValue();
    result.current.containerRef.current = mockContainer;

    await act(async () => {
      result.current.open(2);
    });

    act(() => {
      result.current.goToNext();
    });

    expect(result.current.currentIndex).toBe(2);
  });

  it("returns correct canGoPrev and canGoNext values", async () => {
    const { result } = renderHook(() =>
      useFullscreenGallery(mockImages, mockCarouselApi)
    );

    const mockContainer = document.createElement("div");
    mockContainer.requestFullscreen = vi.fn().mockResolvedValue();
    result.current.containerRef.current = mockContainer;

    expect(result.current.canGoPrev).toBe(false);
    expect(result.current.canGoNext).toBe(true);

    await act(async () => {
      result.current.open(1);
    });

    expect(result.current.canGoPrev).toBe(true);
    expect(result.current.canGoNext).toBe(true);

    await act(async () => {
      result.current.open(2);
    });

    expect(result.current.canGoPrev).toBe(true);
    expect(result.current.canGoNext).toBe(false);
  });

  it("resets scale and position when opening", async () => {
    const { result } = renderHook(() =>
      useFullscreenGallery(mockImages, mockCarouselApi)
    );

    const mockContainer = document.createElement("div");
    mockContainer.requestFullscreen = vi.fn().mockResolvedValue();
    result.current.containerRef.current = mockContainer;

    await act(async () => {
      result.current.open(0);
    });

    expect(result.current.scale).toBe(1);
    expect(result.current.position).toEqual({ x: 0, y: 0 });
  });

  it("cycles through zoom levels on image click", async () => {
    const { result } = renderHook(() =>
      useFullscreenGallery(mockImages, mockCarouselApi)
    );

    await setupFullscreen(result);

    expect(result.current.scale).toBe(1);

    act(() => {
      result.current.handleImageClick();
    });

    expect(result.current.scale).toBe(1.5);

    act(() => {
      result.current.handleImageClick();
    });

    expect(result.current.scale).toBe(2.5);

    act(() => {
      result.current.handleImageClick();
    });

    expect(result.current.scale).toBe(4);

    act(() => {
      result.current.handleImageClick();
    });

    expect(result.current.scale).toBe(1);
  });

  it("handles mouse drag when zoomed", async () => {
    const { result } = renderHook(() =>
      useFullscreenGallery(mockImages, mockCarouselApi)
    );

    await setupFullscreen(result);

    // Zoom in first
    act(() => {
      result.current.handleImageClick();
    });

    expect(result.current.isZoomed).toBe(true);

    // Start drag
    act(() => {
      result.current.handleMouseDown({ clientX: 100, clientY: 100 });
    });

    expect(result.current.isDragging.current).toBe(true);

    // Move
    act(() => {
      result.current.handleMouseMove({ clientX: 150, clientY: 150 });
    });

    expect(result.current.position.x).not.toBe(0);
    expect(result.current.position.y).not.toBe(0);

    // End drag
    act(() => {
      result.current.handleMouseUp();
    });

    expect(result.current.isDragging.current).toBe(false);
  });

  it("does not click zoom if dragged", async () => {
    const { result } = renderHook(() =>
      useFullscreenGallery(mockImages, mockCarouselApi)
    );

    await setupFullscreen(result);

    // Zoom in
    act(() => {
      result.current.handleImageClick();
    });

    const initialScale = result.current.scale;

    // Simulate drag (mouseDown, mouseMove sets hasMoved)
    act(() => {
      result.current.handleMouseDown({ clientX: 100, clientY: 100 });
      result.current.handleMouseMove({ clientX: 200, clientY: 200 });
      result.current.handleMouseUp();
    });

    // Click should not change zoom because hasMoved is true
    act(() => {
      result.current.handleImageClick();
    });

    expect(result.current.scale).toBe(initialScale);
  });

  it("handles touch start for drag when zoomed", async () => {
    const { result } = renderHook(() =>
      useFullscreenGallery(mockImages, mockCarouselApi)
    );

    await setupFullscreen(result);

    // Zoom in first
    act(() => {
      result.current.handleImageClick();
    });

    act(() => {
      result.current.handleTouchStart({
        touches: [{ clientX: 100, clientY: 100 }],
      });
    });

    expect(result.current.isDragging.current).toBe(true);
  });

  it("handles touch move for drag when zoomed", async () => {
    const { result } = renderHook(() =>
      useFullscreenGallery(mockImages, mockCarouselApi)
    );

    await setupFullscreen(result);

    // Zoom in
    act(() => {
      result.current.handleImageClick();
    });

    // Start touch
    act(() => {
      result.current.handleTouchStart({
        touches: [{ clientX: 100, clientY: 100 }],
      });
    });

    // Move touch
    act(() => {
      result.current.handleTouchMove({
        touches: [{ clientX: 150, clientY: 150 }],
      });
    });

    expect(result.current.position.x).not.toBe(0);
  });

  it("handles pinch zoom with two fingers", async () => {
    const { result } = renderHook(() =>
      useFullscreenGallery(mockImages, mockCarouselApi)
    );

    await setupFullscreen(result);

    // Start pinch
    act(() => {
      result.current.handleTouchStart({
        touches: [
          { clientX: 100, clientY: 100 },
          { clientX: 200, clientY: 200 },
        ],
      });
    });

    // Spread fingers (pinch out = zoom in)
    act(() => {
      result.current.handleTouchMove({
        touches: [
          { clientX: 50, clientY: 50 },
          { clientX: 250, clientY: 250 },
        ],
      });
    });

    expect(result.current.scale).toBeGreaterThan(1);
  });

  it("handles swipe to navigate when not zoomed", async () => {
    const { result } = renderHook(() =>
      useFullscreenGallery(mockImages, mockCarouselApi)
    );

    await setupFullscreen(result, 1);

    expect(result.current.currentIndex).toBe(1);

    // Start touch
    act(() => {
      result.current.handleTouchStart({
        touches: [{ clientX: 200, clientY: 100 }],
      });
    });

    // Swipe left (next)
    act(() => {
      result.current.handleTouchEnd({
        changedTouches: [{ clientX: 100 }],
      });
    });

    expect(result.current.currentIndex).toBe(2);
  });

  it("handles swipe right to go previous", async () => {
    const { result } = renderHook(() =>
      useFullscreenGallery(mockImages, mockCarouselApi)
    );

    await setupFullscreen(result, 1);

    // Start touch
    act(() => {
      result.current.handleTouchStart({
        touches: [{ clientX: 100, clientY: 100 }],
      });
    });

    // Swipe right (previous)
    act(() => {
      result.current.handleTouchEnd({
        changedTouches: [{ clientX: 200 }],
      });
    });

    expect(result.current.currentIndex).toBe(0);
  });

  it("handles tap to zoom on touch", async () => {
    const { result } = renderHook(() =>
      useFullscreenGallery(mockImages, mockCarouselApi)
    );

    await setupFullscreen(result);

    // Start touch
    act(() => {
      result.current.handleTouchStart({
        touches: [{ clientX: 100, clientY: 100 }],
      });
    });

    // End touch at same position (tap)
    act(() => {
      result.current.handleTouchEnd({
        changedTouches: [{ clientX: 100 }],
      });
    });

    expect(result.current.scale).toBe(1.5);
  });

  it("syncs carousel when exiting fullscreen", async () => {
    const { result } = renderHook(() =>
      useFullscreenGallery(mockImages, mockCarouselApi)
    );

    await setupFullscreen(result, 2);

    // Exit fullscreen
    Object.defineProperty(document, "fullscreenElement", {
      value: null,
      writable: true,
      configurable: true,
    });

    await act(async () => {
      document.dispatchEvent(new Event("fullscreenchange"));
    });

    expect(mockCarouselApi.scrollTo).toHaveBeenCalledWith(2, true);
    expect(result.current.isFullscreen).toBe(false);
  });

  it("handles keyboard navigation in fullscreen", async () => {
    const { result } = renderHook(() =>
      useFullscreenGallery(mockImages, mockCarouselApi)
    );

    await setupFullscreen(result, 1);

    // Press ArrowRight
    await act(async () => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
    });

    expect(result.current.currentIndex).toBe(2);

    // Press ArrowLeft
    await act(async () => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }));
    });

    expect(result.current.currentIndex).toBe(1);
  });

  it("handles Enter key for zoom cycling in fullscreen", async () => {
    const { result } = renderHook(() =>
      useFullscreenGallery(mockImages, mockCarouselApi)
    );

    await setupFullscreen(result);

    expect(result.current.scale).toBe(1);

    // Press Enter to cycle zoom
    await act(async () => {
      const event = new KeyboardEvent("keydown", { key: "Enter" });
      document.dispatchEvent(event);
    });

    expect(result.current.scale).toBe(1.5);
  });

  it("handles Space key for zoom cycling in fullscreen", async () => {
    const { result } = renderHook(() =>
      useFullscreenGallery(mockImages, mockCarouselApi)
    );

    await setupFullscreen(result);

    expect(result.current.scale).toBe(1);

    // Press Space to cycle zoom
    await act(async () => {
      const event = new KeyboardEvent("keydown", { key: " " });
      document.dispatchEvent(event);
    });

    expect(result.current.scale).toBe(1.5);
  });

  it("handles wheel zoom in fullscreen", async () => {
    const { result } = renderHook(() =>
      useFullscreenGallery(mockImages, mockCarouselApi)
    );

    const mockContainer = document.createElement("div");
    mockContainer.requestFullscreen = vi.fn().mockResolvedValue();
    mockContainer.addEventListener = vi.fn();
    mockContainer.removeEventListener = vi.fn();
    result.current.containerRef.current = mockContainer;

    await act(async () => {
      result.current.open(0);
    });

    // Simulate fullscreen being active
    Object.defineProperty(document, "fullscreenElement", {
      value: mockContainer,
      writable: true,
      configurable: true,
    });

    await act(async () => {
      document.dispatchEvent(new Event("fullscreenchange"));
    });

    // The wheel handler should have been added
    expect(mockContainer.addEventListener).toHaveBeenCalledWith(
      "wheel",
      expect.any(Function),
      { passive: false }
    );
  });

  it("handles wheel zoom up (zoom in)", async () => {
    const { result } = renderHook(() =>
      useFullscreenGallery(mockImages, mockCarouselApi)
    );

    const mockContainer = document.createElement("div");
    mockContainer.requestFullscreen = vi.fn().mockResolvedValue();
    
    let wheelHandler;
    mockContainer.addEventListener = vi.fn((event, handler) => {
      if (event === "wheel") wheelHandler = handler;
    });
    mockContainer.removeEventListener = vi.fn();
    result.current.containerRef.current = mockContainer;

    await act(async () => {
      result.current.open(0);
    });

    Object.defineProperty(document, "fullscreenElement", {
      value: mockContainer,
      writable: true,
      configurable: true,
    });

    await act(async () => {
      document.dispatchEvent(new Event("fullscreenchange"));
    });

    // Simulate wheel scroll up (zoom in)
    await act(async () => {
      wheelHandler({ deltaY: -100, preventDefault: vi.fn() });
    });

    expect(result.current.scale).toBeGreaterThan(1);
  });

  it("handles wheel zoom down (zoom out) and resets position at scale 1", async () => {
    const { result } = renderHook(() =>
      useFullscreenGallery(mockImages, mockCarouselApi)
    );

    const mockContainer = document.createElement("div");
    mockContainer.requestFullscreen = vi.fn().mockResolvedValue();
    
    let wheelHandler;
    mockContainer.addEventListener = vi.fn((event, handler) => {
      if (event === "wheel") wheelHandler = handler;
    });
    mockContainer.removeEventListener = vi.fn();
    result.current.containerRef.current = mockContainer;

    await act(async () => {
      result.current.open(0);
    });

    Object.defineProperty(document, "fullscreenElement", {
      value: mockContainer,
      writable: true,
      configurable: true,
    });

    await act(async () => {
      document.dispatchEvent(new Event("fullscreenchange"));
    });

    // First zoom in
    await act(async () => {
      wheelHandler({ deltaY: -100, preventDefault: vi.fn() });
    });

    expect(result.current.scale).toBeGreaterThan(1);

    // Then zoom out back to 1
    await act(async () => {
      wheelHandler({ deltaY: 100, preventDefault: vi.fn() });
      wheelHandler({ deltaY: 100, preventDefault: vi.fn() });
      wheelHandler({ deltaY: 100, preventDefault: vi.fn() });
      wheelHandler({ deltaY: 100, preventDefault: vi.fn() });
    });

    expect(result.current.scale).toBe(1);
    expect(result.current.position).toEqual({ x: 0, y: 0 });
  });

  it("handles mouse down correctly when zoomed", async () => {
    const { result } = renderHook(() =>
      useFullscreenGallery(mockImages, mockCarouselApi)
    );

    const mockEvent = {
      clientX: 100,
      clientY: 100,
    };

    act(() => {
      result.current.handleMouseDown(mockEvent);
    });

    expect(result.current.isDragging.current).toBe(false);
  });

  it("handles mouse up correctly", () => {
    const { result } = renderHook(() =>
      useFullscreenGallery(mockImages, mockCarouselApi)
    );

    act(() => {
      result.current.handleMouseUp();
    });

    expect(result.current.isDragging.current).toBe(false);
  });

  it("handles image click when not fullscreen", () => {
    const { result } = renderHook(() =>
      useFullscreenGallery(mockImages, mockCarouselApi)
    );

    act(() => {
      result.current.handleImageClick();
    });

    expect(result.current.scale).toBe(1);
  });

  it("handles touch start with single touch", () => {
    const { result } = renderHook(() =>
      useFullscreenGallery(mockImages, mockCarouselApi)
    );

    const mockEvent = {
      touches: [{ clientX: 100, clientY: 100 }],
    };

    act(() => {
      result.current.handleTouchStart(mockEvent);
    });

    expect(result.current.isDragging.current).toBe(false);
  });

  it("handles touch start with two touches for pinch", () => {
    const { result } = renderHook(() =>
      useFullscreenGallery(mockImages, mockCarouselApi)
    );

    const mockEvent = {
      touches: [
        { clientX: 100, clientY: 100 },
        { clientX: 200, clientY: 200 },
      ],
    };

    act(() => {
      result.current.handleTouchStart(mockEvent);
    });

    expect(result.current.scale).toBe(1);
  });

  it("handles touch move when not fullscreen", () => {
    const { result } = renderHook(() =>
      useFullscreenGallery(mockImages, mockCarouselApi)
    );

    const mockEvent = {
      touches: [{ clientX: 150, clientY: 150 }],
    };

    act(() => {
      result.current.handleTouchMove(mockEvent);
    });

    expect(result.current.scale).toBe(1);
  });

  it("handles touch end when not fullscreen", () => {
    const { result } = renderHook(() =>
      useFullscreenGallery(mockImages, mockCarouselApi)
    );

    const mockEvent = {
      changedTouches: [{ clientX: 150 }],
    };

    act(() => {
      result.current.handleTouchEnd(mockEvent);
    });

    expect(result.current.scale).toBe(1);
  });

  it("exposes containerRef", () => {
    const { result } = renderHook(() =>
      useFullscreenGallery(mockImages, mockCarouselApi)
    );

    expect(result.current.containerRef).toBeDefined();
    expect(result.current.containerRef.current).toBe(null);
  });

  it("exposes isDragging ref", () => {
    const { result } = renderHook(() =>
      useFullscreenGallery(mockImages, mockCarouselApi)
    );

    expect(result.current.isDragging).toBeDefined();
    expect(result.current.isDragging.current).toBe(false);
  });

  it("handles mouse move when not dragging", () => {
    const { result } = renderHook(() =>
      useFullscreenGallery(mockImages, mockCarouselApi)
    );

    const mockEvent = {
      clientX: 200,
      clientY: 200,
    };

    act(() => {
      result.current.handleMouseMove(mockEvent);
    });

    expect(result.current.position).toEqual({ x: 0, y: 0 });
  });

  it("supports webkit fullscreen API", async () => {
    const { result } = renderHook(() =>
      useFullscreenGallery(mockImages, mockCarouselApi)
    );

    const mockContainer = document.createElement("div");
    mockContainer.requestFullscreen = undefined;
    mockContainer.webkitRequestFullscreen = vi.fn();
    result.current.containerRef.current = mockContainer;

    await act(async () => {
      result.current.open(0);
    });

    expect(mockContainer.webkitRequestFullscreen).toHaveBeenCalled();
  });

  it("supports webkit exit fullscreen API", () => {
    document.exitFullscreen = undefined;
    document.webkitExitFullscreen = vi.fn();

    const { result } = renderHook(() =>
      useFullscreenGallery(mockImages, mockCarouselApi)
    );

    act(() => {
      result.current.close();
    });

    expect(document.webkitExitFullscreen).toHaveBeenCalled();
  });

  it("resets position when cycling back to 1x zoom", async () => {
    const { result } = renderHook(() =>
      useFullscreenGallery(mockImages, mockCarouselApi)
    );

    await setupFullscreen(result);

    // Cycle through all zoom levels back to 1
    act(() => {
      result.current.handleImageClick(); // 1 -> 1.5
    });

    act(() => {
      result.current.handleImageClick(); // 1.5 -> 2.5
    });

    act(() => {
      result.current.handleImageClick(); // 2.5 -> 4
    });

    act(() => {
      result.current.handleImageClick(); // 4 -> 1
    });

    expect(result.current.scale).toBe(1);
    expect(result.current.position).toEqual({ x: 0, y: 0 });
  });

  it("does not navigate on small swipes", async () => {
    const { result } = renderHook(() =>
      useFullscreenGallery(mockImages, mockCarouselApi)
    );

    await setupFullscreen(result, 1);

    // Start touch
    act(() => {
      result.current.handleTouchStart({
        touches: [{ clientX: 100, clientY: 100 }],
      });
    });

    // Small swipe (less than 50px threshold)
    act(() => {
      result.current.handleTouchEnd({
        changedTouches: [{ clientX: 120 }],
      });
    });

    // Should stay on same image but zoom (tap)
    expect(result.current.currentIndex).toBe(1);
  });

  it("handles touch end when dragging returns early", async () => {
    const { result } = renderHook(() =>
      useFullscreenGallery(mockImages, mockCarouselApi)
    );

    await setupFullscreen(result);

    // Zoom in
    act(() => {
      result.current.handleImageClick();
    });

    // Start drag
    act(() => {
      result.current.handleTouchStart({
        touches: [{ clientX: 100, clientY: 100 }],
      });
    });

    const initialScale = result.current.scale;

    // End while still dragging
    act(() => {
      result.current.handleTouchEnd({
        changedTouches: [{ clientX: 100 }],
      });
    });

    // Should not cycle zoom
    expect(result.current.scale).toBe(initialScale);
  });
});
