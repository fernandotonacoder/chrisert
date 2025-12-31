import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CTASection } from "@/components/ui/CTASection";
import SEO from "@/components/SEO";
import { Award, Users, ThermometerSun } from "lucide-react";

const heroImage = new URL("/hero-work.jpg", import.meta.url).href;

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <SEO canonical="/" />
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
              <Badge variant="outline" className="bg-background/80">
                Limpeza de Telhados
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Isolamento térmico de excelência para o seu projeto
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed">
              Proteja e valorize o seu imóvel com as melhores soluções de
              isolamento e renovação de fachadas. Qualidade certificada de norte
              a sul do país.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="text-base bg-primary text-primary-foreground border border-primary-foreground hover:bg-ring hover:text-primary-foreground"
              >
                <Link to="/contactos">Entrar em contacto</Link>
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
              <div className="flex justify-center mb-4">
                <ThermometerSun
                  className="w-10 h-10 text-orange-500"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Eficiência Energética
              </h3>
              <p className="text-muted-foreground">
                Reduza os custos de energia com isolamento térmico profissional.
              </p>
            </div>

            <div className="text-center p-8 rounded-lg bg-background border">
              <div className="flex justify-center mb-4">
                <Award className="w-10 h-10 text-amber-500" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Qualidade Superior</h3>
              <p className="text-muted-foreground">
                Materiais certificados e acabamentos de excelência em todos os
                projetos.
              </p>
            </div>

            <div className="text-center p-8 rounded-lg bg-background border">
              <div className="flex justify-center mb-4">
                <Users className="w-10 h-10 text-teal-600" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Equipa Experiente</h3>
              <p className="text-muted-foreground">
                Profissionais qualificados com vasta experiência no setor.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              Quem Somos
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-center mb-12">
              A Chrisert é especialista na aplicação de sistemas ETICS
              ("Capoto"), renovação de fachadas e limpeza de telhados. Operamos
              em Portugal continental, entregando soluções de isolamento,
              manutenção e acabamento de alta qualidade para projetos
              residenciais e comerciais.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden">
              <div className="text-center p-8 bg-background">
                <h3 className="text-lg font-semibold mb-2">Qualidade</h3>
                <p className="text-sm text-muted-foreground">
                  Compromisso com a excelência em todos os projetos.
                </p>
              </div>
              <div className="text-center p-8 bg-background">
                <h3 className="text-lg font-semibold mb-2">Inovação</h3>
                <p className="text-sm text-muted-foreground">
                  Procuramos sempre as melhores soluções técnicas.
                </p>
              </div>
              <div className="text-center p-8 bg-background">
                <h3 className="text-lg font-semibold mb-2">Confiança</h3>
                <p className="text-sm text-muted-foreground">
                  Relacionamento duradouro com os nossos clientes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CTASection />
    </div>
  );
};

export default HomePage;
