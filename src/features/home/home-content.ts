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
import { localized, type Localized } from '@/lib/i18n/locale';

// Content follows Vlad's CV. Copy that changes with the language is written
// per locale, either as a whole block or as a single `{ en, es }` value. The
// Spanish wording follows the Spanish CV, which keeps the role and job titles
// in English.
export const profile = {
  shortName: 'Vlad Dinca',
  role: 'Senior Software Engineer',
  location: { en: 'Zaragoza, Spain', es: 'Zaragoza, España' },
  available: { en: 'Available soon', es: 'Disponible pronto' },
  email: 'mdumitruvlad@gmail.com',
} as const;

// index.html carries the English values for crawlers that do not run
// JavaScript; the home page applies these per locale.
export const pageMetadata = localized({
  en: {
    description:
      'Vlad Dumitru Dinca, Senior Software Engineer in Zaragoza, Spain. Java and Spring Boot backend, microservices, Kafka, AWS and Kubernetes. See my projects and get in touch.',
    canonicalUrl: 'https://me.vladicode.com/',
  },
  es: {
    description:
      'Vlad Dumitru Dinca, Senior Software Engineer en Zaragoza, España. Backend con Java y Spring Boot, microservicios, Kafka, AWS y Kubernetes. Mira mis proyectos y ponte en contacto.',
    canonicalUrl: 'https://me.vladicode.com/es',
  },
});

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
export const valuesTicker = localized<readonly string[]>({
  en: [
    'Clean code',
    'SOLID',
    'Tests that matter',
    'API-first',
    'Fast under load',
    'Mentoring',
    'Event-driven',
  ],
  es: [
    'Código limpio',
    'SOLID',
    'Tests que importan',
    'API-first',
    'Rápido bajo carga',
    'Mentoría',
    'Orientado a eventos',
  ],
});

export const hobbiesTicker = localized<readonly string[]>({
  en: [
    'Climbing',
    'Hiking',
    'Kawasaki Ninja 500',
    'Classic literature',
    'Walden',
    'Gym',
    'Plants & coffee',
  ],
  es: [
    'Escalada',
    'Senderismo',
    'Kawasaki Ninja 500',
    'Literatura clásica',
    'Walden',
    'Gimnasio',
    'Plantas y café',
  ],
});

export const navigationItems: readonly {
  label: Localized<string>;
  href: string;
}[] = [
  { label: { en: 'Home', es: 'Inicio' }, href: '#home' },
  { label: { en: 'Projects', es: 'Proyectos' }, href: '#projects' },
  { label: { en: 'About', es: 'Sobre mí' }, href: '#about' },
  { label: { en: 'Contact', es: 'Contacto' }, href: '#contact' },
];

// About me player card.
export type HighlightColor = 'yellow' | 'pink' | 'green' | 'sky';

/** Plain text, or a phrase underlined with a marker of the given colour. */
export type BioSegment = string | { text: string; highlight: HighlightColor };

type BioText = readonly (readonly BioSegment[])[];

// Facts from Vlad's CV. The first paragraph is the lead.
export const aboutBio = localized<BioText>({
  en: [
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
  ],
  es: [
    [
      '¡Hola! Soy Vlad, ',
      { text: 'ingeniero backend Java', highlight: 'yellow' },
      ' en ',
      { text: 'Zaragoza, España', highlight: 'sky' },
      '.',
    ],
    [
      'Desde 2020 he construido y modernizado plataformas de alto tráfico: un servicio de Renfe que usan ',
      { text: '500.000 pasajeros al día', highlight: 'green' },
      ', pipelines de imágenes aéreas para el Geoportail francés y, en Securitas Direct, la migración de una plataforma heredada a ',
      { text: 'microservicios con Java 17', highlight: 'pink' },
      '.',
    ],
    [
      'Soy una persona ',
      { text: 'muy creativa', highlight: 'yellow' },
      ' y me encantan los ',
      { text: 'proyectos personales', highlight: 'green' },
      '. Con los años he creado webs y plataformas para amigos, como ',
      { text: 'Elisandesign', highlight: 'sky' },
      ', y para fundaciones, como ',
      { text: 'Cierzo', highlight: 'sky' },
      '.',
    ],
    [
      'Cuando cierro el portátil, estoy ',
      { text: 'en la moto, escalando o con un libro', highlight: 'pink' },
      '.',
    ],
  ],
});

// Closes the bio, right above the social profile buttons.
export const aboutBioInvite = localized<readonly BioSegment[]>({
  en: [
    'I ',
    { text: 'love meeting new people', highlight: 'pink' },
    ', so now that you’re here, don’t hesitate to say hi:',
  ],
  es: [
    'Me ',
    { text: 'encanta conocer gente nueva', highlight: 'pink' },
    ', así que ahora que estás aquí, no dudes en saludarme:',
  ],
});

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
// Direct's Java microservices are counted as Spring Boot too. Angular,
// MongoDB and GitLab CI/CD also count Securitas Direct, as the user asked
// for at least three years of each.
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
    jobs: ['geoportail', 'securitas'],
  },
  {
    name: 'MongoDB',
    jobs: ['geoportail', 'securitas'],
  },
  {
    name: 'AWS',
    jobs: ['geoportail'],
  },
  {
    name: 'GitLab CI/CD',
    jobs: ['geoportail', 'securitas'],
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
export const aboutPersonal = localized<BioText>({
  en: [
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
  ],
  es: [
    [
      'Tengo demasiados hobbies. Ahora mismo me ha dado por las ',
      { text: 'motos', highlight: 'sky' },
      ', pero he probado un poco de todo, y el ',
      { text: 'gimnasio y la escalada', highlight: 'green' },
      ' nunca salen de la lista.',
    ],
    [
      'He pasado los últimos años convirtiendo una antigua tienda en mi casa: ',
      {
        text: 'un loft que mis amigos envidian sin disimulo',
        highlight: 'yellow',
      },
      ', lleno de ',
      { text: 'plantas', highlight: 'green' },
      '. Simplemente no puedo dejar de comprarlas.',
    ],
    [
      'Para descansar de las pantallas saco mi lado artístico. Me encantaría aprender a dibujar, pero de momento ',
      { text: 'leo', highlight: 'pink' },
      ', que me relaja como nada: ',
      { text: 'literatura clásica y ensayo', highlight: 'pink' },
      '. Algún día serán un proyecto propio, mi biblioteca.',
    ],
  ],
});

// Book on the Personal tab.
export const aboutReading = {
  title: 'El Aleph',
  author: 'Jorge Luis Borges',
} as const;

// Written from the user's own description of their outdoor side. The Spanish
// text uses the titles published in Spain.
export const aboutAdventuresText = localized<BioText>({
  en: [
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
  ],
  es: [
    [
      'Una de mis películas favoritas es ',
      { text: 'Hacia rutas salvajes', highlight: 'green' },
      '. Después leí el libro, y está lleno de otros libros: ensayos como ',
      { text: 'Walden', highlight: 'yellow' },
      ', que se convirtió en mi favorito, y clásicos como ',
      { text: 'La llamada de lo salvaje', highlight: 'pink' },
      ' o ',
      { text: 'Huckleberry Finn', highlight: 'pink' },
      '. Así empecé a leer.',
    ],
    [
      'Esa cadena de descubrimientos también me acercó a la ',
      { text: 'naturaleza', highlight: 'green' },
      ' y despertó mi ',
      { text: 'espíritu aventurero', highlight: 'sky' },
      ': las ganas de salir ahí fuera a explorar.',
    ],
    [
      'No me malinterpretes, me ',
      { text: 'encanta el software', highlight: 'yellow' },
      '. Pero pasar 8 horas al día sentado, a veces 12, se hace pesado cuando otras 8 se van en dormir. Por eso necesito los ',
      { text: 'deportes extremos', highlight: 'pink' },
      ' y una dosis de emociones fuertes de vez en cuando, y por eso la moto.',
    ],
    [
      'Hace poco un amigo y yo nos compramos a medias una ',
      { text: 'Kawasaki Ninja 250R', highlight: 'sky' },
      ', y nos estamos metiendo en el mundo del circuito: aprendiendo a rodar y a tumbar la moto en las curvas en el ',
      { text: 'Circuito Internacional de Zuera', highlight: 'green' },
      '. Intento documentarlo todo en Instagram.',
    ],
  ],
});

const instagramHref =
  socialLinks.find((link) => link.label === 'Instagram')?.href ?? '';

// Calls to action under the panels. The tech blog and the library do not
// exist yet, and Adventures points to Instagram until the mountain blog does;
// an empty href renders the button as "coming soon".
export const aboutPanelLinks = {
  tech: {
    label: { en: 'Read my tech blog', es: 'Lee mi blog técnico' },
    href: '',
  },
  personal: {
    label: { en: 'Visit my library', es: 'Visita mi biblioteca' },
    href: '',
  },
  adventures: {
    label: { en: 'Follow on Instagram', es: 'Sígueme en Instagram' },
    href: instagramHref,
  },
} as const satisfies Record<string, { label: Localized<string>; href: string }>;

export const aboutTabs = [
  { id: 'bio', label: { en: 'Bio', es: 'Bio' } },
  { id: 'tech', label: { en: 'Tech', es: 'Tech' } },
  { id: 'personal', label: { en: 'Personal', es: 'Personal' } },
  { id: 'adventures', label: { en: 'Adventures', es: 'Aventuras' } },
] as const satisfies readonly { id: string; label: Localized<string> }[];

export type AboutTabId = (typeof aboutTabs)[number]['id'];

// The reference shows the stats tab (now Tech) selected.
export const defaultAboutTab: AboutTabId = 'tech';

type AboutScene = {
  image: {
    src: string;
    alt: Localized<string>;
    width: number;
    height: number;
    /** CSS object-position keeping the subject inside the 6:5 arch. */
    position?: string;
  };
  /** `icon` is a Fluent Emoji illustration (Microsoft, MIT). */
  equipment: readonly {
    label: Localized<string>;
    className: string;
    icon: string;
  }[];
};

// Artwork and equipment shown beside the player card for each tab. Spanish
// equipment labels stay as short as the English ones so the squares keep
// their width.
export const aboutScenes: Record<AboutTabId, AboutScene> = {
  bio: {
    image: {
      src: vladMoto,
      alt: {
        en: `${profile.shortName} riding his Kawasaki Ninja 500`,
        es: `${profile.shortName} montando en su Kawasaki Ninja 500`,
      },
      width: 1200,
      height: 1000,
    },
    equipment: [
      {
        label: { en: 'Motorbike', es: 'Moto' },
        className: 'bg-yellow',
        icon: motorcycleEmoji,
      },
      {
        label: { en: 'Road', es: 'Carretera' },
        className: 'bg-pink',
        icon: motorwayEmoji,
      },
      {
        label: { en: 'Track', es: 'Circuito' },
        className: 'bg-green',
        icon: chequeredFlagEmoji,
      },
    ],
  },
  tech: {
    image: {
      src: vladTech,
      alt: {
        en: `${profile.shortName} coding at his desk`,
        es: `${profile.shortName} programando en su escritorio`,
      },
      width: 1200,
      height: 1000,
    },
    equipment: [
      {
        label: { en: 'Laptop', es: 'Portátil' },
        className: 'bg-sky',
        icon: laptopEmoji,
      },
      {
        label: { en: 'Coffee', es: 'Café' },
        className: 'bg-yellow',
        icon: hotBeverageEmoji,
      },
      {
        label: { en: 'Chair', es: 'Silla' },
        className: 'bg-pink',
        icon: chairEmoji,
      },
    ],
  },
  personal: {
    image: {
      src: vladPlant,
      alt: {
        en: `${profile.shortName} holding a potted plant in front of a colourful wall`,
        es: `${profile.shortName} sujetando una planta en maceta delante de una pared de colores`,
      },
      width: 1086,
      height: 1448,
      position: '50% 11%',
    },
    equipment: [
      {
        label: { en: 'Plant', es: 'Planta' },
        className: 'bg-green',
        icon: pottedPlantEmoji,
      },
      {
        label: { en: 'Books', es: 'Libros' },
        className: 'bg-yellow',
        icon: booksEmoji,
      },
      {
        label: { en: 'Sunglasses', es: 'Gafas' },
        className: 'bg-pink',
        icon: sunglassesEmoji,
      },
    ],
  },
  adventures: {
    image: {
      src: vladAdventures,
      alt: {
        en: `${profile.shortName} rock climbing`,
        es: `${profile.shortName} escalando`,
      },
      width: 1086,
      height: 1448,
      position: '50% 37%',
    },
    equipment: [
      {
        label: { en: 'Mountains', es: 'Montañas' },
        className: 'bg-pink',
        icon: mountainEmoji,
      },
      {
        label: { en: 'Boots', es: 'Botas' },
        className: 'bg-sky',
        icon: hikingBootEmoji,
      },
      {
        label: { en: 'Backpack', es: 'Mochila' },
        className: 'bg-yellow',
        icon: backpackEmoji,
      },
    ],
  },
};

// Shown as logos only; `name` is the accessible label and tooltip.
export const techLoadout: readonly {
  category: Localized<string>;
  items: readonly { name: string; image: string }[];
}[] = [
  {
    category: { en: 'Languages', es: 'Lenguajes' },
    items: [
      { name: 'Java', image: javaLogo },
      { name: 'Python', image: pythonLogo },
      { name: 'TypeScript', image: typescriptLogo },
    ],
  },
  {
    category: { en: 'Frameworks', es: 'Frameworks' },
    items: [
      { name: 'Spring Boot', image: springBootLogo },
      { name: 'Angular', image: angularLogo },
    ],
  },
  {
    category: { en: 'Data', es: 'Datos' },
    items: [
      { name: 'PostgreSQL', image: postgresqlLogo },
      { name: 'MongoDB', image: mongodbLogo },
      { name: 'Redis', image: redisLogo },
    ],
  },
  {
    category: { en: 'Cloud', es: 'Cloud' },
    items: [
      { name: 'AWS', image: awsLogo },
      { name: 'Azure', image: azureLogo },
    ],
  },
  {
    category: { en: 'DevOps', es: 'DevOps' },
    items: [
      { name: 'Docker', image: dockerLogo },
      { name: 'Kubernetes', image: kubernetesLogo },
    ],
  },
  {
    category: { en: 'CI/CD', es: 'CI/CD' },
    items: [
      { name: 'Git', image: gitLogo },
      { name: 'GitLab CI/CD', image: gitlabLogo },
    ],
  },
  {
    category: { en: 'Quality', es: 'Calidad' },
    items: [
      { name: 'JUnit', image: junitLogo },
      { name: 'SonarQube', image: sonarqubeLogo },
    ],
  },
];

export type Project = {
  number: string;
  /** Product names, the same in every language. */
  title: string;
  context: Localized<string>;
  tags: Localized<readonly string[]>;
  image: { src: string; alt: Localized<string> };
  /** Public website, opened in a new tab from the preview. */
  liveUrl?: string;
};

// Spanish contexts follow the Spanish CV ("Desarrollo integral").
export const projects: readonly Project[] = [
  {
    number: '01',
    title: 'Verisure Platform',
    context: {
      en: 'Securitas Direct · Backend Lead',
      es: 'Securitas Direct · Backend Lead',
    },
    tags: {
      en: ['Java 17', 'Spring Boot', 'Redis', 'SonarQube'],
      es: ['Java 17', 'Spring Boot', 'Redis', 'SonarQube'],
    },
    liveUrl: 'https://www.verisure.es',
    image: {
      src: securitasDirectScreenshot,
      alt: {
        en: 'My Verisure app by Securitas Direct on a phone, next to a Verisure alarm unit',
        es: 'La app My Verisure de Securitas Direct en un móvil, junto a una central de alarma Verisure',
      },
    },
  },
  {
    number: '02',
    title: 'MotoGP App',
    context: {
      en: 'MotoGP & Estrella Galicia · Backend',
      es: 'MotoGP & Estrella Galicia · Backend',
    },
    tags: {
      en: ['AWS Lambda', 'API Gateway', 'Aurora'],
      es: ['AWS Lambda', 'API Gateway', 'Aurora'],
    },
    liveUrl: 'https://www.motogp.com/en/apps',
    image: {
      src: experienceNowScreenshot,
      alt: {
        en: 'MotoGP app screens showing the calendar, circuit mode and live timing',
        es: 'Pantallas de la app de MotoGP con el calendario, el modo circuito y los tiempos en directo',
      },
    },
  },
  {
    number: '03',
    title: 'Cierzo Sports',
    context: { en: 'End-to-End Developer', es: 'Desarrollo integral' },
    tags: {
      en: ['Frontend', 'Backend', 'Payments', 'Hosting'],
      es: ['Frontend', 'Backend', 'Pagos', 'Alojamiento'],
    },
    liveUrl: 'https://cierzolgtb.org',
    image: {
      src: cierzolgtbScreenshot,
      alt: {
        en: 'Cierzo Sports team selection page with a grid of sports photos',
        es: 'Página de selección de equipos de Cierzo Sports con una cuadrícula de fotos deportivas',
      },
    },
  },
  {
    number: '04',
    title: 'Elisa Designer',
    context: { en: 'End-to-End Developer', es: 'Desarrollo integral' },
    tags: {
      en: ['Frontend', 'Animations', 'Deployment'],
      es: ['Frontend', 'Animaciones', 'Despliegue'],
    },
    liveUrl: 'https://elisandesign.com',
    image: {
      src: elisandesignScreenshot,
      alt: {
        en: 'Elisa Designer portfolio home page with a bento grid layout',
        es: 'Página de inicio del portfolio de Elisa Designer con una cuadrícula bento',
      },
    },
  },
  {
    number: '05',
    title: 'Visco',
    context: {
      en: 'Web Agency · End-to-End Developer',
      es: 'Agencia web · Desarrollo integral',
    },
    tags: {
      en: ['Frontend', 'Landing Page', 'Branding'],
      es: ['Frontend', 'Landing Page', 'Branding'],
    },
    liveUrl: 'https://visco.uno',
    image: {
      src: viscoScreenshot,
      alt: {
        en: 'Visco agency landing page with the headline “Lanza tu marca con un diseño que marca la diferencia”',
        es: 'Landing page de la agencia Visco con el titular “Lanza tu marca con un diseño que marca la diferencia”',
      },
    },
  },
];
