# AI-Car

## Development
Set up Prettier and ESLint with autosave on your IDE before starting to work with the Project!

### Technologies

- [@mui/material](https://www.npmjs.com/package/@mui/material)
- @reduxjs/toolkit
- react-redux
- redux-persist
- react-hot-toast
- [react-icons](https://www.npmjs.com/package/react-icons)
- react-loader-spinner
- [react-hook-form](https://react-hook-form.com/)
- axios
- yup

### Env Variables

Add `.env` to the project root directory, taking `env.example` as an example.
- `VITE_APP_BASE_API_URL` - API backend url;

### How to start

Use `npm run dev` to run the application locally in the development environment.

### How to commit your changes
We follow the rules of [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) to create clean and more understandable commits.

The commit message should be structured as follows and type must be one of [build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test]:
```
<type>[optional scope]: <description>
```

Examples:
```
feat: add header
```

```
feat(lang): add Polish language
```

You can use the `chore` type for anything, but using a type more appropriate to your commit is more welcome.

## Текстовий UI-макет у Figma стилі (brain storm)
### Home сторінка
**Header**
- Логотип (або текст): AI Car Repair Estimator
- Навігація:
  - Upload
  - Language Switcher

**Hero Section**
- Заголовок:
“Оціни вартість ремонту за фото”

- Підзаголовок, дрібніше:
“Завантаж фото пошкодження — AI визначить елементи, пошкодження та орієнтовну ціну ремонту.”

- Велика кнопка:
Upload Photo → веде на /upload

**Right side або Left side (optional, на desktop)**
Info Card: “Як це працює”
1. Завантажуєш фото 
2. AI аналізує елементи та пошкодження 
3. Отримуєш орієнтовну вартість ремонту

Для кожного свої іконки: camera → brain → money.

### Upload сторінка

#### Вертикальний stepper
Посередині екрану — вертикальний stepper:
```
[✓] Ліва сторона авто       (якщо фото вже є)
[ ] Права сторона авто
[ ] Передня частина
[ ] Задня частина
```

**Upload Box for Step**

- Карточка з рамкою;
- Текст для наступного step: “Завантажте фото ПРАВОЇ сторони авто”. 
- Можливе відображення підказок, наприклад: Станьте під кутом 45° до авто та сфотографуйте правий бік.
- Drag & Drop зона або кнопка “Обрати фото”.

Після вибору:
- Прев’ю фотографії;
- Кнопки:
  - “Змінити”
  - “Продовжити” (розблоковує наступний step)

#### Покроковий Upload Wizard
Можливо stepper краще замінити на **Покроковий Upload Wizard**

**Title**

Крок 1 з 4 — Ліва сторона авто

**Пояснення**

Станьте під кутом 45° до авто та сфотографуйте лівий бік.

**Upload area**:

- Іконка камери
- Текст “Перетягніть фото або оберіть файл”

**Після завантаження**:

- Прев’ю фото
- Кнопки:
  - “Змінити фото” 
  - “Продовжити” (розблоковує наступний крок)

І так всі кроки, після яких відправляємо дані та чекаємо відповідь сервера.

Можливо після цього краще перенаправляти на сторінку вдалої відправки та запросити **email адресу** користувача, на яку після завершення буде відправлений результат, чи запропонувати йому далі чекати завершення опрацювання запиту в черзі... 

**Приклад Upload Wizard**
```
Upload Page
   ↓
Choose mode:
   - FULL (4 photos)
   - SIMPLE (1 photo)
   ↓
If FULL → Покроковий Upload Wizard:
   Step 1: Left side  → Next
   Step 2: Right side → Next
   Step 3: Front      → Next
   Step 4: Rear       → Finish
   ↓
Analyze button active
   ↓
API call: POST /estimate ( photos[] )
   ↓
Result Page with:
   - Overall estimate
   - Detected damaged parts
   - Works
   - Parts
   - AI details
   ↓
History
```
