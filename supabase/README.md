# LSMD Supabase Database

База даних аналітики ЛСМД (Лікарня Швидкої Медичної Допомоги, Чернівці).

## Технологія
- **Платформа:** Supabase
- **Регіон:** eu-west-1
- **PostgreSQL:** 17
- **Project ID:** `wnyfrckxhwujsjcfxqou`

## Структура

### Клінічні таблиці (4)
- `lsmd` (110 206) — журнал випадків з типізованими датами, класифікацією змін
- `patients_best` (72 293) — реєстр пацієнтів
- `empl` (868) — працівники
- `lsmd_doctors` (282) — міст lsmd ↔ empl

### Штатна структура (4)
- `departments` (20) — відділення з head_empl_id, staff_count, doctors_count, likari_count
- `dept_categories` (2) — клінічне / не_клінічне
- `clinical_blocks` (3) — хірургічний / терапевтичний / інтенсивна_терапія
- `dept_transfers_matrix` (143) — матриця переведень

### Чергування (2)
- `doctor_shifts` (68 299) — реконструйовані чергування 09:00→09:00
- `doctor_stats` (282) — агрегати лікарів (нічні, вихідні, смертність)

### МКХ-10 (3 основні + 17 малих)
- `icd_chapters` (22) — глави
- `icd_blocks` (220) — блок-діапазони
- `icd_10` (19 824) — повний довідник
- Малі: parasit, neoplastics, blood, endo, lor, krovoobig, resp, gastro, skin, osteo, uro, pregnan, perinatal, teratos, deviation, traum, accidental

### Операції (1)
- `operations` (7 320) — унікальні комбінації ACHI-кодів

## VIEW
- `interventions` — оперативні втручання
- `lsmd_transfers` — переведення
- `lsmd_deaths_24h` — смерті в першу добу
- `doctor_patient_links` — зв'язок пацієнт-лікар
- `doctor_discharges` — виписки лікаря
- `doctor_diagnoses` — діагнози лікаря

## Безпека
- RLS увімкнено на більшості таблиць
- Контактні дані пацієнтів та конкретні випадки **НЕ зберігаються в репо**
- Тільки структура схеми, міграції, скрипти

## Етапи розробки
1. ✅ Очистка даних (UTF-8, дублі, типізація)
2. ✅ Нормалізація схеми (FK, категорії, блоки)
3. ✅ Аналітичні VIEW + матеріалізовані агрегати
4. 🚧 Materialized Views для дашборду
5. 🚧 Cron Jobs (pg_cron)
6. 🚧 RLS політики
7. 🚧 Edge Functions / PostgREST API
8. 🚧 Realtime для живого моніторингу
