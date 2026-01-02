import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { BarsScaleFadeIcon } from "@/components/ui/icons/BarsScaleFadeIcon";
import { SEO } from "@/components/SEO";
import { useEffect, useState } from "react";

const NotFoundPage = () => {
  const [count, setCount] = useState(10);
  const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

  useEffect(() => {
    if (count <= 0) {
      globalThis.location.replace(basename);
      return;
    }

    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [count, basename]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <SEO
        title="Página Não Encontrada"
        description="A página que procura não existe."
      />
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-bold text-ring mb-2">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Página não encontrada</h2>
        <p className="text-muted-foreground mb-6">
          A página que procura não existe ou foi movida.
        </p>

        <div className="flex items-center justify-center gap-2 text-ring font-medium mb-6">
          <BarsScaleFadeIcon size={20} />
          <span>A redirecionar em {count}...</span>
        </div>

        <Button asChild size="lg">
          <Link to="/">Ir para a página inicial</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
