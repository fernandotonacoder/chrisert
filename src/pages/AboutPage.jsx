const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-8">Saber mais</h1>
          <p className="text-lg text-muted-foreground">
            Conheça melhor a ChrisERT e a nossa missão.
          </p>
        </div>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Sobre Nós</h2>
            <p className="text-muted-foreground leading-relaxed">
              A Chrisert é uma empresa dedicada a fornecer aplicação de sistemas de isolamento 
              térmico ETICS ("Capoto") e serviços de remodelação de alta qualidade para clientes residenciais e comerciais.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">A Nossa Missão</h2>
            <p className="text-muted-foreground leading-relaxed">
              Oferecemos soluções personalizadas que atendem às necessidades específicas 
              de cada projeto, garantindo eficiência energética, qualidade e estética superior.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Valores</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="font-semibold mb-2">Qualidade</h3>
                <p className="text-sm text-muted-foreground">
                  Compromisso com a excelência em todos os projetos.
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-2">Inovação</h3>
                <p className="text-sm text-muted-foreground">
                  Sempre procuramos as melhores soluções técnicas.
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-2">Confiança</h3>
                <p className="text-sm text-muted-foreground">
                  Relacionamento duradouro com nossos clientes.
                </p>
              </div>
            </div>
          </section>
        </div>
        
        <div className="text-center mt-12 pt-8 border-t">
          <p className="text-muted-foreground">
            Conteúdo adicional em desenvolvimento. Entre em contacto para mais informações.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;