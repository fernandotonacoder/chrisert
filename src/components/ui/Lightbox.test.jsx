import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Lightbox from "./Lightbox";

const mockImages = [
  { image: "/image1.jpg", alt: "Image 1" },
  { image: "/image2.jpg", alt: "Image 2" },
  { image: "/image3.jpg", alt: "Image 3" },
];

describe("Lightbox", () => {
  let onCloseMock;
  let onNavigateMock;

  beforeEach(() => {
    onCloseMock = vi.fn();
    onNavigateMock = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const renderLightbox = (currentIndex = 0) => {
    return render(
      <Lightbox
        images={mockImages}
        currentIndex={currentIndex}
        onClose={onCloseMock}
        onNavigate={onNavigateMock}
      />
    );
  };

  it("renders the current image", () => {
    renderLightbox(0);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/image1.jpg");
    expect(img).toHaveAttribute("alt", "Image 1");
  });

  it("renders fallback alt text when alt is not provided", () => {
    const imagesWithoutAlt = [{ image: "/image1.jpg" }];
    render(
      <Lightbox
        images={imagesWithoutAlt}
        currentIndex={0}
        onClose={onCloseMock}
        onNavigate={onNavigateMock}
      />
    );
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("alt", "Projeto 1 de 1");
  });

  it("renders navigation buttons", () => {
    renderLightbox();
    expect(screen.getByLabelText("Foto anterior")).toBeInTheDocument();
    expect(screen.getByLabelText("Próxima foto")).toBeInTheDocument();
    expect(screen.getByLabelText("Fechar")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    renderLightbox();
    fireEvent.click(screen.getByLabelText("Fechar"));
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("calls onClose when backdrop is clicked", () => {
    renderLightbox();
    fireEvent.click(screen.getByLabelText("Fechar lightbox"));
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("navigates to previous image when prev button is clicked", () => {
    renderLightbox(1);
    fireEvent.click(screen.getByLabelText("Foto anterior"));
    expect(onNavigateMock).toHaveBeenCalledWith(0);
  });

  it("navigates to next image when next button is clicked", () => {
    renderLightbox(1);
    fireEvent.click(screen.getByLabelText("Próxima foto"));
    expect(onNavigateMock).toHaveBeenCalledWith(2);
  });

  it("does not navigate when at first image and prev is clicked", () => {
    renderLightbox(0);
    fireEvent.click(screen.getByLabelText("Foto anterior"));
    expect(onNavigateMock).not.toHaveBeenCalled();
  });

  it("does not navigate when at last image and next is clicked", () => {
    renderLightbox(2);
    fireEvent.click(screen.getByLabelText("Próxima foto"));
    expect(onNavigateMock).not.toHaveBeenCalled();
  });

  it("disables prev button at first image", () => {
    renderLightbox(0);
    expect(screen.getByLabelText("Foto anterior")).toBeDisabled();
  });

  it("disables next button at last image", () => {
    renderLightbox(2);
    expect(screen.getByLabelText("Próxima foto")).toBeDisabled();
  });

  it("enables both buttons in the middle", () => {
    renderLightbox(1);
    expect(screen.getByLabelText("Foto anterior")).not.toBeDisabled();
    expect(screen.getByLabelText("Próxima foto")).not.toBeDisabled();
  });

  describe("keyboard navigation", () => {
    it("closes lightbox on Escape key", () => {
      renderLightbox();
      fireEvent.keyDown(document, { key: "Escape" });
      expect(onCloseMock).toHaveBeenCalled();
    });

    it("navigates to previous image on ArrowLeft key", () => {
      renderLightbox(1);
      fireEvent.keyDown(document, { key: "ArrowLeft" });
      expect(onNavigateMock).toHaveBeenCalledWith(0);
    });

    it("navigates to next image on ArrowRight key", () => {
      renderLightbox(1);
      fireEvent.keyDown(document, { key: "ArrowRight" });
      expect(onNavigateMock).toHaveBeenCalledWith(2);
    });

    it("does not navigate prev on ArrowLeft at first image", () => {
      renderLightbox(0);
      fireEvent.keyDown(document, { key: "ArrowLeft" });
      expect(onNavigateMock).not.toHaveBeenCalled();
    });

    it("does not navigate next on ArrowRight at last image", () => {
      renderLightbox(2);
      fireEvent.keyDown(document, { key: "ArrowRight" });
      expect(onNavigateMock).not.toHaveBeenCalled();
    });

    it("does not respond to other keys", () => {
      renderLightbox();
      fireEvent.keyDown(document, { key: "Enter" });
      expect(onCloseMock).not.toHaveBeenCalled();
      expect(onNavigateMock).not.toHaveBeenCalled();
    });
  });

  describe("touch/swipe navigation", () => {
    it("navigates to next image on swipe left", () => {
      renderLightbox(1);
      const backdrop = screen.getByLabelText("Fechar lightbox");

      fireEvent.touchStart(backdrop, {
        touches: [{ clientX: 300 }],
      });
      fireEvent.touchEnd(backdrop, {
        changedTouches: [{ clientX: 100 }],
      });

      expect(onNavigateMock).toHaveBeenCalledWith(2);
    });

    it("navigates to previous image on swipe right", () => {
      renderLightbox(1);
      const backdrop = screen.getByLabelText("Fechar lightbox");

      fireEvent.touchStart(backdrop, {
        touches: [{ clientX: 100 }],
      });
      fireEvent.touchEnd(backdrop, {
        changedTouches: [{ clientX: 300 }],
      });

      expect(onNavigateMock).toHaveBeenCalledWith(0);
    });

    it("does not navigate on small swipe", () => {
      renderLightbox(1);
      const backdrop = screen.getByLabelText("Fechar lightbox");

      fireEvent.touchStart(backdrop, {
        touches: [{ clientX: 200 }],
      });
      fireEvent.touchEnd(backdrop, {
        changedTouches: [{ clientX: 180 }],
      });

      expect(onNavigateMock).not.toHaveBeenCalled();
    });

    it("does not navigate when touchStart was not recorded", () => {
      renderLightbox(1);
      const backdrop = screen.getByLabelText("Fechar lightbox");

      // Only fire touchEnd without touchStart
      fireEvent.touchEnd(backdrop, {
        changedTouches: [{ clientX: 100 }],
      });

      expect(onNavigateMock).not.toHaveBeenCalled();
    });
  });

  it("stops propagation when clicking navigation buttons", () => {
    renderLightbox(1); // Use middle index so both buttons are enabled

    // Click prev button - should not trigger backdrop close
    fireEvent.click(screen.getByLabelText("Foto anterior"));
    expect(onNavigateMock).toHaveBeenCalled();
    // onClose should not be called from the backdrop click
    expect(onCloseMock).toHaveBeenCalledTimes(0);

    onNavigateMock.mockClear();

    // Click next button - should not trigger backdrop close
    fireEvent.click(screen.getByLabelText("Próxima foto"));
    expect(onNavigateMock).toHaveBeenCalled();
    expect(onCloseMock).toHaveBeenCalledTimes(0);
  });

  it("cleans up keyboard event listener on unmount", () => {
    const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");
    const { unmount } = renderLightbox();

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "keydown",
      expect.any(Function)
    );
  });
});
