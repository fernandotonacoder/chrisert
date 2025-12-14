const Hero = () => (
  <div className="flex flex-col gap-16">
    {/* Hero Principal */}
    <div className="flex flex-col gap-16 px-8 py-24 text-center">
      <div className="flex flex-col items-center justify-center gap-8">
        <h1 className="mb-0 text-balance font-medium text-6xl md:text-7xl xl:text-[5.25rem]">
          Chrisert
        </h1>
        <p className="mt-0 mb-0 text-balance text-lg text-muted-foreground">
          Chrisert é uma empresa dedicada a fornecer aplicações de capoto,
          barramento, pintura e remodelações de alta qualidade para clientes
          residenciais e comerciais. Com uma equipa experiente e comprometida,
          oferecemos soluções personalizadas que atendem às necessidades
          específicas de cada projeto.
        </p>
      </div>
    </div>

    {/* Secções Placeholder */}
    <section id="services" className="min-h-[400px] px-8 py-16 scroll-mt-16">
      <h2 className="text-4xl font-bold text-center mb-8">Serviços</h2>
      <p className="text-center text-muted-foreground">Em breve...</p>
    </section>

    <section id="portfolio" className="min-h-[400px] px-8 py-16 bg-secondary/30 scroll-mt-16">
      <h2 className="text-4xl font-bold text-center mb-8">Portfólio</h2>
      <p className="text-center text-muted-foreground">Em breve...</p>
    </section>

    <section id="about" className="min-h-[400px] px-8 py-16 scroll-mt-16">
      <h2 className="text-4xl font-bold text-center mb-8">Saber mais</h2>
      <p className="text-center text-muted-foreground">Em breve...</p>
    </section>

    <section id="contacts" className="min-h-[400px] px-8 py-16 bg-secondary/30 scroll-mt-16">
      <h2 className="text-4xl font-bold text-center mb-8">Contactos</h2>
      <p className="text-center text-muted-foreground">Em breve...</p>
    </section>
  </div>
);
export default Hero;
