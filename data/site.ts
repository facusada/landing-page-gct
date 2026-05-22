export const siteConfig = {
  name: 'Global Core Technologies',
  shortName: 'Global Core',
  url: 'https://www.gctechs.com',
  description:
    'Consultora especializada en SAP, seguridad, GRC, migracion S/4HANA, operacion AMS, cloud e innovacion para empresas medianas y grandes.',
  email: 'info@gctechs.com',
  phone: '+54 11 5697-2958',
  address: 'Bartolome Mitre 797, 4to piso, CABA, Argentina',
  social: {
    linkedin: 'https://www.linkedin.com/company/global-core-technologies',
    facebook: 'https://www.facebook.com/globalcoretechnologies',
    instagram: 'https://www.instagram.com/globalcoretechnologies'
  }
}

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Bartolome Mitre 797, 4to piso',
    addressLocality: 'Ciudad Autonoma de Buenos Aires',
    addressCountry: 'AR'
  },
  sameAs: Object.values(siteConfig.social),
  areaServed: ['Argentina', 'Latin America'],
  knowsAbout: ['SAP S/4HANA', 'SAP GRC', 'SAP Security', 'AMS', 'Cloud', 'AI', 'Data Analytics']
}
