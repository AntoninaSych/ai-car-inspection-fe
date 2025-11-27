import { Stack, Box, Typography, Link } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeaderRoot = styled(Stack)(({ theme }) => ({
  flexDirection: 'column',
  columnGap: theme.spacing(2),
  rowGap: theme.spacing(1),
  justifyContent: 'center',

  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  marginBottom: theme.spacing(3),
}));

const StepWrapper = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  gap: theme.spacing(0.5),
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

export const WizardHeader = ({ steps, activeStep, onClick }) => {
  const handleOnClick = index => e => {
    e.preventDefault();
    onClick(index);
  };
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
              <Box component="span">{index + 1}</Box>
            </StepCircle>
            <Typography variant="body2">
              <Link href="#" onClick={handleOnClick(index)} sx={{ color, textDecoration: 'none' }}>
                {step.label}
              </Link>
            </Typography>
          </StepWrapper>
        );
      })}
    </HeaderRoot>
  );
};
