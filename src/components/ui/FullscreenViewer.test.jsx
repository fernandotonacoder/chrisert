import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FullscreenViewer from "./FullscreenViewer";

const mockImages = [
  { id: 1, image: "/image1.jpg", alt: "Imagem 1" },
  { id: 2, image: "/image2.jpg", alt: "Imagem 2" },
  { id: 3, image: "/image3.jpg", alt: "Imagem 3" },
];

const defaultProps = {
  images: mockImages,
  currentIndex: 0,
  scale: 1,
  position: { x: 0, y: 0 },
  isFullscreen: true,
  isZoomed: false,
  canGoPrev: false,
  canGoNext: true,
  isDragging: { current: false },
  containerRef: { current: null },
  onClose: vi.fn(),
  onPrev: vi.fn(),
  onNext: vi.fn(),
  onWheel: vi.fn(),
  onImageClick: vi.fn(),
  onMouseDown: vi.fn(),
  onMouseMove: vi.fn(),
  onMouseUp: vi.fn(),
  onTouchStart: vi.fn(),
  onTouchMove: vi.fn(),
  onTouchEnd: vi.fn(),
};

describe("FullscreenViewer", () => {
  it("renders when isFullscreen is true", () => {
    render(<FullscreenViewer {...defaultProps} />);

    expect(
      screen.getByAltText("Imagem 1")
    ).toBeInTheDocument();
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  it("is hidden when isFullscreen is false", () => {
    render(<FullscreenViewer {...defaultProps} isFullscreen={false} />);

    expect(
      screen.getByLabelText("Visualizador de imagens em ecrã inteiro")
    ).toHaveClass("hidden");
  });

  it("renders navigation buttons", () => {
    render(<FullscreenViewer {...defaultProps} />);

    expect(screen.getByLabelText("Foto anterior")).toBeInTheDocument();
    expect(screen.getByLabelText("Próxima foto")).toBeInTheDocument();
    expect(screen.getByLabelText("Fechar")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = vi.fn();
    render(<FullscreenViewer {...defaultProps} onClose={onClose} />);

    fireEvent.click(screen.getByLabelText("Fechar"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onPrev when previous button is clicked", () => {
    const onPrev = vi.fn();
    render(<FullscreenViewer {...defaultProps} canGoPrev={true} onPrev={onPrev} />);

    fireEvent.click(screen.getByLabelText("Foto anterior"));
    expect(onPrev).toHaveBeenCalledTimes(1);
  });

  it("calls onNext when next button is clicked", () => {
    const onNext = vi.fn();
    render(<FullscreenViewer {...defaultProps} onNext={onNext} />);

    fireEvent.click(screen.getByLabelText("Próxima foto"));
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it("shows correct image based on currentIndex", () => {
    render(<FullscreenViewer {...defaultProps} currentIndex={1} />);

    expect(screen.getByAltText("Imagem 2")).toBeInTheDocument();
    expect(screen.getByText("2 / 3")).toBeInTheDocument();
  });

  it("applies zoom-in cursor when not zoomed", () => {
    render(<FullscreenViewer {...defaultProps} isZoomed={false} />);

    const gestureButton = screen.getByLabelText("Clique para ampliar");
    expect(gestureButton).toHaveClass("cursor-zoom-in");
  });

  it("applies grab cursor when zoomed", () => {
    render(<FullscreenViewer {...defaultProps} isZoomed={true} />);

    const gestureButton = screen.getByLabelText("Arraste para mover a imagem");
    expect(gestureButton).toHaveClass("cursor-grab");
  });

  it("calls onImageClick when gesture layer is clicked", () => {
    const onImageClick = vi.fn();
    render(<FullscreenViewer {...defaultProps} onImageClick={onImageClick} />);

    fireEvent.click(screen.getByLabelText("Clique para ampliar"));
    expect(onImageClick).toHaveBeenCalledTimes(1);
  });

  it("calls onWheel when scrolling on gesture layer", () => {
    const onWheel = vi.fn();
    render(<FullscreenViewer {...defaultProps} onWheel={onWheel} />);

    fireEvent.wheel(screen.getByLabelText("Clique para ampliar"));
    expect(onWheel).toHaveBeenCalledTimes(1);
  });

  it("calls mouse handlers on gesture layer", () => {
    const onMouseDown = vi.fn();
    const onMouseMove = vi.fn();
    const onMouseUp = vi.fn();
    render(
      <FullscreenViewer
        {...defaultProps}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      />
    );

    const gestureLayer = screen.getByLabelText("Clique para ampliar");
    fireEvent.mouseDown(gestureLayer);
    fireEvent.mouseMove(gestureLayer);
    fireEvent.mouseUp(gestureLayer);

    expect(onMouseDown).toHaveBeenCalledTimes(1);
    expect(onMouseMove).toHaveBeenCalledTimes(1);
    expect(onMouseUp).toHaveBeenCalledTimes(1);
  });

  it("calls onMouseUp on mouse leave", () => {
    const onMouseUp = vi.fn();
    render(<FullscreenViewer {...defaultProps} onMouseUp={onMouseUp} />);

    const gestureLayer = screen.getByLabelText("Clique para ampliar");
    fireEvent.mouseLeave(gestureLayer);

    expect(onMouseUp).toHaveBeenCalledTimes(1);
  });

  it("calls touch handlers on gesture layer", () => {
    const onTouchStart = vi.fn();
    const onTouchMove = vi.fn();
    const onTouchEnd = vi.fn();
    render(
      <FullscreenViewer
        {...defaultProps}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      />
    );

    const gestureLayer = screen.getByLabelText("Clique para ampliar");
    fireEvent.touchStart(gestureLayer);
    fireEvent.touchMove(gestureLayer);
    fireEvent.touchEnd(gestureLayer);

    expect(onTouchStart).toHaveBeenCalledTimes(1);
    expect(onTouchMove).toHaveBeenCalledTimes(1);
    expect(onTouchEnd).toHaveBeenCalledTimes(1);
  });

  it("applies transform style based on scale and position", () => {
    render(
      <FullscreenViewer
        {...defaultProps}
        scale={2}
        position={{ x: 100, y: 50 }}
      />
    );

    const image = screen.getByAltText("Imagem 1");
    expect(image.style.transform).toBe("scale(2) translate(50px, 25px)");
  });

  it("disables transition when dragging", () => {
    render(
      <FullscreenViewer
        {...defaultProps}
        isDragging={{ current: true }}
      />
    );

    const image = screen.getByAltText("Imagem 1");
    expect(image.style.transition).toBe("none");
  });

  it("enables smooth transition when not dragging", () => {
    render(
      <FullscreenViewer
        {...defaultProps}
        isDragging={{ current: false }}
      />
    );

    const image = screen.getByAltText("Imagem 1");
    expect(image.style.transition).toBe("transform 0.15s ease-out");
  });

  it("shows disabled style for prev button when canGoPrev is false", () => {
    render(<FullscreenViewer {...defaultProps} canGoPrev={false} />);

    const prevButton = screen.getByLabelText("Foto anterior");
    expect(prevButton).toHaveClass("cursor-not-allowed");
    expect(prevButton).toHaveClass("text-white/20");
  });

  it("shows enabled style for prev button when canGoPrev is true", () => {
    render(<FullscreenViewer {...defaultProps} canGoPrev={true} />);

    const prevButton = screen.getByLabelText("Foto anterior");
    expect(prevButton).not.toHaveClass("cursor-not-allowed");
    expect(prevButton).toHaveClass("text-white/70");
  });

  it("shows disabled style for next button when canGoNext is false", () => {
    render(<FullscreenViewer {...defaultProps} canGoNext={false} />);

    const nextButton = screen.getByLabelText("Próxima foto");
    expect(nextButton).toHaveClass("cursor-not-allowed");
    expect(nextButton).toHaveClass("text-white/20");
  });
});
