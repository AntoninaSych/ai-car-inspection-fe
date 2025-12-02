# AI-Car

## Development
Set up Prettier and ESLint with autosave on your IDE before starting to work with the Project!

### Technologies

- [@mui/material](https://www.npmjs.com/package/@mui/material)
- @reduxjs/toolkit
- react-redux
- react-query
- redux-persist
- react-hot-toast
- [react-icons](https://www.npmjs.com/package/react-icons)
- react-loader-spinner
- [react-hook-form](https://react-hook-form.com/)
- axios
- yup

### Env Variables

Add `.env` to the project root directory, taking `env.example` as an example.
- `VITE_API_PROXY_TARGET` - API backend url (e.g., http://localhost:5001);

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
#### Покроковий Upload Wizard
**Заголовок**

Завантаження зображень для попередньої оцінки

**Опис сторінки**

Завантажте фотографії вашого автомобіля

**Пояснення**

Ми використаємо ці фото, щоб попередньо оцінити вартість ремонту. Будь ласка, завантажте чіткі зображення кожного боку авто.

**Upload area**:

- Опис що треба завантажити
- При перетягуванні фотографії показати зону перетягування і напис: Перетягніть фото сюди або натисніть "Вибрати файл"

**Після завантаження**:

- Прев’ю фото
- Кнопки:
  - “Вибрати фото” (замінити фото у разі потреби)
  - “Продовжити” (розблоковує наступний крок)

І так всі кроки, після яких показуємо підсумок з превʼю завантажених фото і можливістю додати email адресу. Після вдалої відповіді сервера перенаправляємо на потрібну сторінку: на **Result сторінку**, якщо у відповіді є ID задачі або на **Thank You сторінку**, якщо був наданий **email адрес**, на яку після завершення опрацювання завдання буде відправлений результат. 

**Приклад Upload сторінки**
```
Upload Page
   ↓
Покроковий Upload Wizard:
   Step 1: Left side  → Next
   Step 2: Right side → Next
   Step 3: Front      → Next
   Step 4: Rear       → Next
   Step 5: Finish
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
```
