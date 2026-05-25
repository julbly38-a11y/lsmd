# LSMD Code Library — каталог

> Скорочена копія `CATALOG-v4-full.md` з Google Drive
> ([папка LSMD Healthcare](https://drive.google.com/drive/folders/15ZMdp6LLSUrYdxaL16ac3AVqDE9IS2lA))
> Усі коди протестовані ✅ · Оновлено 2026-05-07 (v4)

Це referenсе для дизайнерів: знати які view, функції, скрипти існують у production — щоб дашборди й маркетинг копія не вигадували можливостей продукту.

---

## 🗄️ SQL (Supabase PostgreSQL) — 22 артефакти

### Функції
| # | Код | Опис |
|---|---|---|
| 1 | `search_diagnosis_by_code()` | Пошук ICD-10 по коду |
| 2 | `search_diagnosis_by_description()` | Пошук ICD-10 по опису |
| 3 | `search_icd10_full()` | Повнотекстовий пошук з фільтром |
| 13 | `execute_sql()` | Безпечне виконання SELECT |
| 15 | `populate_icd10_from_encounters()` | Автозаповнення ієрархії МКХ-10 |
| 18 | `search_icd10()` | Пошук захворювань по назві |

### Аналітичні Views
| # | Код | Опис |
|---|---|---|
| 5 | `grey_data_with_icd10` | Дані пацієнтів + ICD-10 коди |
| 7 | `cardio_vascular_detailed` | Кардіоваскулярні захворювання |
| 8 | `cerebro_vascular_detailed` | Цереброваскулярні захворювання |
| 9 | `clinical_type_summary` | Агрегація клінічних типів |
| 11 | `top_comorbidities` | Топ комбінацій діагнозів |
| 12 | `department_quality_metrics` | Якість по відділеннях |
| 16 | `v_icd10_search` | Пошук по ієрархії з використанням |
| 17 | `v_icd10_category_stats` | Статистика по категоріях МКХ |

### Looker-specific (з Custom Query)
- `v_repeat_hosp` — повторні госпіталізації
- `v_readmissions` — readmissions ≤30 днів
- `v_night_shifts` — нічні чергування
- `v_admissions_daily` — щоденні надходження
- `v_schedule_grid` — графік чергувань

### Таблиці-довідники
| # | Код | Опис |
|---|---|---|
| 4 | `mkh_to_icd10_mapping` | Маппінг МКХ → ICD-10 (31 код) |
| 6 | `universal_disease_classification` | Універсальна класифікація |
| 10 | `comorbidity_patterns` | Аналіз супутніх діагнозів |
| 19 | `department_heads` | Маппінг 13 відділень → завідувачі |

### Безпека / Інфраструктура
- `security_invoker` на всіх VIEW — RLS через invoker
- `looker_ro` — Read-only роль для Looker Studio
- `archive` schema — Архівація старих таблиць
- RLS policies — Row Level Security на основних таблицях

---

## 🐍 Python — 4 класи

| Клас | Призначення |
|---|---|
| `DepositSignClient` | Підписання документів (DepositSign API) |
| `EHealthClient` | Витяг медичних даних eHealth |
| `DepositSignSigningClient` | Підписання для ЛСМД |
| `LSMDDataProcessor` | Обробка медичних даних, експорт CSV/Excel/JSON |

---

## 🌐 JavaScript / Next.js — 3 артефакти

| Код | Файл |
|---|---|
| Multi-provider AI API | `api/ask.js` |
| Chat UI | `pages/index.js` |
| Netlify config | `netlify.toml` |

---

## 📊 Looker Studio — 6 артефактів

| # | Опис | Деталі |
|---|---|---|
| 1 | 86 Calculated Fields | усі 26 view → обчислювальні поля |
| 2 | 13 профільних аналізів | 7 KPI + топ-7 діагнозів на відділення |
| 3 | 5 PostgreSQL custom queries | `v_repeat_hosp`, `v_readmissions`, `v_night_shifts`, `v_admissions_daily`, `v_schedule_grid` |
| 4 | 54 нозологічних прапорці | Профільні діагнози по відділенню |
| 5 | 10 нозологічних груп | Donut chart groups |
| 6 | **9 сторінок дашборду** | **Загальна · Відділення · Діагнози · Лікарі · Пацієнти · Географія · Піки · Нічні · Приймальне** |

Ці 9 сторінок Looker-дашборду повністю відображені у `ui_kits/dashboard/` цієї дизайн-системи.

---

## 🔗 Інтеграції — production

| Сервіс | Статус | Адреса / нотатки |
|---|---|---|
| Supabase PostgreSQL | ✅ підключено | 21 таблиця + 27 views, eu-west-1 pooler |
| Looker Studio | ✅ підключено | Connection pooler eu-west-1 + Google Sheets |
| GitHub | ✅ підключено | `julbly38-a11y/lsmd` (design system) + `julbly38-a11y/hospital-agent` (AI chat) |
| Netlify | ✅ деплоїться | `relaxed-heliotrope-2068c2.netlify.app` |
| DepositSign | ✅ токен активний | Дійсний до 18.01.2027 |
| eHealth (Централь 103) | ✅ є доступ | Структура · Персонал · Форма 110 |

---

## 📁 Структура папок у Drive

| Папка | Файли |
|---|---|
| **1️⃣ Next.js Applications** | `package.json`, `api-ask.js` |
| **2️⃣ Supabase & PostgreSQL** | `verified-working-sql-codes.sql`, `healthcare-analytics-views.sql`, `icd10-hierarchy.sql`, `icd10-additional-views-functions.sql`, `department-heads-mapping.sql`, `looker-readonly-user.sql`, `archive-schema-cleanup.sql`, `rls-security-policies.sql` |
| **3️⃣ Python Scripts & Utilities** | `verified-working-python-codes.py`, `lsmd_data_utils.py` |
| **4️⃣ Data Analytics & BI** | `looker-studio-integration.md`, `looker-calculated-fields-ALL-views.md`, `looker-departments-nosology.md`, `looker-separate-postgresql-sources.md` |
| **5️⃣ Templates & Boilerplates** | `project-templates.md` (Docker, .env, requirements.txt шаблони) |

**Підсумок:** 20 файлів · 230+ елементів коду.

---

## 🛡️ Технічний стек

| Компонент | Технологія | Версія |
|---|---|---|
| Frontend | Next.js | 14.2.0 |
| Runtime | React | 18.3.0 |
| Database | PostgreSQL | 17.6 |
| Platform | Supabase | Cloud |
| Deploy | Netlify | SaaS |
| AI | Claude/GPT/Gemini/Groq | API |
| Analytics | Looker Studio | Cloud |
