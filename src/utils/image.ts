// Image paths utility
export const imagePaths = {
  logo: {
    withText: '/images/logo/logo-with-text.webp',
    withoutText: '/images/logo/logo-without-text.webp',
  },

  hero: {
    background: '/images/hero/hero-background.webp',
    cardImage: '/images/hero/hero-card-image.webp'
  },
  about: {
    main: '/images/aboutus/about-us.webp',
    excellence: '/images/about/architectural-excellence.webp',
    expertise: '/images/about/professional-expertise.webp',
    integrity: '/images/about/integrity-values.webp'
  },
  services: {
    main: '/images/services/services-main.webp',
    residential: '/images/projects/residential-villa-1.webp',
    commercial: '/images/projects/commercial-complex-1.webp',
    heritage: '/images/projects/heritage-residence-1.webp',
    sustainable: '/images/projects/eco-development-1.webp'
  },
  clients: {
    client1: '/images/clients/client-1.webp',
    client2: '/images/clients/client-2.webp',
    client3: '/images/clients/client-3.webp',
    client4: '/images/clients/client-4.webp',
    client5: '/images/clients/client-5.webp',
    client6: '/images/clients/client-6.webp',
    client7: '/images/clients/client-7.webp',
    client8: '/images/clients/client-8.webp'
  },
  processes: {
    consultation: '/images/processes/consultation-briefing.webp',
    conceptual: '/images/processes/conceptual-design.webp',
    development: '/images/processes/design-development.webp',
    implementation: '/images/processes/implementation-support.webp'
  },
  projects: {
    main: '/images/ourprojects/projects-main.webp', 
    residential: '/images/projects/residential-villa-1.webp',
    commercial: '/images/projects/commercial-complex-1.webp',
    heritage: '/images/projects/heritage-residence-1.webp',
    eco: '/images/projects/eco-development-1.webp', // Keep existing for Services
    luxury: '/images/projects/hillside-villa-1.webp', // Keep existing for Services
    office: '/images/projects/office-complex-1.webp',
    // Add new properties for Projects page
    sustainable: '/images/projects/eco-development-1.webp', // Same as eco but different name
    hillside: '/images/projects/hillside-villa-1.webp' // Same as luxury but different name
  },
  team: {
    lead: '/images/team/lead-architect.webp',
    senior: '/images/team/senior-architect.webp'
  }
};

// Client companies data with actual image paths
export const companies = [
  { id: 1, name: "Botswana Construction Ltd", image: imagePaths.clients.client1 },
  { id: 2, name: "Gaborone Properties", image: imagePaths.clients.client2 },
  { id: 3, name: "Heritage Builders", image: imagePaths.clients.client3 },
  { id: 4, name: "Sustainable Developments", image: imagePaths.clients.client4 },
  { id: 5, name: "Urban Design Group", image: imagePaths.clients.client5 },
  { id: 6, name: "Modern Living Co.", image: imagePaths.clients.client6 },
  { id: 7, name: "Traditional Craftsmen", image: imagePaths.clients.client7 },
  { id: 8, name: "Innovation Builders", image: imagePaths.clients.client8 }
];

// Success stories with image paths
export const successStories = [
  {
    id: 1,
    title: "Gaborone Family Residence",
    description: "A contemporary family home blending modern aesthetics with traditional Botswana design elements, featuring sustainable materials.",
    type: "Modern Residential Villa",
    link: "/projects/residential-villa",
    image: imagePaths.projects.residential
  },
  {
    id: 2,
    title: "Francistown Business Center",
    description: "Mixed-use development combining retail spaces with office facilities, designed to promote community interaction.",
    type: "Commercial Complex",
    link: "/projects/commercial-complex",
    image: imagePaths.projects.commercial
  },
  {
    id: 3,
    title: "Maun Cultural Retreat",
    description: "A respectful integration of traditional architectural forms with modern comfort, celebrating cultural heritage.",
    type: "Heritage Residence",
    link: "/projects/heritage-residence",
    image: imagePaths.projects.heritage
  },
  {
    id: 4,
    title: "Sustainable Community Project",
    description: "Environmentally conscious design featuring passive cooling and community-focused spatial planning.",
    type: "Eco Development",
    link: "/projects/eco-development",
    image: imagePaths.projects.eco // Keep using eco for consistency
  },
  {
    id: 5,
    title: "Luxury Hillside Villa",
    description: "Modern architectural masterpiece with panoramic views, featuring innovative sustainable design solutions.",
    type: "Luxury Residential",
    link: "/projects/hillside-villa",
    image: imagePaths.projects.luxury // Keep using luxury for consistency
  },
  {
    id: 6,
    title: "Urban Office Complex",
    description: "Contemporary office space designed for collaboration and productivity with energy-efficient systems.",
    type: "Commercial Office",
    link: "/projects/office-complex",
    image: imagePaths.projects.commercial
  }
];