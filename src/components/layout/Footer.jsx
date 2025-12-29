import {
  SiFacebook,
  SiInstagram,
  // SiYoutube,
  // SiTiktok,
} from "@icons-pack/react-simple-icons";
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/ui/Marquee";

const logos = [
  {
    name: "Facebook",
    icon: SiFacebook,
    url: "https://facebook.com/chrisert.pt",
  },
  {
    name: "Instagram",
    icon: SiInstagram,
    url: "https://www.instagram.com/chrisert.pt",
  },
];

const CustomFooter = () => (
  <footer className="flex flex-col items-center justify-center gap-4 rounded-xl bg-secondary py-6">
    <p className="text-balance font-medium text-muted-foreground">
      Siga-nos nas redes sociais!
    </p>
    <div className="flex w-full items-center justify-center">
      <Marquee>
        <MarqueeFade className="from-secondary" side="left" />
        <MarqueeFade className="from-secondary" side="right" />
        <MarqueeContent pauseOnHover={true} speed={30}>
          {logos.map((logo) => (
            <MarqueeItem className="mx-8 size-10" key={logo.name}>
              <a
                href={logo.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Abrir ${logo.name} (abre nova aba)`}
              >
                <logo.icon className="size-full" />
              </a>
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </Marquee>
    </div>
    <p className="text-sm text-muted-foreground">
      © 2026 Chrisert. Desenvolvido por{" "}
      <a
        href="https://fernandotonacoder.github.io/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold hover:text-foreground transition-colors"
      >
        Fernando Tona
      </a>
    </p>
  </footer>
);

export default CustomFooter;
