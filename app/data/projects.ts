export interface ProjectItem {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  images?: string[];
  technologies?: string[];
  fullDescription?: string;
  liveUrl?: string;
  link?: string;
}

export const allProjects: ProjectItem[] = [
  {
    id: 1,
    title: 'Car Dealership Software & Website',
    description: 'A comprehensive dealership management system with customer-facing website that centralizes vehicle inventory, customer records, sales, appointments, and marketing.',
    category: 'Web Development',
    image: '/images/logos/CarSummitLogo.svg',
    images: [
      '/images/CarSite.png',
      '/images/CarSoftware.jpg'
    ],
    technologies: ['Next.js', 'Tailwind CSS', 'PostgreSQL', 'Prisma', 'Vercel'],
    fullDescription: 'A comprehensive car dealership solution consisting of two integrated components: A web-based dealership management system that centralizes vehicle inventory, customer records, sales, appointments, and marketing. It manages vehicle inventory with detailed specifications, status tracking, and image uploads; a customer database with purchase history and interest tracking; sales management with automated status updates; appointment scheduling with workflow management; and a marketing module for lead tracking with scoring and follow-up reminders. An analytics dashboard provides real-time KPIs, sales trends, and performance metrics. The customer-facing website displays vehicle inventory with search/filtering, schedules appointments, and includes pages for About, Services, and Financing. It connects to the same database to show vehicles with images and enables customers to schedule appointments and explore financing options.',
    liveUrl: 'https://cardealershipwebsite.elemta.com/',
    link: '/about'
  },
  {
    id: 3,
    title: 'Lead Generation Automation',
    description: 'Comprehensive lead generation automation that scrapes data of businesses in specified regions and outputs them to our google spreadsheet.',
    category: 'Automation',
    image: '/images/n8nss.png',
    images: [
      '/images/n8nss.png'
    ],
    technologies: ['n8n', 'Google Sheets API', 'Google Places API', 'Web Scraping'],
    fullDescription: 'Comprehensive lead generation automation that scrapes data of businesses in specified regions and outputs them to our google spreadsheet. The automation runs every 30 minutes during business hours, searches for businesses, processes and formats the results, filters out duplicates, and appends new leads to a Google Spreadsheet for organized storage and analysis.',
    link: '/about'
  },
  {
    id: 4,
    title: "WebOne's Main Website",
    description: 'WebOne\'s main website featuring a modern, dark-themed design with smooth animations and interactive elements.',
    category: 'Web Development',
    image: '/images/logos/WEBONEWHITELOGO.svg',
    images: [
      '/images/mainsitepic.jpg',
      '/images/servicespage.jpg'
    ],
    technologies: ['React', 'Vite', 'TailwindCSS', 'Framer Motion'],
    fullDescription: 'WebOne\'s main website featuring a modern, dark-themed design with smooth animations and interactive elements. The website showcases services including websites, software, AI solutions, and marketing services, with a clean and professional user interface.',
    liveUrl: 'https://www.webone.dev',
    link: '/about'
  },
  {
    id: 5,
    title: 'Deema Turkish Cuisine Website',
    description: 'Deema Turkish Restaurant\'s website featuring an elegant design that showcases their authentic Turkish cuisine, interactive menu display, and customer reviews. The website effectively communicates the restaurant\'s brand identity and makes it easy for customers to explore their diverse menu, view appetizing food photography, and learn about their culinary philosophy.',
    category: 'Web Development',
    image: '/images/logos/DeemaLogo.svg',
    images: [
      '/images/demawebsitess.jpg',
      '/images/demamenuss.jpg',
      '/images/demaabotusss.jpg'
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS'],
    fullDescription: 'Deema Turkish Restaurant\'s website featuring an elegant design that showcases their authentic Turkish cuisine, interactive menu display, and customer reviews. The website effectively communicates the restaurant\'s brand identity with a clean, modern interface that highlights their diverse menu featuring traditional dishes like kebabs, mezes, and baklava. The site includes appetizing food photography, an interactive menu section with detailed descriptions and pricing, an About Us page that tells their story, customer testimonials, and easy navigation for ordering and reservations. The design emphasizes fresh ingredients, traditional recipes, and a memorable dining experience, making it easy for customers to discover Deema and explore their offerings.',
    liveUrl: 'https://www.deematurkishcuisine.com/',
    link: '/about'
  },
  {
    id: 6,
    title: 'NovaScan Website',
    description: 'A modern website for NovaScan featuring breakthrough technology for cancer detection and diagnosis.',
    category: 'Web Development',
    image: '/images/logos/NovaScanLogo.svg',
    images: [
      '/images/NovaScanSiteImg.svg'
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS'],
    fullDescription: 'NovaScan website featuring breakthrough technology improving cancer diagnosis with easy to use, ex vivo and in vivo cancer detection that provides instantaneous, highly accurate results.',
    liveUrl: 'https://novascan-ju3x.vercel.app/',
    link: '/about'
  },
  {
    id: 7,
    title: 'Sweets n Stems Website',
    description: 'A beautiful website for Sweets&Stems by Aliya showcasing handcrafted candy and flower bundles.',
    category: 'Web Development',
    image: '/images/logos/SweetsnstemsLogo.svg',
    images: [
      '/images/SweetsnStemsSiteImg.svg'
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS'],
    fullDescription: 'Sweets&Stems by Aliya website featuring beautiful candy and flower bundles, handcrafted with care and love. Where the sweetness of candy meets the beauty of flowers.',
    liveUrl: 'https://sweetsstemsbyaliya.vercel.app/',
    link: '/about'
  },
  {
    id: 8,
    title: 'Aldeen Realty Website',
    description: 'A professional real estate website for Aldeen Realty led by Diaa Almalahi, expert in residential and commercial real estate.',
    category: 'Web Development',
    image: '/images/logos/AldeenRealtyLogo.svg',
    images: [
      '/images/AldeenRealtySiteImg.svg'
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS'],
    fullDescription: 'Aldeen Realty website - your trusted real estate partner. Led by Diaa Almalahi, providing expert guidance for residential and commercial real estate transactions.',
    liveUrl: 'https://aldeen-realty.vercel.app/',
    link: '/about'
  }
];

// Category mapping for service links
export const categoryMap: Record<string, string[]> = {
  'softwares': ['Software Development', 'Web Development'],
  'ai': ['Automation'],
  'marketing': ['Marketing & Branding'],
  'website': ['Web Development']
};

