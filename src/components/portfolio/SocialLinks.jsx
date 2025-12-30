import { FaInstagram, FaFacebook } from "react-icons/fa";

const socialLinks = [
  {
    name: "Instagram",
    icon: FaInstagram,
    title: "Siga-nos no Instagram",
    description: "Acompanhe os nossos projetos mais recentes.",
    url: "https://www.instagram.com/chrisert.pt/",
    label: "@chrisert.pt",
  },
  {
    name: "Facebook",
    icon: FaFacebook,
    title: "Siga-nos no Facebook",
    description: "Novidades e atualizações da equipa.",
    url: "https://www.facebook.com/chrisert.pt/",
    label: "Chrisert",
  },
];

const SocialLinks = () => {
  return (
    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <div key={social.name} className="p-8 bg-muted/50 rounded-xl">
            <div className="flex flex-col items-center gap-4">
              <Icon className="size-12 text-primary" />
              <h2 className="text-xl font-semibold">{social.title}</h2>
              <p className="text-muted-foreground text-sm">
                {social.description}
              </p>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                <Icon className="size-5" />
                {social.label}
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SocialLinks;
