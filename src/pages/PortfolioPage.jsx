import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/Carousel";
import { CTASection } from "@/components/common/CTASection";
import SocialLinks from "@/components/common/SocialLinks";
import { Seo } from "@/components/common/Seo";
import { portfolioImages } from "@/data/portfolioImages";
import { useFullscreenGallery } from "@/hooks/useFullscreenGallery";
import FullscreenViewer from "@/components/ui/FullscreenViewer";

const PortfolioPage = () => {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);

  const gallery = useFullscreenGallery(portfolioImages, api);

  // Carousel keyboard controls (when not fullscreen)
  useEffect(() => {
    if (gallery.isFullscreen || !api) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") api.scrollPrev();
      else if (e.key === "ArrowRight") api.scrollNext();
      else if (e.key === "Enter") gallery.open(current);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [gallery.isFullscreen, api, current, gallery]);

  // Sync carousel state
  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => api.off("select", onSelect);
  }, [api]);

  return (
    <div className="flex flex-col">
      <Seo
        title="Portfólio"
        description="Veja alguns dos nossos projetos de isolamento térmico e renovação de fachadas realizados em Portugal."
        canonical="/portfolio"
      />
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Portfólio</h1>
          <p className="text-lg text-muted-foreground mb-12">
            Conheça alguns dos nossos projetos realizados.
          </p>

          <Carousel
            setApi={setApi}
            className="w-full max-w-md md:max-w-lg mx-auto"
          >
            <CarouselContent>
              {portfolioImages.map((project, index) => (
                <CarouselItem key={project.id}>
                  <button
                    type="button"
                    className="w-full rounded-lg overflow-hidden aspect-3/4 max-h-[70vh] cursor-pointer transition-transform hover:scale-[1.02]"
                    onClick={() => gallery.open(index)}
                    aria-label={`Ver projeto ${index + 1}: ${project.alt}`}
                  >
                    <img
                      src={project.image}
                      alt={project.alt}
                      className="w-full h-full object-cover"
                    />
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {portfolioImages.map((project, index) => (
              <button
                key={project.id}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 rounded-full transition-all ${
                  index === current
                    ? "w-6 bg-primary"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Ir para projeto ${index + 1}`}
              />
            ))}
          </div>

          <SocialLinks />
        </div>
      </div>

      <CTASection
        title="Gostou do que viu?"
        description="Peça já o seu orçamento gratuito e sem compromisso."
        buttonText="Pedir orçamento"
      />

      <FullscreenViewer
        images={portfolioImages}
        currentIndex={gallery.currentIndex}
        scale={gallery.scale}
        position={gallery.position}
        isFullscreen={gallery.isFullscreen}
        isZoomed={gallery.isZoomed}
        canGoPrev={gallery.canGoPrev}
        canGoNext={gallery.canGoNext}
        isDragging={gallery.isDragging}
        containerRef={gallery.containerRef}
        onClose={gallery.close}
        onPrev={gallery.goToPrev}
        onNext={gallery.goToNext}
        onWheel={gallery.handleWheel}
        onImageClick={gallery.handleImageClick}
        onMouseDown={gallery.handleMouseDown}
        onMouseMove={gallery.handleMouseMove}
        onMouseUp={gallery.handleMouseUp}
        onTouchStart={gallery.handleTouchStart}
        onTouchMove={gallery.handleTouchMove}
        onTouchEnd={gallery.handleTouchEnd}
      />
    </div>
  );
};

export default PortfolioPage;
