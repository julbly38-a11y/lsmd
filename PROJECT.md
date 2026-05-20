# ЛСМД — Аналітична система лікарні

Система аналітики для Лікарні Швидкої Медичної Допомоги (Чернівці).

## Структура проєкту

```
lsmd/
├── database/        # Схема БД, міграції, VIEW
├── functions/       # Edge Functions (REST API)
├── scripts/         # Python утиліти
├── docs/            # Документація етапів
└── (web)            # Сайт (Next.js / HTML)
```

## Стек

- **БД:** Supabase (PostgreSQL 17), project `wnyfrckxhwujsjcfxqou`
- **API:** Edge Functions (Deno/TypeScript) + PostgREST
- **Безпека:** RLS з 4 ролями (admin/head_dept/doctor/viewer)
- **Автоматизація:** pg_cron (нічне оновлення MView)

## Статус етапів

| Етап | Статус |
|---|---|
| Очистка даних (UTF-8, дублі, типізація) | ✅ |
| Нормалізація схеми (FK, категорії, блоки) | ✅ |
| Ієрархія МКХ-10 (22 глави) | ✅ |
| Аналітичні VIEW | ✅ |
| Materialized Views | ✅ |
| Cron Jobs | ✅ |
| RLS політики | ✅ протестовано |
| Edge Functions | ✅ 3 функції |
| Геокодування localities | 🚧 16/2618 |
| Realtime | ⏳ план |

## Деталі

Схема БД: [`database/README.md`](database/README.md)  
Роадмеп: [`docs/supabase_roadmap.md`](docs/supabase_roadmap.md)

⚠️ Дані пацієнтів та API-ключі НЕ зберігаються в репо.
