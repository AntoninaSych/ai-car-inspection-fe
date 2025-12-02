import { Typography, CardContent, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { StyledCardMedia, StyledPreviewCard } from '../styled';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: 'rgba(0,0,0,0.4)',
  backdropFilter: 'blur(4px)',
  color: theme.palette.text.primary,
  padding: theme.spacing(0.5),
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
}));

export const PhotoCard = ({ image, file, label, onClose }) => {
  return (
    <StyledPreviewCard>
      {onClose && (
        <StyledIconButton size="small" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </StyledIconButton>
      )}
      <StyledCardMedia component="img" image={image} alt={label} />
      <CardContent sx={{ py: 3 }}>
        <Typography variant="body2" color="primary.main">
          <strong>{label}</strong>
        </Typography>
        {file && (
          <Typography variant="body2" color="primary.main">
            {file}
          </Typography>
        )}
      </CardContent>
    </StyledPreviewCard>
  );
};
