import PropTypes from "prop-types";

const SEO = ({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = "website",
}) => {
  const siteName = "Chrisert";
  const baseUrl = "https://chrisert.pt";
  const defaultDescription =
    "Especialistas em sistemas ETICS (Capoto), isolamento térmico, remodelações e acabamentos de alta qualidade em Portugal continental.";
  const defaultKeywords =
    "ETICS, Capoto, isolamento térmico, remodelações, acabamentos, construção, eficiência energética, Portugal continental, Águeda";
  const defaultImage =
    "https://raw.githubusercontent.com/fernandotonacoder/chrisert/main/public/chrisert-logo-with-footer-and-border.png";

  const fullTitle = title
    ? `${title} | ${siteName}`
    : `${siteName} - Especialistas em ETICS e Isolamento Térmico`;
  const fullDescription = description || defaultDescription;
  const fullKeywords = keywords || defaultKeywords;
  const fullImage = ogImage || defaultImage;
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl;

  // React 19 native document metadata support
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullImage} />
    </>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  canonical: PropTypes.string,
  ogImage: PropTypes.string,
  ogType: PropTypes.string,
};

export default SEO;
