import backpackEmoji from '@/assets/icons/emoji/backpack.svg';
import booksEmoji from '@/assets/icons/emoji/books.svg';
import chairEmoji from '@/assets/icons/emoji/chair.svg';
import chequeredFlagEmoji from '@/assets/icons/emoji/chequered-flag.svg';
import hikingBootEmoji from '@/assets/icons/emoji/hiking-boot.svg';
import hotBeverageEmoji from '@/assets/icons/emoji/hot-beverage.svg';
import laptopEmoji from '@/assets/icons/emoji/laptop.svg';
import motorcycleEmoji from '@/assets/icons/emoji/motorcycle.svg';
import motorwayEmoji from '@/assets/icons/emoji/motorway.svg';
import mountainEmoji from '@/assets/icons/emoji/mountain.svg';
import pottedPlantEmoji from '@/assets/icons/emoji/potted-plant.svg';
import sunglassesEmoji from '@/assets/icons/emoji/sunglasses.svg';
import vladAdventures from '@/assets/about/vlad-adventures.webp';
import vladPlant from '@/assets/about/vlad-plant.webp';
import vladMoto from '@/assets/about/vlad-moto.webp';
import vladTech from '@/assets/about/vlad-tech.webp';
import angularLogo from '@/assets/icons/angular.svg';
import awsLogo from '@/assets/icons/aws.svg';
import azureLogo from '@/assets/icons/azure.svg';
import dockerLogo from '@/assets/icons/docker.svg';
import gitLogo from '@/assets/icons/git.svg';
import gitlabLogo from '@/assets/icons/gitlab.svg';
import javaLogo from '@/assets/icons/java.svg';
import junitLogo from '@/assets/icons/junit.svg';
import kubernetesLogo from '@/assets/icons/kubernetes.svg';
import mongodbLogo from '@/assets/icons/mongodb.svg';
import postgresqlLogo from '@/assets/icons/postgresql.svg';
import pythonLogo from '@/assets/icons/python.svg';
import redisLogo from '@/assets/icons/redis.svg';
import sonarqubeLogo from '@/assets/icons/sonarqube.svg';
import springBootLogo from '@/assets/icons/spring-boot.svg';
import typescriptLogo from '@/assets/icons/typescript.svg';
import cierzolgtbScreenshot from '@/assets/projects/cierzolgtb.webp';
import elisandesignScreenshot from '@/assets/projects/elisandesign.webp';
import experienceNowScreenshot from '@/assets/projects/experience-now.webp';
import securitasDirectScreenshot from '@/assets/projects/securitas-direct.webp';
import viscoScreenshot from '@/assets/projects/visco.webp';

// Content follows Vlad's CV.
export const profile = {
  shortName: 'Vlad Dinca',
  role: 'Senior Software Engineer',
  location: 'Zaragoza, Spain',
  available: 'Available soon',
  email: 'mdumitruvlad@gmail.com',
} as const;

export const emailHref = `mailto:${profile.email}`;

/** 30-minute intro call, opened in a new tab. */
export const meetingHref = 'https://calendly.com/mdumitruvlad/30min';

export type SocialNetwork = 'LinkedIn' | 'Instagram' | 'WhatsApp';

// Shown in the bio, the contact section and the footer. WhatsApp uses
// https://wa.me/<international number without "+" or spaces>. Entries
// without an href stay hidden.
export const socialLinks: readonly { label: SocialNetwork; href: string }[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/vlad-dumitru-24a689204',
  },
  { label: 'Instagram', href: 'https://www.instagram.com/vladi_viajes/' },
  { label: 'WhatsApp', href: 'https://wa.me/34622427441' },
];

export const heroTicker = [
  'Java 17',
  'Spring Boot',
  'Microservices',
  'Kafka',
  'Redis',
  'PostgreSQL',
  'Docker',
  'Kubernetes',
  'AWS',
  'Hexagonal Architecture',
] as const;

// Strips between the later sections, each echoing the section around it.
export const valuesTicker = [
  'Clean code',
  'SOLID',
  'Tests that matter',
  'API-first',
  'Fast under load',
  'Mentoring',
  'Event-driven',
] as const;

export const hobbiesTicker = [
  'Climbing',
  'Hiking',
  'Kawasaki Ninja 500',
  'Classic literature',
  'Walden',
  'Gym',
  'Plants & coffee',
] as const;

export const navigationItems = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
] as const;

// About me player card.
export type HighlightColor = 'yellow' | 'pink' | 'green' | 'sky';

/** Plain text, or a phrase underlined with a marker of the given colour. */
export type BioSegment = string | { text: string; highlight: HighlightColor };

// Facts from Vlad's CV. The first paragraph is the lead.
export const aboutBio: readonly (readonly BioSegment[])[] = [
  [
    'Hi! I’m Vlad, a ',
    { text: 'Java backend engineer', highlight: 'yellow' },
    ' based in ',
    { text: 'Zaragoza, Spain', highlight: 'sky' },
    '.',
  ],
  [
    'Since 2020 I’ve built and modernized high-traffic platforms: a Renfe service used by ',
    { text: '500,000 daily passengers', highlight: 'green' },
    ', aerial imagery pipelines for France’s Geoportail and, at Securitas Direct, the migration of a legacy platform to ',
    { text: 'Java 17 microservices', highlight: 'pink' },
    '.',
  ],
  [
    'I’m a ',
    { text: 'deeply creative', highlight: 'yellow' },
    ' person and I love ',
    { text: 'side projects', highlight: 'green' },
    '. Over the years I’ve built websites and platforms for friends, like ',
    { text: 'Elisandesign', highlight: 'sky' },
    ', and for foundations, like ',
    { text: 'Cierzo', highlight: 'sky' },
    '.',
  ],
  [
    'When the laptop closes, I’m ',
    { text: 'on the bike, on a wall or in a book', highlight: 'pink' },
    '.',
  ],
];

// Closes the bio, right above the social profile buttons.
export const aboutBioInvite: readonly BioSegment[] = [
  'I ',
  { text: 'love meeting new people', highlight: 'pink' },
  ', so now that you’re here, don’t hesitate to say hi:',
];

type CareerJobId = 'renfe' | 'geoportail' | 'securitas';

export type CareerJob = {
  id: CareerJobId;
  company: string;
  /** First month, as `YYYY-MM`. */
  start: string;
  /** Last month, as `YYYY-MM`; omitted while the job is ongoing. */
  end?: string;
  className: string;
};

// Professional history from Vlad's CV, oldest first. The skill tree turns
// each job into half-year squares, so the ongoing one grows over time.
export const careerJobs: readonly CareerJob[] = [
  {
    id: 'renfe',
    company: 'Renfe',
    start: '2020-09',
    end: '2021-10',
    className: 'bg-green',
  },
  {
    id: 'geoportail',
    company: 'Geoportail',
    start: '2021-10',
    end: '2023-03',
    className: 'bg-pink',
  },
  {
    id: 'securitas',
    company: 'Securitas Direct',
    start: '2023-03',
    className: 'bg-yellow',
  },
];

// Technologies the CV ties to a job, with where they were used. Assumption:
// the CV names Spring Boot only for Geoportail, but Renfe's and Securitas
// Direct's Java microservices are counted as Spring Boot too.
export const techExperience: readonly {
  name: string;
  jobs: readonly CareerJobId[];
}[] = [
  {
    name: 'Java',
    jobs: ['renfe', 'geoportail', 'securitas'],
  },
  {
    name: 'Spring Boot',
    jobs: ['renfe', 'geoportail', 'securitas'],
  },
  {
    name: 'Angular',
    jobs: ['geoportail'],
  },
  {
    name: 'MongoDB',
    jobs: ['geoportail'],
  },
  {
    name: 'AWS',
    jobs: ['geoportail'],
  },
  {
    name: 'GitLab CI/CD',
    jobs: ['geoportail'],
  },
  {
    name: 'Redis',
    jobs: ['securitas'],
  },
  {
    name: 'SonarQube',
    jobs: ['securitas'],
  },
];

// Written from the user's own description of their free time.
export const aboutPersonal: readonly (readonly BioSegment[])[] = [
  [
    'I have way too many hobbies. Right now it’s ',
    { text: 'motorbikes', highlight: 'sky' },
    ', but I’ve tried a bit of everything, and the ',
    { text: 'gym and climbing', highlight: 'green' },
    ' never leave the list.',
  ],
  [
    'I’ve spent the last few years turning an old shop into my home: ',
    { text: 'a loft my friends openly envy', highlight: 'yellow' },
    ', packed with ',
    { text: 'plants', highlight: 'green' },
    '. I simply can’t stop buying them.',
  ],
  [
    'To rest from screens I let my artsy side out. I’d love to learn to draw, but for now I ',
    { text: 'read', highlight: 'pink' },
    ', which relaxes me like nothing else: ',
    { text: 'classic literature and essays', highlight: 'pink' },
    '. One day they’ll become a project of their own, my library.',
  ],
];

// Book on the Personal tab.
export const aboutReading = {
  title: 'El Aleph',
  author: 'Jorge Luis Borges',
} as const;

// Written from the user's own description of their outdoor side.
export const aboutAdventuresText: readonly (readonly BioSegment[])[] = [
  [
    'One of my favourite films is ',
    { text: 'Into the Wild', highlight: 'green' },
    '. I read the book afterwards, and it’s full of other books: essays like ',
    { text: 'Walden', highlight: 'yellow' },
    ', which became my favourite, and classics like ',
    { text: 'The Call of the Wild', highlight: 'pink' },
    ' or ',
    { text: 'Huckleberry Finn', highlight: 'pink' },
    '. That’s how I started reading.',
  ],
  [
    'That chain of discoveries also brought me closer to ',
    { text: 'nature', highlight: 'green' },
    ' and woke up my ',
    { text: 'adventurous spirit', highlight: 'sky' },
    ': the urge to get out there and explore.',
  ],
  [
    'Don’t get me wrong, I ',
    { text: 'love software', highlight: 'yellow' },
    '. But sitting for 8 hours a day, sometimes 12, gets heavy when another 8 go to sleep. That’s why I need ',
    { text: 'extreme sports', highlight: 'pink' },
    ' and a dose of strong emotions every now and then, and that’s why the motorbike.',
  ],
  [
    'A friend and I recently bought a ',
    { text: 'Kawasaki Ninja 250R', highlight: 'sky' },
    ' together, and we’re getting into the track world: learning to race and to lean the bike into corners at the ',
    { text: 'Circuito Internacional de Zuera', highlight: 'green' },
    '. I try to document it all on Instagram.',
  ],
];

const instagramHref =
  socialLinks.find((link) => link.label === 'Instagram')?.href ?? '';

// Calls to action under the panels. The tech blog and the library do not
// exist yet, and Adventures points to Instagram until the mountain blog does;
// an empty href renders the button as "coming soon".
export const aboutPanelLinks = {
  tech: { label: 'Read my tech blog', href: '' },
  personal: { label: 'Visit my library', href: '' },
  adventures: { label: 'Follow on Instagram', href: instagramHref },
} as const satisfies Record<string, { label: string; href: string }>;

export const aboutTabs = [
  { id: 'bio', label: 'Bio' },
  { id: 'tech', label: 'Tech' },
  { id: 'personal', label: 'Personal' },
  { id: 'adventures', label: 'Adventures' },
] as const;

export type AboutTabId = (typeof aboutTabs)[number]['id'];

// The reference shows the stats tab (now Tech) selected.
export const defaultAboutTab: AboutTabId = 'tech';

type AboutScene = {
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    /** CSS object-position keeping the subject inside the 6:5 arch. */
    position?: string;
  };
  /** `icon` is a Fluent Emoji illustration (Microsoft, MIT). */
  equipment: readonly { label: string; className: string; icon: string }[];
};

// Artwork and equipment shown beside the player card for each tab.
export const aboutScenes: Record<AboutTabId, AboutScene> = {
  bio: {
    image: {
      src: vladMoto,
      alt: `${profile.shortName} riding his Kawasaki Ninja 500`,
      width: 1200,
      height: 1000,
    },
    equipment: [
      { label: 'Motorbike', className: 'bg-yellow', icon: motorcycleEmoji },
      { label: 'Road', className: 'bg-pink', icon: motorwayEmoji },
      { label: 'Track', className: 'bg-green', icon: chequeredFlagEmoji },
    ],
  },
  tech: {
    image: {
      src: vladTech,
      alt: `${profile.shortName} coding at his desk`,
      width: 1200,
      height: 1000,
    },
    equipment: [
      { label: 'Laptop', className: 'bg-sky', icon: laptopEmoji },
      { label: 'Coffee', className: 'bg-yellow', icon: hotBeverageEmoji },
      { label: 'Chair', className: 'bg-pink', icon: chairEmoji },
    ],
  },
  personal: {
    image: {
      src: vladPlant,
      alt: `${profile.shortName} holding a potted plant in front of a colourful wall`,
      width: 1086,
      height: 1448,
      position: '50% 11%',
    },
    equipment: [
      { label: 'Plant', className: 'bg-green', icon: pottedPlantEmoji },
      { label: 'Books', className: 'bg-yellow', icon: booksEmoji },
      { label: 'Sunglasses', className: 'bg-pink', icon: sunglassesEmoji },
    ],
  },
  adventures: {
    image: {
      src: vladAdventures,
      alt: `${profile.shortName} rock climbing`,
      width: 1086,
      height: 1448,
      position: '50% 37%',
    },
    equipment: [
      { label: 'Mountains', className: 'bg-pink', icon: mountainEmoji },
      { label: 'Boots', className: 'bg-sky', icon: hikingBootEmoji },
      { label: 'Backpack', className: 'bg-yellow', icon: backpackEmoji },
    ],
  },
};

// Shown as logos only; `name` is the accessible label and tooltip.
export const techLoadout: readonly {
  category: string;
  items: readonly { name: string; image: string }[];
}[] = [
  {
    category: 'Languages',
    items: [
      { name: 'Java', image: javaLogo },
      { name: 'Python', image: pythonLogo },
      { name: 'TypeScript', image: typescriptLogo },
    ],
  },
  {
    category: 'Frameworks',
    items: [
      { name: 'Spring Boot', image: springBootLogo },
      { name: 'Angular', image: angularLogo },
    ],
  },
  {
    category: 'Data',
    items: [
      { name: 'PostgreSQL', image: postgresqlLogo },
      { name: 'MongoDB', image: mongodbLogo },
      { name: 'Redis', image: redisLogo },
    ],
  },
  {
    category: 'Cloud',
    items: [
      { name: 'AWS', image: awsLogo },
      { name: 'Azure', image: azureLogo },
    ],
  },
  {
    category: 'DevOps',
    items: [
      { name: 'Docker', image: dockerLogo },
      { name: 'Kubernetes', image: kubernetesLogo },
    ],
  },
  {
    category: 'CI/CD',
    items: [
      { name: 'Git', image: gitLogo },
      { name: 'GitLab CI/CD', image: gitlabLogo },
    ],
  },
  {
    category: 'Quality',
    items: [
      { name: 'JUnit', image: junitLogo },
      { name: 'SonarQube', image: sonarqubeLogo },
    ],
  },
];

export type Project = {
  number: string;
  title: string;
  context: string;
  tags: readonly string[];
  image: { src: string; alt: string };
  /** Public website, opened in a new tab from the preview. */
  liveUrl?: string;
};

export const projects: readonly Project[] = [
  {
    number: '01',
    title: 'Verisure Platform',
    context: 'Securitas Direct · Backend Lead',
    tags: ['Java 17', 'Spring Boot', 'Redis', 'SonarQube'],
    liveUrl: 'https://www.verisure.es',
    image: {
      src: securitasDirectScreenshot,
      alt: 'My Verisure app by Securitas Direct on a phone, next to a Verisure alarm unit',
    },
  },
  {
    number: '02',
    title: 'MotoGP App',
    context: 'MotoGP & Estrella Galicia · Backend',
    tags: ['AWS Lambda', 'API Gateway', 'Aurora'],
    liveUrl: 'https://www.motogp.com/en/apps',
    image: {
      src: experienceNowScreenshot,
      alt: 'MotoGP app screens showing the calendar, circuit mode and live timing',
    },
  },
  {
    number: '03',
    title: 'Cierzo Sports',
    context: 'End-to-End Developer',
    tags: ['Frontend', 'Backend', 'Payments', 'Hosting'],
    liveUrl: 'https://cierzolgtb.org',
    image: {
      src: cierzolgtbScreenshot,
      alt: 'Cierzo Sports team selection page with a grid of sports photos',
    },
  },
  {
    number: '04',
    title: 'Elisa Designer',
    context: 'End-to-End Developer',
    tags: ['Frontend', 'Animations', 'Deployment'],
    liveUrl: 'https://elisandesign.com',
    image: {
      src: elisandesignScreenshot,
      alt: 'Elisa Designer portfolio home page with a bento grid layout',
    },
  },
  {
    number: '05',
    title: 'Visco',
    context: 'Web Agency · End-to-End Developer',
    tags: ['Frontend', 'Landing Page', 'Branding'],
    liveUrl: 'https://visco.uno',
    image: {
      src: viscoScreenshot,
      alt: 'Visco agency landing page with the headline “Lanza tu marca con un diseño que marca la diferencia”',
    },
  },
];
