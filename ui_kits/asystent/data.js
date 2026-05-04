// Canned questions & fake responses — no real network.
window.LSMD_DATA = {
  examples: [
    'Загальна статистика лікарні',
    'Показники по всіх відділеннях',
    'Пікові навантаження по годинах',
    'Топ 10 діагнозів за кількістю випадків',
    'Летальність по відділеннях',
    'Скільки пролікувала доктор Дубець за грудень?',
    'Повторні госпіталізації — топ пацієнти',
    'Навантаження по днях тижня',
  ],

  providers: [
    { id: 'groq', name: 'Groq', label: 'безкоштовно', free: true },
    { id: 'gemini', name: 'Gemini', label: 'безкоштовно', free: true },
    { id: 'openai', name: 'OpenAI', label: '$0.15/M', free: false },
    { id: 'anthropic', name: 'Anthropic', label: '$3/M', free: false },
  ],

  // (question text → response shape)
  responses: {
    'Загальна статистика лікарні': {
      explanation: 'Зведені показники по лікарні за 2025 рік.',
      sql: "SELECT COUNT(*) AS всього,\n       COUNT(*) FILTER (WHERE hosp_type='екстрена') AS екстрених,\n       ROUND(100.0*COUNT(*) FILTER (WHERE discharge_status='Помер')/COUNT(*),1) AS летальність_відсоток,\n       ROUND(AVG(bed_days),1) AS середній_ліжкодень\nFROM encounters",
      rows: [{ всього: 20491, екстрених: 3128, летальність_відсоток: 2.4, середній_ліжкодень: 7.3 }],
    },
    'Показники по всіх відділеннях': {
      explanation: 'Кількість госпіталізацій, летальність та середній ліжкодень по 13 відділеннях, відсортовано за кількістю.',
      sql: "SELECT d.department_name AS відділення,\n       COUNT(*) AS всього,\n       ROUND(100.0*COUNT(*) FILTER (WHERE e.discharge_status='Помер')/COUNT(*),1) AS летальність_відсоток,\n       ROUND(AVG(e.bed_days),1) AS середній_ліжкодень\nFROM encounters e\nJOIN departments d ON e.dept_admission_id = d.department_id\nGROUP BY d.department_name\nORDER BY всього DESC\nLIMIT 50",
      rows: [
        { відділення: 'Терапевтичне', всього: 4218, летальність_відсоток: 1.8, середній_ліжкодень: 8.4 },
        { відділення: 'Хірургічне', всього: 3812, летальність_відсоток: 3.2, середній_ліжкодень: 6.9 },
        { відділення: 'Кардіологічне', всього: 2941, летальність_відсоток: 4.1, середній_ліжкодень: 9.2 },
        { відділення: 'Неврологічне', всього: 2103, летальність_відсоток: 2.7, середній_ліжкодень: 10.8 },
        { відділення: 'Травматологічне', всього: 1887, летальність_відсоток: 1.4, середній_ліжкодень: 5.6 },
        { відділення: 'Гінекологічне', всього: 1402, летальність_відсоток: 0.2, середній_ліжкодень: 4.1 },
        { відділення: 'Урологічне', всього: 1184, летальність_відсоток: 0.9, середній_ліжкодень: 5.8 },
        { відділення: 'ЛОР', всього: 1021, летальність_відсоток: 0.1, середній_ліжкодень: 3.7 },
        { відділення: 'Реанімаційне', всього: 612, летальність_відсоток: 12.4, середній_ліжкодень: 4.9 },
        { відділення: 'Інфекційне', всього: 487, летальність_відсоток: 1.0, середній_ліжкодень: 6.3 },
        { відділення: 'Офтальмологічне', всього: 412, летальність_відсоток: 0.0, середній_ліжкодень: 3.1 },
        { відділення: 'Пульмонологічне', всього: 287, летальність_відсоток: 5.6, середній_ліжкодень: 11.4 },
        { відділення: 'Гастроентерологічне', всього: 125, летальність_відсоток: 1.6, середній_ліжкодень: 7.2 },
      ],
    },
    'Скільки пролікувала доктор Дубець за грудень?': {
      explanation: 'Кількість пацієнтів, яких пролікувала доктор Дубець у грудні 2025.',
      sql: "SELECT COUNT(DISTINCT e.patient_pk) AS count\nFROM encounters e\nJOIN doctors d ON e.doctor_id = d.doctor_id\nWHERE d.doctor_name ILIKE '%Дубець%'\n  AND e.admission_at >= '2025-12-01'\n  AND e.admission_at <  '2026-01-01'",
      rows: [{ count: 47 }],
    },
    'Топ 10 діагнозів за кількістю випадків': {
      explanation: 'Десять найчастіших основних діагнозів за 2025 рік.',
      sql: "SELECT diagnosis_main, icd_main, COUNT(*) AS count\nFROM encounters\nWHERE diagnosis_main IS NOT NULL\nGROUP BY diagnosis_main, icd_main\nORDER BY count DESC\nLIMIT 10",
      rows: [
        { diagnosis_main: 'Гострий бронхіт', icd_main: 'J20.9', count: 814 },
        { diagnosis_main: 'Пневмонія', icd_main: 'J18.9', count: 712 },
        { diagnosis_main: 'Гіпертонічна хвороба', icd_main: 'I10', count: 698 },
        { diagnosis_main: 'Стенокардія', icd_main: 'I20.9', count: 521 },
        { diagnosis_main: 'Цукровий діабет 2 типу', icd_main: 'E11', count: 487 },
        { diagnosis_main: 'ХОЗЛ', icd_main: 'J44', count: 412 },
        { diagnosis_main: 'Інфаркт міокарда', icd_main: 'I21', count: 318 },
        { diagnosis_main: 'Гострий апендицит', icd_main: 'K35', count: 281 },
        { diagnosis_main: 'Інсульт', icd_main: 'I63', count: 264 },
        { diagnosis_main: 'Жовчнокам\'яна хвороба', icd_main: 'K80', count: 231 },
      ],
    },
  },

  defaultResponse: {
    explanation: 'Запит виконано. Результат нижче.',
    sql: 'SELECT * FROM encounters\nWHERE admission_at >= \'2025-01-01\'\nLIMIT 50',
    rows: [],
  },
};
