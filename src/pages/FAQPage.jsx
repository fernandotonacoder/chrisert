import { CTASection } from "@/components/common/CTASection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Seo } from "@/components/common/Seo";
import { faqCategories, mythsAndFacts } from "@/data/faqData";

const FAQPage = () => {
  return (
    <div className="flex flex-col">
      <Seo
        title="Perguntas Frequentes"
        description="Dúvidas sobre ETICS ou Capoto? Encontre respostas para as perguntas mais comuns sobre isolamento térmico."
        canonical="/faq"
      />
      {/* Hero Section */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Perguntas Frequentes
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Esclareça as suas dúvidas sobre o sistema ETICS e os nossos
            serviços. Se não encontrar a resposta que procura, estamos sempre
            disponíveis para ajudar.
          </p>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="space-y-12">
            {faqCategories.map((category) => (
              <div key={category.id}>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  {category.title}
                </h2>
                <Accordion
                  type="single"
                  collapsible
                  className="border rounded-lg px-4"
                >
                  {category.questions.map((item) => (
                    <AccordionItem
                      key={item.question}
                      value={`${category.id}-${item.question}`}
                    >
                      <AccordionTrigger className="text-base">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Myths and Facts Section */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Mitos e Verdades
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Muitas pessoas ainda têm dúvidas sobre o sistema ETICS. Vamos
              esclarecer o que é real e o que é apenas desconhecimento.
            </p>
          </div>

          <div className="space-y-4">
            {mythsAndFacts.map((item) => (
              <div
                key={item.myth}
                className="bg-background rounded-lg border overflow-hidden"
              >
                <div className="grid md:grid-cols-2">
                  <div className="p-6 border-b md:border-b-0 md:border-r">
                    <span className="inline-block text-xs font-semibold uppercase tracking-wider text-destructive bg-destructive/10 px-2 py-1 rounded mb-3">
                      Mito
                    </span>
                    <p className="font-medium">{item.myth}</p>
                  </div>
                  <div className="p-6">
                    <span className="inline-block text-xs font-semibold uppercase tracking-wider text-green-600 bg-green-600/10 px-2 py-1 rounded mb-3">
                      Verdade
                    </span>
                    <p className="text-muted-foreground">{item.fact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO / Location Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="text-muted-foreground">
            Realizamos aplicações de ETICS em{" "}
            <strong>Águeda, Aveiro, Coimbra</strong> e em todo o{" "}
            <strong>Portugal Continental</strong>.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ainda tem dúvidas?"
        description="Fale diretamente com um dos nossos técnicos especializados."
        buttonText="Falar com um técnico"
      />
    </div>
  );
};

export default FAQPage;
