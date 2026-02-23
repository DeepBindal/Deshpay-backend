const LOGO_TOKEN = process.env.LOGO_DEV_TOKEN;

exports.logoByDomain = (domain, { size = 64, theme = "light" } = {}) => {
  if (!domain) return null;

  return `https://img.logo.dev/${domain}?token=${LOGO_TOKEN}&size=${size}&format=png&theme=${theme}`;
};

exports.logoByName = (name, { size = 64, theme = "light" } = {}) => {
  if (!name) return null;

  return `https://img.logo.dev/name/${encodeURIComponent(
    name,
  )}?token=${LOGO_TOKEN}&size=${size}&format=png&theme=${theme}`;
};
