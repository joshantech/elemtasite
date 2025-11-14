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
    image: '/images/CarSite.png',
    images: [
      '/images/CarSite.png',
      '/images/CarSoftware.jpg'
    ],
    technologies: ['Next.js', 'Tailwind CSS', 'PostgreSQL', 'Prisma', 'Vercel'],
    fullDescription: 'A comprehensive car dealership solution consisting of two integrated components: A web-based dealership management system that centralizes vehicle inventory, customer records, sales, appointments, and marketing. It manages vehicle inventory with detailed specifications, status tracking, and image uploads; a customer database with purchase history and interest tracking; sales management with automated status updates; appointment scheduling with workflow management; and a marketing module for lead tracking with scoring and follow-up reminders. An analytics dashboard provides real-time KPIs, sales trends, and performance metrics. The customer-facing website displays vehicle inventory with search/filtering, schedules appointments, and includes pages for About, Services, and Financing. It connects to the same database to show vehicles with images and enables customers to schedule appointments and explore financing options.',
    liveUrl: 'https://cardealershipwebsite.webone.dev',
    link: '/about'
  },
  {
    id: 2,
    title: 'Elemta Internal Software',
    description: 'An internal management system for Elemta that handles sales pipelines, client management, project tracking, team coordination, and goal tracking.',
    category: 'Software Development',
    image: '/images/evolvess.jpg',
    images: [
      '/images/evolvess.jpg',
      '/images/marekltingss.jpg'
    ],
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma ORM', 'Tailwind CSS', 'React Context API', 'Vercel'],
    fullDescription: 'This is an internal management system for Elemta that handles sales pipelines, client management, project tracking, team coordination, and goal tracking. It includes role-based access control, a responsive UI with dark mode, and provides a centralized platform for managing all aspects of the business operations.',
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
    image: '/images/mainsitepic.jpg',
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
    description: 'Built Deema Turkish Restaurant\'s website featuring an elegant design that showcases their authentic Turkish cuisine, interactive menu display, and customer reviews. The website effectively communicates the restaurant\'s brand identity and makes it easy for customers to explore their diverse menu, view appetizing food photography, and learn about their culinary philosophy.',
    category: 'Web Development',
    image: '/images/demawebsitess.jpg',
    images: [
      '/images/demawebsitess.jpg',
      '/images/demamenuss.jpg',
      '/images/demaabotusss.jpg'
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS'],
    fullDescription: 'Built Deema Turkish Restaurant\'s website featuring an elegant design that showcases their authentic Turkish cuisine, interactive menu display, and customer reviews. The website effectively communicates the restaurant\'s brand identity with a clean, modern interface that highlights their diverse menu featuring traditional dishes like kebabs, mezes, and baklava. The site includes appetizing food photography, an interactive menu section with detailed descriptions and pricing, an About Us page that tells their story, customer testimonials, and easy navigation for ordering and reservations. The design emphasizes fresh ingredients, traditional recipes, and a memorable dining experience, making it easy for customers to discover Deema and explore their offerings.',
    liveUrl: 'https://www.deematurkishcuisine.com/',
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

