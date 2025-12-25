import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";

const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor, insira um email válido.",
  }),
  phone: z
    .string()
    .min(9, {
      message: "O telefone deve ter pelo menos 9 dígitos.",
    })
    .optional()
    .or(z.literal("")),
  subject: z.string().min(5, {
    message: "O assunto deve ter pelo menos 5 caracteres.",
  }),
  message: z.string().min(10, {
    message: "A mensagem deve ter pelo menos 10 caracteres.",
  }),
});

const ContactPage = () => {
  const form = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "contacto",
          ...values,
        }).toString(),
      });

      if (response.ok) {
        if (import.meta.env.DEV) {
          console.log("DEV: Formulário simulado. Dados:", values);
        }
        alert("Mensagem enviada com sucesso! Entraremos em contacto em breve.");
        form.reset();
      } else {
        alert("Ocorreu um erro. Por favor, tente novamente.");
      }
    } catch {
      alert("Ocorreu um erro. Por favor, tente novamente.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Entre em Contacto</h1>
          <p className="text-lg text-muted-foreground">
            Tem um projeto em mente? Gostaríamos de saber mais sobre as suas
            necessidades.
          </p>
        </div>

        <Form {...form}>
          <form
            name="contacto"
            method="POST"
            data-netlify="true"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <input type="hidden" name="form-name" value="contacto" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome *</FormLabel>
                    <FormControl>
                      <Input placeholder="O seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email@exemplo.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone (opcional)</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="912 345 678" {...field} />
                  </FormControl>
                  <FormDescription>
                    Opcional: para podermos contactá-lo mais rapidamente.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assunto *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Breve descrição do projeto ou pedido"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensagem *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva o seu projeto, necessidades ou dúvidas..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Quanto mais detalhes fornecer, melhor poderemos ajudá-lo.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full md:w-auto"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "A enviar..." : "Enviar Mensagem"}
            </Button>
          </form>
        </Form>

        <div className="mt-12 pt-8 border-t">
          <h3 className="text-xl font-semibold mb-6">
            Outras formas de contacto
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">Email:</strong>{" "}
              info@chrisert.pt
            </p>
            <p>
              <strong className="text-foreground">Telefone:</strong> +351 932
              741 391
            </p>
            <p>
              <strong className="text-foreground">Morada:</strong> Rua Subida da
              Catraia, nº 323 R/C Esquerdo. Águeda 3750-308
            </p>
            <p className="mt-4 text-xs">
              Prestamos serviços apenas em Portugal continental.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
