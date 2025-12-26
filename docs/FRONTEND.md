# Frontend Technical Documentation

## 1) Project summary
Frontend part of the web app (Vite + React) for AI-based car damage estimation:
- Upload photo of damage
- Detect damage type / affected car body parts (AI)
- Show price estimate (min–max), jobs and parts
- Payment flow (Stripe)
- User profile and history of estimates/reports

Tech stack:
- React (Vite)
- Routing: react-router-dom (createBrowserRouter)
- UI: MUI + MUI Icons
- Forms: react-hook-form + yup
- Server state: react-query
- Global state: Redux Toolkit + redux-persist
- HTTP: axios (custom instance + interceptors)
- i18n: i18next
- Mocking: MSW (dev)
- Tooling: ESLint + Prettier, Husky + lint-staged

---

## 2) How to run
### Install
- `npm install`

### Dev
- `npm run dev`

### Build
- `npm run build`

### Preview build
- `npm run preview`

> Notes:
> - API base URL is `/api` (see `src/api/axiosInstance.js`).
> - In dev, requests go to your dev server proxy (Vite config) or backend via `/api`.

---

## 3) Source code structure (src/)
High-level folder structure:

- `src/api/`
    - `axiosInstance.js` – axios instance with baseURL `/api` and auth header injection from Redux store.
    - `interceptors/` – global error interception, uses `globalErrorHandler(error, { t: i18n.t.bind(i18n) })` if backend provides `internalCode`.
    - `authApi.js`, `carsApi.js`, `reportsApi.js`, `stripeApi.js`, `tasksApi.js` – API modules using axios instance.
    - `utils.js` - helper functions.

- `src/assets/` – images and static assets.
- `src/components/` – shared reusable components (Footer, Header, Loader, Modal, LoginForm, RegisterForm, etc.).
- `src/constants/` – app constants (ROUTERS, ALLOWED_LANGUAGES, DEFAULT_LANGUAGE).
- `src/design-system/` – ThemeProvider, theme setup, ability to add themes.
- `src/features/` – feature modules (globalModal, Profile, payment-wizard, upload-wizard, etc.).
- `src/hooks/` – shared hooks.
- `src/i18n/` – i18n config, namespaces, translations loading.
- `src/layouts/` – Layout, PageContainer, Section (composition wrappers).
- `src/mocks/` – MSW configuration and handlers (dev).
- `src/pages/` – route-level pages.
- `src/redux/` – Redux Toolkit slices (auth, modal) and store setup.
- `src/router/` – router configuration via createBrowserRouter.
- `src/styles/` – global styles, fonts imports.
- `src/utils/` – helper functions.

Entry files:
- `src/main.jsx` – contains QueryClientProvider, Redux Provider, PersistGate, ThemeProvider, Toaster, and renders `<App />`.
- `src/App.jsx` – renders routes or Loading screen while `refreshUser` is in progress.

---

## 4) App initialization & Providers
`main.jsx` is the application composition root:
- `QueryClientProvider` – react-query cache and request management
- `Provider` (Redux) – global state
- `PersistGate` – rehydrates persisted auth state before render
- `ThemeProvider` – MUI theme configuration (design-system)
- `Toaster` – notifications (react-hot-toast)
- `<App />` – app shell

`App.jsx`:
- On initial load triggers auth refresh (e.g. `refreshUser`)
- While refresh is pending, shows Loading
- After refresh, renders router

---

## 5) Routing
Routing is configured in `src/router` using `createBrowserRouter`.

### Routes map
Root:
- `/` → `HomePage`

Private (wrapped by `<PrivateRoute />`):
- `/upload` → `UploadPage`
- `/profile` → `ProfilePage`
- `/reports/:reportId` → `ReportDetailsPage`
- `/tasks/pay/:taskId` → `PaymentPage`
- `/stripe/success` → `StripeStatusPage`
- `/stripe/cancel` → `StripeCancelPage`

Public:
- `/success` → `SuccessPage`
- `/faq` → `FAQPage`
- `/privacy-policy` → `PrivacyPolicyPage`
- `/agb` → `TermsPage`
- `/cookies` → `CookiePolicyPage`
- `*` → `NotFoundPage`

### PrivateRoute behavior
`PrivateRoute` blocks access for unauthenticated users.
Expected behavior:
- if user is not authorized → redirect to home or show login modal
- if authorized → render nested route

> Rule: Any page that requires user data, report/task access, or payment flow should be placed under PrivateRoute.

---

## 6) Auth & state management
### Redux slices
- `redux/auth` – stores:
    - `accessToken` (persisted)
    - `isAuthorized` (derived from refresh / presence of valid session)
    - `user` data

- `redux/modal` – controls global modals (auth/login/register, etc.)

### Auth refresh flow
On app start:
1) PersistGate rehydrates persisted state
2) `App.jsx` dispatches `refreshUser`
3) If refresh succeeds: set `isAuthorized = true`, store user
4) If refresh fails: set `isAuthorized = false` (do not block public routes)

---

## 7) Data fetching (React Query)
React Query is used for server state:
- `useQuery` for reads (caching, staleTime)
- `useMutation` for actions
- Use stable `queryKey` naming (e.g. `['reports', reportId]`)

Guidelines:
- Prefer react-query for API resources that should be cached / refetched
- Use Redux for cross-app UI state (auth, global modals) rather than server resources

---

## 8) API layer (Axios)
### Axios instance
In `src/api/axiosInstance.js`:
- base URL: `/api`
- default headers: `Content-Type: application/json`
- `setupAxiosInterceptors(store)` injects Authorization header:
    - reads `accessToken` from `store.getState()`
    - sets `config.headers.Authorization` with `Bearer ${accessToken}`

### API modules
Separated per domain:
- `authApi.js`
- `carsApi.js`
- `reportsApi.js`
- `stripeApi.js`
- `tasksApi.js`

> Rule: UI components/pages should NOT call axios directly.
> They should call API module functions and preferably wrap them in react-query hooks.

---

## 9) Error handling & notifications
There is a global interceptor:
- If backend error response contains `internalCode`, call:
    - `globalErrorHandler(error, { t: i18n.t.bind(i18n) })`
- This enables centralized mapping:
    - internal backend error → translated user message (toast)

Notifications:
- `react-hot-toast` is used for UI notifications.

Guidelines:
- Use centralized error handling for all API calls.
- Do not duplicate error mapping in each page.

---

## 10) UI layer (MUI + design-system)
### Theme
Theme setup is placed in `src/design-system`:
- global theme overrides
- potential support for multiple themes in the future

### Reusable components
Shared components are placed in `src/components`:
- Layout components: Header, Footer, Loader, Modal
- Auth components: LoginForm, RegisterForm

Feature-level UI goes into `src/features/<feature>/...`:
- example: upload wizard, payment wizard, profile

Guidelines:
- If component is reusable across pages → `components/`
- If component is feature-specific → `features/<feature>/`
- If component is route-level → `pages/`

---

## 11) Forms & validation
Forms:
- `react-hook-form` is used as form engine
- `yup` is used for schema validation

Guidelines:
- Keep schemas near the form (same feature folder), or in `features/<feature>/validation`
- For translation of validation messages:
    - build schema with `t(...)` (from i18next)
    - recreate schema when language changes if needed

---

## 12) Internationalization (i18next)
i18n is configured in `src/i18n`.

Languages:
- Allowed languages: `ALLOWED_LANGUAGES`
- Default: `DEFAULT_LANGUAGE`

Guidelines:
- Use namespaces to keep translations scalable
- For large static text pages:
    - either keep separate pages per language
    - or load markdown/html per language
    - avoid placing huge text blocks into JSON if it becomes hard to maintain

---

## 13) Mocks (MSW)
MSW is configured in `src/mocks` and used in development:
- intercepts network calls
- provides predictable responses for UI development

Guidelines:
- Keep handlers grouped by domain (tasks/reports/auth etc.)
- Ensure mocks are not enabled in production builds

---

## 14) Code quality & git hooks
Linters/formatters:
- ESLint
- Prettier

Git hooks:
- Husky + lint-staged
- run lint/format on staged files before commit

Guidelines:
- keep code style consistent and automatic
- fail fast on CI (if CI exists)

---

## 15) Conventions (recommended)
### Naming
- Pages: `SomethingPage.jsx`
- Feature modules: `features/<featureName>/...`
- Components: `PascalCase.jsx`
- Hooks: `useSomething.js`

### Imports
- Prefer absolute aliases if configured (optional)
- Avoid deep relative paths where possible

### Where to put new code
- New route page → `src/pages`
- New domain API → `src/api/<domain>Api.js`
- New feature (with state + UI) → `src/features/<feature>`
- Shared component → `src/components`

---

## 16) Adding a new page checklist
When you add a new page/route:

1) Create page component:
- `src/pages/NewPage/NewPage.jsx` (or flat file, depending on your convention)

2) Add route in router config:
- public route → top-level children
- private route → inside `<PrivateRoute />`

3) Add translations:
- add keys to relevant namespace(s)

4) Add API calls (if needed):
- put function into `src/api/<domain>Api.js`
- use react-query in UI layer

5) Add UI blocks:
- shared parts → components
- page-specific parts → inside page folder
- feature logic → features folder

6) Add tests / MSW handlers (if you use them)

---

## 17) Appendix: current routes configuration
(keep this section up to date)

- `/` HomePage
- `/upload` (private)
- `/profile` (private)
- `/reports/:reportId` (private)
- `/tasks/pay/:taskId` (private)
- `/stripe/success` (private)
- `/stripe/cancel` (private)
- `/success`
- `/faq`
- `/privacy-policy`
- `/agb`
- `/cookies`
- `*` NotFoundPage

## 18) Payment flow (Stripe)

This project uses **Stripe Checkout (redirect-based flow)**.
All sensitive payment logic is handled on the backend.
Frontend is responsible only for:
- initiating checkout session
- redirecting user to Stripe
- handling success / cancel pages

---

### 18.1 High-level flow overview

1) User completes required steps (upload, estimation, etc.)
2) User navigates to payment page (`/tasks/pay/:taskId`)
3) Frontend requests backend to create Stripe Checkout Session
4) Backend returns `checkoutUrl`
5) Frontend redirects browser to Stripe Checkout
6) User completes or cancels payment on Stripe
7) Stripe redirects user back to frontend:
    - success → `/stripe/success`
    - cancel → `/stripe/cancel`
8) Final payment status is resolved via backend (webhook-based)

Frontend **does not trust redirect alone** as a source of truth.

---

### 18.2 Payment entry point (PaymentPage)

Route:
- `/tasks/pay/:taskId` (private)

Responsibilities:
- display payment summary (task, amount, currency)
- collect additional payment data (if required)
- initiate payment based on selected payment method

Supported payment method(s):
- Stripe (via Checkout Session)

---

### 18.3 Creating Stripe Checkout Session

Frontend uses API method from:
- `src/api/stripeApi.js`

Typical payload sent to backend:
- `task_id`
- `amount` (converted to minor units, e.g. cents)
- `currency`
- `full_name` (if required for invoice/metadata)

Example behavior (simplified):
- amount is converted using:
    - `Math.round(Number(amount) * 100)`
- currency is normalized (lowercase)

Expected backend response:
- `{ url: string }` – Stripe Checkout URL

---

### 18.4 Redirect to Stripe

If backend responds with a valid checkout URL:
- frontend performs **hard redirect**:
    - `window.location.href = res.url`

Important notes:
- This is a full page navigation (not SPA routing)
- User leaves the application and lands on Stripe-hosted page
- No Stripe JS SDK is required on frontend

Error handling:
- If `url` is missing or request fails:
    - show translated error notification
    - stop redirect state
    - keep user on payment page

---

### 18.5 Stripe Success page

Route:
- `/stripe/success` (private)

Purpose:
- inform user that payment process was completed
- show confirmation message
- explain next steps (e.g. report processing, email notification)

Important:
- This page **does NOT guarantee** that payment is confirmed
- Real confirmation happens via backend webhook

Recommended behavior:
- show neutral success state
- suggest checking profile or reports page
- avoid showing final “paid” status without backend confirmation

---

### 18.6 Stripe Cancel page

Route:
- `/stripe/cancel` (private)

Purpose:
- handle user-initiated or Stripe-initiated payment cancellation
- inform user that payment was not completed

Behavior:
- show cancel message
- allow retry or navigation back to payment page

No backend state is modified on frontend cancellation page.

---

### 18.7 Backend webhook dependency (important)

Frontend relies on backend Stripe webhook for:
- payment confirmation
- task/report status update

Typical backend responsibilities:
- listen to Stripe webhook events
- validate event signature
- update task/payment status in database

Frontend **never updates payment status directly**.

---

### 18.8 Final payment status resolution

After returning from Stripe:
- user may see outdated task/report state
- frontend should:
    - fetch updated task/report data
    - rely on backend-confirmed status

Recommended UI pattern:
- optimistic success message
- actual status displayed from backend data (react-query refetch)

---

### 18.9 Error handling & edge cases

Handled cases:
- Stripe session creation failed
- Stripe redirect URL missing
- user cancels payment
- payment completed but webhook not processed yet

Guidelines:
- always show user-friendly, translated messages
- never assume payment is complete based only on redirect
- backend is the single source of truth

---

### 18.10 Summary

Key principles of Stripe integration in this project:
- frontend is thin and stateless regarding payments
- backend owns Stripe logic and secrets
- redirect-based Checkout flow
- webhook-driven confirmation
- frontend reflects backend state, not Stripe redirects
