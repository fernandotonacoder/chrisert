import {
  SiFacebook,
  SiInstagram,
  SiYoutube,
  SiTiktok,
} from "@icons-pack/react-simple-icons";
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/ui/shadcn-io/marquee";

const logos = [
  {
    name: "Facebook",
    icon: SiFacebook,
    url: "https://facebook.com",
  },
  {
    name: "Instagram",
    icon: SiInstagram,
    url: "https://www.instagram.com/chrisertr/",
  },
  {
    name: "YouTube",
    icon: SiYoutube,
    url: "https://youtube.com",
  },
  {
    name: "TikTok",
    icon: SiTiktok,
    url: "https://tiktok.com",
  },
];

const CustomFooter = () => (
  <footer className="flex flex-col items-center justify-center gap-8 rounded-xl bg-secondary py-8 pb-18">
    <p className="mb-0 text-balance font-medium text-muted-foreground">
      Segue-nos nas redes sociais!
    </p>
    <div className="flex size-full items-center justify-center">
      <Marquee>
        <MarqueeFade className="from-secondary" side="left" />
        <MarqueeFade className="from-secondary" side="right" />
        <MarqueeContent pauseOnHover={false}>
          {logos.map((logo) => (
            <MarqueeItem className="mx-16 size-12" key={logo.name}>
              <a href={logo.url}>
                <logo.icon className="size-full" />
              </a>
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </Marquee>
    </div>
  </footer>
);

export default CustomFooter;
