import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/Carousel";
import { Button } from "@/components/ui/Button";
import Lightbox from "@/components/portfolio/Lightbox";
import SocialLinks from "@/components/portfolio/SocialLinks";
import { portfolioImages } from "@/data/portfolioImages";

const PortfolioPage = () => {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const isLightboxOpen = lightboxIndex !== null;

  // Keyboard controls for carousel
  useEffect(() => {
    if (isLightboxOpen || !api) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") api.scrollPrev();
      else if (e.key === "ArrowRight") api.scrollNext();
      else if (e.key === "Enter") setLightboxIndex(current);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, api, current]);

  // Sync carousel state
  useEffect(() => {
    if (!api) return;

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);

    return () => api.off("select", onSelect);
  }, [api]);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8">Portfólio</h1>
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
                <div
                  className="rounded-lg overflow-hidden aspect-[3/4] max-h-[70vh] cursor-pointer transition-transform hover:scale-[1.02]"
                  onClick={() => setLightboxIndex(index)}
                >
                  <img
                    src={project.image}
                    alt={`Projeto ${project.id}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {portfolioImages.map((_, index) => (
            <button
              key={index}
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

      {/* CTA Section */}
      <section className="py-16 px-4 mt-12 bg-primary text-primary-foreground rounded-lg">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Gostou do que viu?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Peça já o seu orçamento gratuito e sem compromisso.
          </p>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="btn-cta-inverted"
          >
            <Link to="/contactos">Pedir orçamento</Link>
          </Button>
        </div>
      </section>

      {isLightboxOpen && (
        <Lightbox
          images={portfolioImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
};

export default PortfolioPage;
