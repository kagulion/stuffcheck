# Stuffcheck

Супер-минималистичный текстовый блог.

Построен на **Astro**, **Tailwind** и **TypeScript** с акцентом на чистую типографику и книжный формат, без лишнего визуального шума.

## Особенности

- **Светлая и тёмная темы**: поддержка `light`, `dark` и `system` с плавным переключением и нулевым мерцанием при загрузке.
- **Максимальная скорость**: статическая генерация (SSG), 100/100 Lighthouse score, мгновенная загрузка страниц.
- **Content Collections**: строгая типизация схемы статей через Zod в `src/content/config.ts`.
- **SEO & RSS**: автоматическая генерация `sitemap.xml`, `rss.xml` и мета-тегов Open Graph / Twitter.

## Структура проекта

```text
├── public/
│   └── user-files/         # Файлы для скачивания в статьях
├── src/
│   ├── components/         # UI-компоненты (Header, Footer, ArrowCard, BackToPrev и др.)
│   ├── content/
│   │   ├── blog/           # Статьи блога в формате Markdown / MDX
│   │   └── config.ts       # Схема валидации контента
│   ├── layouts/
│   │   └── PageLayout.astro# Базовый макет с фоновым градиентом
│   ├── pages/
│   │   ├── blog/           # Список статей с группировкой по годам и страница статьи
│   │   ├── index.astro     # Главная страница
│   │   ├── rss.xml.ts      # RSS-лента
│   │   └── robots.txt.ts   # Robots.txt
│   └── styles/
│       └── global.css      # Стили, семантика Tailwind и правила типографики статей
├── .prettierrc.mjs         # Конфигурация Prettier
└── tailwind.config.mjs     # Конфигурация Tailwind CSS (шрифты EB Garamond, Inter, JetBrains Mono)
```

## Быстрый старт

### Требования

- [Node.js](https://nodejs.org/) `>= 18.17.0`
- [pnpm](https://pnpm.io/) (или npm / yarn / bun)

### Команды

```bash
# 1. Установка зависимостей
pnpm install

# 2. Запуск локального сервера разработки (http://localhost:4321)
pnpm dev

# 3. Проверка типов и сборка для продакшена (директория ./dist/)
pnpm build

# 4. Локальный предпросмотр собранного сайта
pnpm preview

# 5. Проверка и авто-форматирование кода
pnpm run format      # Форматирование через Prettier
pnpm lint            # Проверка линтером ESLint
pnpm lint:fix        # Авто-исправление ошибок линтера
```

## Добавление новой статьи

Чтобы опубликовать новую статью, создайте папку с файлом `index.md` в директории `src/content/blog/`:

```markdown
---
title: 'Название статьи'
description: 'Краткое описание публикации для превью и метатегов'
date: 'Aug 27 2026'
draft: false
author: 'Имя Автора' # опционально
source: # опционально
  name: 'Источник'
  url: 'https://example.com'
---

Текст вашей статьи в формате Markdown...
```

## Лицензия

[MIT](LICENSE)
