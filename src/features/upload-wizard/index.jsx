import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, CardContent } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { sendTask } from '../../api/tasksApi';
import { ROUTERS } from '../../constants';
import { WIZARD_STEPS, STEPS, VALIDATION_BY_STEP } from './constants';
import { defaultValues } from './config';
import { createUploadWizardSchema } from './validation/schema';
import { WizardStepper } from './components/WizardStepper';
import { SummaryStep } from './components/SummaryStep';
import { DetailsStep } from './components/DetailsStep';
import { errorNotification } from '../../utils/notification';
import { PhotosStep } from './components/PhotosStep';
import { WizardRoot, NavRow, StyledCard } from './styled';

export const UploadWizard = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const { t } = useTranslation('wizard');
  const uploadWizardSchema = useMemo(() => createUploadWizardSchema(t), [t]);
  const methods = useForm({
    resolver: yupResolver(uploadWizardSchema),
    defaultValues,
  });
  const { handleSubmit, trigger } = methods;
  const stepsWithLabels = WIZARD_STEPS.map(step => ({
    ...step,
    label: t(step.i18nKey),
  }));
  const activeStepConfig = stepsWithLabels[activeStep];
  const isLastStep = activeStep === stepsWithLabels.length - 1;

  const onSubmit = async values => {
    try {
      const formData = new FormData();
      formData.append('brand_id', values.make?.id);
      formData.append('model_id', values.model?.id);
      formData.append('year', values.year?.id);
      formData.append('front', values.front);
      formData.append('back', values.rear);
      formData.append('left', values.left);
      formData.append('right', values.right);
      formData.append('issue', values.extra);

      if (values.mileage) {
        formData.append('mileage', values.mileage);
      }
      if (values.description) {
        formData.append('description', values.description);
      }

      const data = await sendTask(formData);

      if (data.ok && data.taskId) {
        navigate(`${ROUTERS.TASKS_PAY}/${data.taskId}`);
      } else {
        navigate(ROUTERS.SUCCESS);
      }
    } catch (error) {
      errorNotification(error?.message);
    }
  };

  const handleNext = async event => {
    event.preventDefault();
    // validate only fields for the current step
    const fieldsToValidate = VALIDATION_BY_STEP[activeStepConfig.id] || [];

    if (fieldsToValidate.length) {
      const valid = await trigger(fieldsToValidate);
      if (!valid) {
        return;
      }
    }

    setActiveStep(prev => prev + 1);
  };

  const handleBack = event => {
    event.preventDefault();
    setActiveStep(prev => prev - 1);
  };

  return (
    <WizardRoot>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {t('subtitle', 'We will use these photos to estimate repair costs. Please upload clear images.')}
          </Typography>

          <WizardStepper steps={stepsWithLabels} activeStep={activeStep} t={t} />

          <StyledCard variant="outlined">
            <CardContent>
              {activeStepConfig.id === STEPS.DETAILS && <DetailsStep t={t} />}
              {activeStepConfig.id === STEPS.PHOTOS && <PhotosStep t={t} />}
              {activeStepConfig.id === STEPS.SUMMARY && <SummaryStep t={t} />}
            </CardContent>

            <NavRow>
              <Button variant="text" type="button" disabled={activeStep === 0} onClick={handleBack}>
                {t('buttons.back', 'Back')}
              </Button>

              {!isLastStep ? (
                <Button variant="contained" type="button" onClick={handleNext}>
                  {t('buttons.next', 'Next')}
                </Button>
              ) : (
                <Button variant="contained" type="submit" disabled={methods.formState.isSubmitting}>
                  {methods.formState.isSubmitting
                    ? t('buttons.sending', 'Sending...')
                    : t('buttons.sendAiButton', 'Send for AI analysis')}
                </Button>
              )}
            </NavRow>
          </StyledCard>
        </form>
      </FormProvider>
    </WizardRoot>
  );
};
