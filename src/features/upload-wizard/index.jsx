import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, AlertTitle, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { sendTask } from '../../api/tasksApi';
import { ROUTERS } from '../../constants';
import { WIZARD_STEPS, defaultValues, STEPS } from './constants';
import { createUploadWizardSchema } from './validation/schema';
import { WizardHeader } from './components/WizardHeader';
import { PhotoStep } from './components/PhotoStep';
import { SummaryStep } from './components/SummaryStep';
import { CarDetailsStep } from './components/CarDetailsStep';
import { WizardRoot, NavRow, ContentCard, ContentInner } from './styled';

export const UploadWizard = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const uploadWizardSchema = useMemo(() => createUploadWizardSchema(t), [t]);
  const {
    handleSubmit,
    setValue,
    watch,
    setError,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(uploadWizardSchema),
    defaultValues,
  });
  const values = watch();
  const stepsWithLabels = WIZARD_STEPS.map(step => ({
    ...step,
    label: t(step.labelKey),
  }));
  const activeStepConfig = stepsWithLabels[activeStep];
  const isSummary = activeStepConfig.id === STEPS.SUMMARY;
  const isDetails = activeStepConfig.id === STEPS.DETAILS;

  const handleEmailChange = value => {
    setValue('email', value, { shouldValidate: true });
  };

  const onSubmit = async values => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach(fieldName => {
        formData.append(fieldName, values[fieldName]);
      });
      const data = await sendTask(formData);

      if (data.estimateId) {
        navigate(`${ROUTERS.RESULT}/${data.estimateId}`);
      } else {
        navigate(ROUTERS.THANK_YOU);
      }
    } catch (error) {
      setError('root', {
        type: 'server',
        message: error?.message || 'Unknown error',
      });
    }
  };

  const handleNext = () => {
    setActiveStep(prev => Math.min(prev + 1, WIZARD_STEPS.length - 1));
  };

  const handleStepClick = index => {
    setActiveStep(index);
  };

  const handleBack = () => {
    setActiveStep(prev => Math.max(prev - 1, 0));
  };

  const renderStepContent = () => {
    const id = activeStepConfig.id;

    if (isSummary) {
      return (
        <SummaryStep
          values={values}
          errors={errors}
          stepsWithLabels={stepsWithLabels}
          isSubmitting={isSubmitting}
          onEmailChange={handleEmailChange}
          onSubmit={handleSubmit(onSubmit)}
          t={t}
        />
      );
    }

    if (isDetails) {
      return (
        <CarDetailsStep
          values={values}
          errors={errors}
          register={register}
          control={control}
          setValue={setValue}
          t={t}
        />
      );
    }

    return (
      <PhotoStep
        name={id}
        label={activeStepConfig.label}
        helperText={t(`uploadWizard.steps.${id}.helper`, 'Upload a clear photo.')}
        value={values[id]}
        setValue={setValue}
        error={errors[id]}
        t={t}
      />
    );
  };

  return (
    <WizardRoot>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {t(
          'uploadWizard.subtitle',
          'We will use these photos to estimate repair costs. Please upload clear images of each side.'
        )}
      </Typography>

      <WizardHeader steps={stepsWithLabels} activeStep={activeStep} onClick={handleStepClick} />

      <ContentCard variant="outlined">
        <ContentInner>
          {renderStepContent()}
          {errors.root && (
            <Alert severity="error" sx={{ mt: 3 }}>
              <AlertTitle>{errors.root.message}</AlertTitle>
            </Alert>
          )}
        </ContentInner>

        <NavRow sx={{ p: 2 }}>
          <Button variant="text" disabled={activeStep === 0} onClick={handleBack}>
            {t('uploadWizard.buttons.back', 'Back')}
          </Button>

          {!isSummary && (
            <Button variant="contained" onClick={handleNext}>
              {t('uploadWizard.buttons.next', 'Next')}
            </Button>
          )}
        </NavRow>
      </ContentCard>
    </WizardRoot>
  );
};
