export const STEPS = {
  DETAILS: 'details',
  PHOTOS: 'photos',
  SUMMARY: 'summary',
};

export const WIZARD_STEPS = [
  { id: STEPS.DETAILS, i18nKey: 'steps.details.label' },
  { id: STEPS.PHOTOS, i18nKey: 'steps.photos.label' },
  { id: STEPS.SUMMARY, i18nKey: 'steps.summary.label' },
];

export const VALIDATION_BY_STEP = {
  [STEPS.DETAILS]: ['make', 'model', 'year', 'mileage', 'description'],
  [STEPS.PHOTOS]: ['front', 'rear', 'left', 'right', 'extra', 'photosGroup'],
};
