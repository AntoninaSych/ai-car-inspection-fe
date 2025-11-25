import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { sendEstimates } from '../../api/estimatesApi';
import { uploadSteps, defaultValues, UPLOAD_STEPS } from './config';
import { uploadWizardSchema } from './validation/schema';
import { WizardHeader } from './components/WizardHeader';
import { PhotoStep } from './components/PhotoStep';
import { SummaryStep } from './components/SummaryStep';
import { WizardRoot, NavRow, ContentCard, ContentInner, DragOverlay } from './styled';

export const UploadWizard = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

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
  const isSummary = activeStepConfig.id === UPLOAD_STEPS.SUMMARY;

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
        navigate(`/estimate/${data.estimateId}`);
      } else {
        navigate('/thank-you');
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

  const handleDragOver = event => {
    if (isSummary) {
      return;
    }
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  };

  const handleDragEnter = event => {
    if (isSummary) {
      return;
    }
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = event => {
    if (isSummary) {
      return;
    }
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = event => {
    if (isSummary) {
      return;
    }
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];
    if (!file) {
      return;
    }

    // front | rear | left | right
    const fieldName = activeStepConfig.id;
    setValue(fieldName, file, { shouldValidate: true });
  };

  const renderStepContent = () => {
    if (isSummary) {
      return (
        <SummaryStep
          values={values}
          errors={errors}
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
      />
    );
  };

  useEffect(() => {
    const handleWindowDragOver = event => {
      event.preventDefault();
    };

    const handleWindowDrop = event => {
      event.preventDefault();
    };

    window.addEventListener('dragover', handleWindowDragOver);
    window.addEventListener('drop', handleWindowDrop);

    return () => {
      window.removeEventListener('dragover', handleWindowDragOver);
      window.removeEventListener('drop', handleWindowDrop);
    };
  }, []);

  return (
    <WizardRoot>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {t('uploadWizard.title', 'Upload photos of your car')}
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {t(
          'uploadWizard.subtitle',
          'We will use these photos to estimate repair costs. Please upload clear images of each side.'
        )}
      </Typography>

      <WizardHeader steps={stepsWithLabels} activeStep={activeStep} />

      <ContentCard
        variant="outlined"
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <ContentInner data-dragging={isDragging ? 'true' : 'false'}>
          {isDragging && !isSummary && (
            <DragOverlay>
              <Typography variant="subtitle1">Перетягніть фото сюди</Typography>
              <Typography variant="body2" color="text.secondary">
                або натисніть «Choose photo»
              </Typography>
            </DragOverlay>
          )}
          {renderStepContent()}
        </ContentInner>

        <NavRow>
          <Button variant="text" disabled={activeStep === 0} onClick={handleBack}>
            {t('uploadWizard.buttons.back', 'Back')}
          </Button>

          {activeStepConfig.id !== 'summary' && (
            <Button variant="contained" onClick={handleNext}>
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
