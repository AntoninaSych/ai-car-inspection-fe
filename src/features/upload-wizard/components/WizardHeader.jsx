import { Stack, Box, Typography, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';

const HeaderRoot = styled(Stack)(({ theme }) => ({
  flexDirection: 'column',
  columnGap: theme.spacing(2),
  rowGap: theme.spacing(1),

  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },

  marginBottom: theme.spacing(3),
  justifyContent: 'center',
}));

const StepWrapper = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  gap: theme.spacing(0.5),
  opacity: 0.5,
}));

const StepCircle = styled(Box)(() => ({
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
    <HeaderRoot>
      {steps.map((step, index) => {
        const isActive = index === activeStep;
        const isCompleted = index < activeStep;
        const color = isCompleted ? 'primary.main' : isActive ? 'primary.main' : 'grey.600';
        const opacity = isActive || isCompleted ? 1 : 0.3;

        return (
          <StepWrapper key={step.id} direction="row" sx={{ opacity }}>
            <StepCircle sx={{ borderColor: color, color }}>
              {isCompleted ? <CheckIcon sx={{ fontSize: 16 }} /> : <Box component="span">{index + 1}</Box>}
            </StepCircle>
            <Typography variant="body2">{step.label}</Typography>
          </StepWrapper>
        );
      })}
    </HeaderRoot>
  );
};
