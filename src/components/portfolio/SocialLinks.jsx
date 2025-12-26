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
      {socialLinks.map(
        ({ name, icon: Icon, title, description, url, label }) => (
          <div key={name} className="p-8 bg-muted/50 rounded-xl">
            <div className="flex flex-col items-center gap-4">
              <Icon className="size-12 text-primary" />
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="text-muted-foreground text-sm">{description}</p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                <Icon className="size-5" />
                {label}
              </a>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default SocialLinks;
