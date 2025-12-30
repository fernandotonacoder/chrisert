import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export const CTASection = ({
  title = "Pronto para transformar o seu espaço?",
  description = "Entre em contacto connosco, sem compromisso.",
  buttonText = "Entrar em contacto",
  buttonLink = "/contactos",
  className,
}) => {
  return (
    <section
      className={cn("py-16 px-4 bg-primary text-primary-foreground", className)}
    >
      <div className="container mx-auto max-w-2xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-lg mb-8 opacity-90">{description}</p>
        <Button
          asChild
          size="lg"
          className="bg-transparent border border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
        >
          <Link to={buttonLink}>{buttonText}</Link>
        </Button>
      </div>
    </section>
  );
};
