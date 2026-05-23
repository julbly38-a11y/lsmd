# ЛСМД Python Toolkit

Інструменти для роботи з базою даних лікарні через psycopg (прямий PostgreSQL).

## Встановлення

```bash
pip install "psycopg[binary]>=3.2.0" python-dotenv requests
```

## Налаштування

1. Скопіюй `.env.example` як `.env`:
```bash
cp .env.example .env
```

2. Вставte пароль БД (Supabase Dashboard → Settings → Database → Connection string):
```
SUPABASE_DB_URL=postgresql://postgres:[ТВІЙ_ПАРОЛЬ]@db.wnyfrckxhwujsjcfxqou.supabase.co:5432/postgres
```

## Скрипти

| Файл | Призначення |
|------|------------|
| `lsmd_db.py` | Ядро підключення (query, execute, table_count) |
| `analytics.py` | Готові аналітичні запити (захворюваність, лікарі, відділення) |
| `backup.py` | Бекап таблиць у CSV перед небезпечними операціями |
| `geocode_localities.py` | Геокодування населених пунктів через OSM Nominatim |

## Приклади

### Перевірка з'єднання
```bash
python lsmd_db.py
```

### Аналітика
```python
from analytics import morbidity_by_chapter, doctor_profile, top_doctors

# Захворюваність по главах МКХ-10
for r in morbidity_by_chapter()[:5]:
    print(f"{r['letters']:5} {r['chapter'][:40]:40} {r['pct']}%")

# Профіль лікаря
profile = doctor_profile(912)
print(profile['stats'])

# Топ лікарів за випадками
for doc in top_doctors(limit=10):
    print(f"{doc['full_name']}: {doc['total_cases']} випадків")
```

### Бекап (перед небезпечними операціями)
```bash
python backup.py                 # ключові таблиці
python backup.py --all           # усі таблиці
python backup.py --table lsmd    # одна таблиця
```

### Геокодування
```bash
python geocode_localities.py
```

## Документація

Повна структура БД та правила безпеки: [docs/DATABASE.md](../docs/DATABASE.md)
