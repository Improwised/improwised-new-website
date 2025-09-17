// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Improwised Technologies Pvt. Ltd.';
export const SITE_DESCRIPTION = 'Welcome to my website!';
export const SITE_KEY = import.meta.env.SITE_KEY;
export const CONTACT_US_URL = import.meta.env.CONTACT_US_URL;
export const LD_JSON_DATA = {
    "@context": "https://schema.org",
    "@type": "Corporation",
    name: "Improwised Technologies Pvt. Ltd.",
    alternateName: "Improwised Technologies",
    url: "https://www.improwised.com/",
    logo: "https://www.improwised.com/img/logo.png",
    sameAs: [
      "https://www.facebook.com/improwised",
      "https://twitter.com/improwised",
      "https://www.linkedin.com/company/improwised-technologies/",
      "https://www.improwised.com/",
      "https://github.com/Improwised/",
    ],
};
