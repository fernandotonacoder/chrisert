import { useState } from "react";
import { Mail, Phone, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";

const CONTACT_INFO = {
  email: "info@chrisert.pt",
  phone: "+351932741391",
  phoneDisplay: "932 741 391",
};

const ContactErrorDialog = ({ open, onOpenChange }) => {
  const [copiedFields, setCopiedFields] = useState({});

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedFields((prev) => ({ ...prev, [field]: true }));
      setTimeout(() => {
        setCopiedFields((prev) => ({ ...prev, [field]: false }));
      }, 5000);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-foreground border-none text-primary-foreground rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-primary-foreground">
            Erro ao enviar mensagem
          </DialogTitle>
          <DialogDescription className="text-primary-foreground/70">
            Ocorreu um problema ao enviar o formulário. Por favor, tente
            novamente ou contacte-nos diretamente:
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 py-2">
          <div className="flex items-center gap-2">
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="flex-1 flex items-center gap-3 p-4 rounded-lg border border-primary-foreground/20 hover:border-accent hover:bg-primary-foreground/5 transition-all"
            >
              <div className="p-2.5 rounded-full bg-accent">
                <Mail className="w-5 h-5 text-foreground" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-medium text-primary-foreground">
                  Enviar email
                </p>
                <p className="text-sm text-primary-foreground/60">
                  {CONTACT_INFO.email}
                </p>
              </div>
            </a>
            <Button
              variant="outline"
              size="icon"
              className="rounded-lg border-primary-foreground/20 bg-transparent text-primary-foreground hover:border-accent hover:bg-primary-foreground/5"
              onClick={() => copyToClipboard(CONTACT_INFO.email, "email")}
              title="Copiar email"
            >
              {copiedFields.email ? (
                <Check className="w-4 h-4 text-accent" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="flex-1 flex items-center gap-3 p-4 rounded-lg border border-primary-foreground/20 hover:border-accent hover:bg-primary-foreground/5 transition-all"
            >
              <div className="p-2.5 rounded-full bg-accent">
                <Phone className="w-5 h-5 text-foreground" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-medium text-primary-foreground">
                  Ligar agora
                </p>
                <p className="text-sm text-primary-foreground/60">
                  {CONTACT_INFO.phoneDisplay}
                </p>
              </div>
            </a>
            <Button
              variant="outline"
              size="icon"
              className="rounded-lg border-primary-foreground/20 bg-transparent text-primary-foreground hover:border-accent hover:bg-primary-foreground/5"
              onClick={() => copyToClipboard(CONTACT_INFO.phone, "phone")}
              title="Copiar telefone"
            >
              {copiedFields.phone ? (
                <Check className="w-4 h-4 text-accent" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            className="rounded-lg border-accent bg-transparent text-accent hover:bg-accent/10"
            onClick={() => onOpenChange(false)}
          >
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContactErrorDialog;
