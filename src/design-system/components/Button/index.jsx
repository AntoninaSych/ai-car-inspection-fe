import { FiLoader } from 'react-icons/fi';
import { VARIANTS, COLORS } from './const';
import { StyledButton } from './styled';

export const Button = ({
  onClick,
  children,
  isLoading,
  variant = VARIANTS.contained,
  color = COLORS.primary,
  disabled = false,
  ...props
}) => {
  const handlerOnClick = event => {
    if (onClick) {
      event.preventDefault();
      onClick(event);
    }
  };

  return (
    <StyledButton variant={variant} onClick={handlerOnClick} color={color} disabled={disabled} {...props}>
      {isLoading ? <FiLoader /> : children}
    </StyledButton>
  );
};
