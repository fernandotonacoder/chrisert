import { CTASection } from "@/components/ui/CTASection";
import SEO from "@/components/SEO";
import { services, eticsBenefits, processSteps } from "@/data/servicesData";

const ServicesPage = () => {
  return (
    <div className="flex flex-col">
      <SEO
        title="Serviços"
        description="Conheça os nossos serviços de isolamento térmico (ETICS/Capoto), renovação de fachadas, pintura e limpeza de telhados."
        canonical="/servicos"
      />
      {/* Hero Section */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Os Nossos Serviços
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Especialistas em soluções para exteriores. Desde isolamento térmico
            ETICS até recuperação de fachadas, oferecemos serviços de excelência
            para valorizar e proteger o seu edifício.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className="p-6 border rounded-lg bg-background hover:shadow-lg transition-shadow"
                >
                  <div className="mb-4">
                    <IconComponent
                      className={`w-10 h-10 ${service.iconColor}`}
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <span className="text-primary">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ETICS Benefits Section */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Porquê escolher ETICS?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              O sistema ETICS ("Capoto") é a solução mais eficaz para isolamento
              térmico de fachadas, com benefícios comprovados.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {eticsBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 bg-background rounded-lg border"
                >
                  <div className="flex justify-center mb-3">
                    <IconComponent
                      className={`w-8 h-8 ${benefit.iconColor}`}
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Como Trabalhamos
            </h2>
            <p className="text-lg text-muted-foreground">
              Um processo simples e transparente, do início ao fim.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary/20 mb-2">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection title="Pronto para transformar o exterior do seu edifício?" />
    </div>
  );
};

export default ServicesPage;
