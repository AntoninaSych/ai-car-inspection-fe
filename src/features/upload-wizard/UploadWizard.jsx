import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { sendEstimates } from '../../api/estimatesApi';
import { uploadSteps, defaultValues, STEPS } from './config';
import { createUploadWizardSchema } from './validation/schema';
import { WizardHeader } from './components/WizardHeader';
import { PhotoStep } from './components/PhotoStep';
import { SummaryStep } from './components/SummaryStep';
import { WizardRoot, NavRow, ContentCard, ContentInner, DragOverlay } from './styled';
import { useDropZone } from './hooks/useDropZone';
import { ROUTERS } from '../../constants';

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
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(uploadWizardSchema),
    defaultValues,
  });
  const values = watch();
  const stepsWithLabels = uploadSteps.map(step => ({
    ...step,
    label: t(step.labelKey),
  }));
  const activeStepConfig = stepsWithLabels[activeStep];
  const isSummary = activeStepConfig.id === STEPS.SUMMARY;
  const { dropRef, isDragging } = useDropZone({
    isEnabled: !isSummary,
    onDropFile: file => {
      const fieldName = activeStepConfig.id;
      setValue(fieldName, file, { shouldValidate: true });
    },
  });

  const handleEmailChange = value => {
    setValue('email', value, { shouldValidate: true });
  };

  const onSubmit = async values => {
    try {
      const formData = new FormData();
      formData.append('front', values.front);
      formData.append('rear', values.rear);
      formData.append('left', values.left);
      formData.append('right', values.right);
      if (values.email) {
        formData.append('email', values.email);
      }

      const data = await sendEstimates(formData);

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
    setActiveStep(prev => Math.min(prev + 1, uploadSteps.length - 1));
  };

  const handleBack = () => {
    setActiveStep(prev => Math.max(prev - 1, 0));
  };

  const renderStepContent = () => {
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

    const id = activeStepConfig.id;

    return (
      <PhotoStep
        name={id}
        label={activeStepConfig.label}
        helperText={t(
          `uploadWizard.steps.${id}.helper`,
          `Upload a clear photo of the ${activeStepConfig.label.toLowerCase()}.`
        )}
        value={values[id]}
        setValue={setValue}
        error={errors[id]}
        t={t}
      />
    );
  };

  return (
    <WizardRoot>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {t('uploadWizard.title', 'Upload photos of your car')}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {t(
          'uploadWizard.subtitle',
          'We will use these photos to estimate repair costs. Please upload clear images of each side.'
        )}
      </Typography>

      <WizardHeader steps={stepsWithLabels} activeStep={activeStep} />

      <ContentCard variant="outlined">
        <ContentInner ref={dropRef} data-dragging={isDragging ? 'true' : 'false'}>
          {isDragging && !isSummary && (
            <DragOverlay>
              <Typography variant="subtitle1">{t('uploadWizard.dragOverlay.title', 'Drag photo here')}</Typography>
              <Typography variant="body2">
                {t('uploadWizard.dragOverlay.subtitle', 'or click "Choose Photo"')}
              </Typography>
            </DragOverlay>
          )}
          {renderStepContent()}
        </ContentInner>

        <NavRow sx={{ p: 2 }}>
          <Button variant="text" disabled={activeStep === 0} onClick={handleBack}>
            {t('uploadWizard.buttons.back', 'Back')}
          </Button>

          {activeStepConfig.id !== 'summary' && (
            <Button variant="contained" onClick={handleNext} disabled={!values[activeStepConfig.id]}>
              {t('uploadWizard.buttons.next', 'Next')}
            </Button>
          )}
        </NavRow>

        {errors.root && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {errors.root.message}
          </Typography>
        )}
      </ContentCard>
    </WizardRoot>
  );
};
