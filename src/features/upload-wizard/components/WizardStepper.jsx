import { Box, Stepper, Step, StepLabel } from '@mui/material';
import InfoRounded from '@mui/icons-material/InfoRounded';
import InventoryRounded from '@mui/icons-material/InventoryRounded';
import CarCrashRounded from '@mui/icons-material/CarCrashRounded';
import FilterRounded from '@mui/icons-material/FilterRounded';
import CheckRounded from '@mui/icons-material/CheckRounded';
import { styled } from '@mui/material/styles';

const StyledStepper = styled(Stepper)(({ theme }) => ({
  '& .MuiStep-root': {
    opacity: 0.6,
  },
  '& .Mui-completed': {
    color: theme.palette.primary.main,
    opacity: 1,
  },
  '& .MuiStepLabel-label.Mui-completed ': {
    color: theme.palette.primary.main,
  },
}));

export const WizardStepper = ({ steps, activeStep, t }) => {
  const iconMapper = {
    details: CarCrashRounded,
    photos: FilterRounded,
    summary: InventoryRounded,
  };

  return (
    <Box sx={{ mb: 3, width: '100%' }}>
      <StyledStepper activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => {
          const completedStep = activeStep > index;
          const stepIcon = completedStep ? CheckRounded : iconMapper[step.id] || InfoRounded;

          return (
            <Step key={step.id}>
              <StepLabel slots={{ stepIcon }}>{t(step.label)}</StepLabel>
            </Step>
          );
        })}
      </StyledStepper>
    </Box>
  );
};
