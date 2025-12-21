const PortfolioPage = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8">Portfólio</h1>
        <p className="text-lg text-muted-foreground mb-12">
          Conheça alguns dos nossos projetos realizados.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border rounded-lg overflow-hidden">
            <div className="h-48 bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">Projeto 1</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">
                Remodelação Residencial
              </h3>
              <p className="text-muted-foreground">
                Renovação completa com sistema ETICS.
              </p>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <div className="h-48 bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">Projeto 2</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Isolamento Térmico</h3>
              <p className="text-muted-foreground">
                Aplicação de ETICS em edifício comercial.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <p className="text-muted-foreground">
            Galeria completa em desenvolvimento. Entre em contacto para ver mais
            projetos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
