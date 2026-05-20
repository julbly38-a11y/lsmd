# LSMD Healthcare Code Library — overview

> Адаптовано з `README.md` Google Drive бібліотеки
> ([папка LSMD Healthcare](https://drive.google.com/drive/folders/15ZMdp6LLSUrYdxaL16ac3AVqDE9IS2lA))

## Огляд проєкту

Бібліотека успішних розробок та рішень для медичних інформаційних систем ЛСМД (Лікарні Швидкої Медичної Допомоги, Чернівці).

## Головні компоненти

### 1. Next.js Applications
- **Hospital Agent** — AI-чат для запитів до медичної БД (репо `julbly38-a11y/hospital-agent`)
- Multi-provider AI: Groq · OpenAI · Anthropic · Gemini
- Real-time SQL генерація та виконання
- Деплой на Netlify з environment variables

### 2. Supabase & PostgreSQL
- **27 аналітичних View** для медичної статистики
- **МКХ-10 ієрархія** (2,047 кодів українською)
- SQL функції для безпечного виконання запитів
- RLS політики та безпека даних

### 3. Python Scripts & Utilities
- Скрипти для обробки медичних даних
- ZIP архіви та файлова система
- GitHub API інтеграція
- Парсинг JSON/CSV/Excel

### 4. Data Analytics & BI
- **Looker Studio інтеграція** з PostgreSQL
- 9 сторінок дашборду
- Custom SQL запити для звітів
- Connection pooler eu-west-1

### 5. Templates & Boilerplates
- Готові шаблони для медичних проєктів
- Docker / .env / requirements.txt

## Архітектура

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Routes     │    │    Database     │
│   (Next.js)     │◄──►│  (Serverless)    │◄──►│   (Supabase)    │
│ • React UI      │    │ • Claude API     │    │ • PostgreSQL 17 │
│ • AI providers  │    │ • SQL execution  │    │ • 27 Views      │
│ • Chat UI       │    │ • Error handling │    │ • МКХ-10        │
└─────────────────┘    └──────────────────┘    └─────────────────┘
        ▲                       ▲                        ▲
        │                       │                        │
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Deployment    │    │    Analytics     │    │    Security     │
│   (Netlify)     │    │    (Looker)      │    │   (RLS + SSL)   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## API — `POST /api/ask`

```json
// Request
{
  "question": "Скільки пацієнтів у травматології?",
  "provider": "anthropic",
  "history": []
}

// Response
{
  "sql": "SELECT COUNT(*) FROM v_department_full WHERE відділення ILIKE '%травма%'",
  "explanation": "Запит підраховує кількість пацієнтів...",
  "rows": [{"count": 1689}],
  "provider": "anthropic"
}
```

## Швидкий старт — Hospital Agent

```bash
git clone https://github.com/julbly38-a11y/hospital-agent.git
cd hospital-agent
npm install
cp .env.example .env.local
# Заповни ANTHROPIC_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_KEY
npm run dev
```

## Безпека

- **RLS (Row Level Security)** на всіх таблицях
- **SSL підключення** до бази даних
- **Environment variables** для API ключів
- **Service role** доступ (не anon)
- **CORS налаштування** для API routes
- **SQL injection захист** через параметризовані запити

## Контакт

- Email: julbly38@gmail.com
- Supabase: Dashboard (project `wnyfrckxhwujsjcfxqou`)
- Deploy: Netlify Dashboard

---

**Версія:** 1.0.0 · **Ліцензія:** Private Use Only · **Оновлення:** 2026-05-07
