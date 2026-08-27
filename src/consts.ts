import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "stuffcheck",
  EMAIL: "kagu9000@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_WORKS_ON_HOMEPAGE: 2,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Главная",
  DESCRIPTION: "Минималистичный блог об AI-разработке, архитектуре и веб-интерфейсах.",
};

export const BLOG: Metadata = {
  TITLE: "Блог",
  DESCRIPTION: "Статьи, практические руководства и инженерные заметки.",
};

export const WORK: Metadata = {
  TITLE: "Опыт",
  DESCRIPTION: "Опыт работы, проекты и роли.",
};

export const PROJECTS: Metadata = {
  TITLE: "Проекты",
  DESCRIPTION: "Коллекция проектов с исходным кодом и демо.",
};

export const SOCIALS: Socials = [
  {
    NAME: "twitter-x",
    HREF: "https://twitter.com/markhorn_dev",
  },
  {
    NAME: "github",
    HREF: "https://github.com/markhorn-dev",
  },
  {
    NAME: "linkedin",
    HREF: "https://www.linkedin.com/in/markhorn-dev",
  },
];
