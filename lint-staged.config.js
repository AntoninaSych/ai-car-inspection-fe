export default {
  'src/**/*.{js,jsx}': stagedFiles => {
    const quotedFiles = stagedFiles.map(f => `"${f}"`).join(' ');

    return [
      `eslint .`,
      `prettier --write ${quotedFiles}`,
    ]
  }
};
