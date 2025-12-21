const ServicesPage = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8">Serviços</h1>
        <p className="text-lg text-muted-foreground mb-12">
          Oferecemos soluções completas de ETICS ("Capoto") e remodelação de
          alta qualidade.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Sistema ETICS</h3>
            <p className="text-muted-foreground">
              Isolamento térmico pelo exterior com acabamentos de alta
              qualidade.
            </p>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Remodelações</h3>
            <p className="text-muted-foreground">
              Renovação completa de espaços residenciais e comerciais.
            </p>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Consultoria</h3>
            <p className="text-muted-foreground">
              Assessoria técnica especializada para o seu projeto.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <p className="text-muted-foreground">
            Conteúdo detalhado em desenvolvimento. Entre em contacto para mais
            informações.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
