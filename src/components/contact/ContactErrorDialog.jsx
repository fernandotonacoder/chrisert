import { useState } from "react";
import PropTypes from "prop-types";
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

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedFields((prev) => ({ ...prev, [field]: true }));
      setTimeout(() => {
        setCopiedFields((prev) => ({ ...prev, [field]: false }));
      }, 5000);
    } catch {
      // Clipboard API not available - show visual feedback anyway
      // Modern browsers support clipboard API, fallback not needed
      setCopiedFields((prev) => ({ ...prev, [field]: true }));
      setTimeout(() => {
        setCopiedFields((prev) => ({ ...prev, [field]: false }));
      }, 5000);
    }
  };

  const handleCopyClick = (e, text, field) => {
    e.preventDefault();
    e.stopPropagation();
    copyToClipboard(text, field);
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
              type="button"
              variant="outline"
              size="icon"
              className="min-w-11 min-h-11 rounded-lg border-primary-foreground/20 bg-transparent text-primary-foreground hover:border-accent hover:bg-primary-foreground/5 active:bg-primary-foreground/10"
              onClick={(e) => handleCopyClick(e, CONTACT_INFO.email, "email")}
              onTouchEnd={(e) =>
                handleCopyClick(e, CONTACT_INFO.email, "email")
              }
              title="Copiar email"
              aria-label="Copiar email para área de transferência"
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
              type="button"
              variant="outline"
              size="icon"
              className="min-w-11 min-h-11 rounded-lg border-primary-foreground/20 bg-transparent text-primary-foreground hover:border-accent hover:bg-primary-foreground/5 active:bg-primary-foreground/10"
              onClick={(e) => handleCopyClick(e, CONTACT_INFO.phone, "phone")}
              onTouchEnd={(e) =>
                handleCopyClick(e, CONTACT_INFO.phone, "phone")
              }
              title="Copiar telefone"
              aria-label="Copiar telefone para área de transferência"
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

ContactErrorDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
};

export default ContactErrorDialog;
