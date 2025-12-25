import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import heroImage from "/hero-work.jpg";

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <section className="relative min-h-[90vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-foreground/60" />
        </div>

        <div className="relative z-10 container mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="outline" className="bg-background/80">
                Isolamento
              </Badge>
              <Badge variant="outline" className="bg-background/80">
                Barramento
              </Badge>
              <Badge variant="outline" className="bg-background/80">
                Pintura
              </Badge>
              <Badge variant="outline" className="bg-background/80">
                ETICS
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Isolamento térmico de excelência para o seu projeto
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed">
              Especialistas em sistemas ETICS ("Capoto"), remodelações e
              acabamentos de alta qualidade, a operar em Portugal continental.
              Transformamos espaços com eficiência energética, qualidade e
              estética superior.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="text-base bg-primary text-primary-foreground border border-primary-foreground hover:bg-ring hover:text-primary-foreground"
              >
                <Link to="/contactos">Pedir Orçamento</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-base bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Link to="/servicos">Ver Serviços</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Porquê escolher a Chrisert?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Com anos de experiência e uma equipa dedicada, garantimos
              resultados de qualidade superior.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-lg bg-background border">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold mb-3">
                Eficiência Energética
              </h3>
              <p className="text-muted-foreground">
                Reduza os custos de energia com isolamento térmico profissional.
              </p>
            </div>

            <div className="text-center p-8 rounded-lg bg-background border">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold mb-3">Qualidade Superior</h3>
              <p className="text-muted-foreground">
                Materiais certificados e acabamentos de excelência em todos os
                projetos.
              </p>
            </div>

            <div className="text-center p-8 rounded-lg bg-background border">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-3">Equipa Experiente</h3>
              <p className="text-muted-foreground">
                Profissionais qualificados com vasta experiência no setor.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para transformar o seu espaço?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Entre em contacto connosco para um orçamento gratuito e sem
            compromisso.
          </p>
          <Button asChild size="lg" className="text-base">
            <Link to="/contactos">Contacte-nos Hoje</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
