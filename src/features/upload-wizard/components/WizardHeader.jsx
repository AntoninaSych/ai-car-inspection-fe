import { Stack, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeaderRoot = styled(Stack)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  justifyContent: 'center',
}));

const StepWrapper = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  gap: theme.spacing(0.5),
  opacity: 0.5,
}));

const StepCircle = styled(Box)(({ theme }) => ({
  width: 24,
  height: 24,
  borderRadius: '50%',
  borderWidth: 2,
  borderStyle: 'solid',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 14,
}));

export const WizardHeader = ({ steps, activeStep }) => {
  return (
    <HeaderRoot direction="row" spacing={2}>
      {steps.map((step, index) => {
        const isActive = index === activeStep;
        const isCompleted = index < activeStep;

        const color = isCompleted ? 'success.main' : isActive ? 'primary.main' : 'grey.400';

        return (
          <StepWrapper key={step.id} direction="row" sx={{ opacity: isActive || isCompleted ? 1 : 0.5 }}>
            <StepCircle sx={{ borderColor: color }}>
              <Box component="span">{index + 1}</Box>
            </StepCircle>
            <Typography variant="body2">{step.label}</Typography>
          </StepWrapper>
        );
      })}
    </HeaderRoot>
  );
};
