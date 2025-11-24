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

```
docs: correct spelling of README
```

```
style: update css variables
```

You can use the `chore` type for anything, but using a type more appropriate to your commit is more welcome.

