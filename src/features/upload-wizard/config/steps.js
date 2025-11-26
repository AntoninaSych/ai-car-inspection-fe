export const STEPS = {
  SUMMARY: 'summary',
  FRONT: 'front',
  REAR: 'rear',
  LEFT: 'left',
  RIGHT: 'right',
};

export const uploadSteps = [
  { id: STEPS.FRONT, labelKey: 'uploadWizard.steps.front.label' },
  { id: STEPS.REAR, labelKey: 'uploadWizard.steps.rear.label' },
  { id: STEPS.LEFT, labelKey: 'uploadWizard.steps.left.label' },
  { id: STEPS.RIGHT, labelKey: 'uploadWizard.steps.right.label' },
  { id: STEPS.SUMMARY, labelKey: 'uploadWizard.steps.summary.label' },
];

export const REQUIRED_STEPS = [STEPS.FRONT, STEPS.REAR, STEPS.LEFT, STEPS.RIGHT];
