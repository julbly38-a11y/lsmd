# Міграції

SQL міграції для бази даних `wnyfrckxhwujsjcfxqou`.

Застосовуються через Supabase MCP / Supabase CLI.

## Порядок

1. `01_initial_schema.sql` — базова схема (lsmd, patients_best, empl)
2. `02_normalize_dates.sql` — типізовані дати, length_of_stay
3. `03_icd_hierarchy.sql` — icd_chapters → icd_blocks → icd_10
4. `04_departments_structure.sql` — categories, blocks, FK
5. `05_doctor_shifts.sql` — чергування з doctor_id
6. `06_operations.sql` — таблиця операцій з FK
7. `07_views_analytics.sql` — VIEW для аналітики
8. `08_shift_classification.sql` — нічні/денні/вихідні
9. `09_doctor_stats.sql` — агрегат-таблиця
