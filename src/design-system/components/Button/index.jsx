import { FiLoader } from 'react-icons/fi';
import { VARIANTS, COLORS } from './const';
import { useNavigate } from 'react-router-dom';
import { StyledButton } from './styled';

export const Button = ({
  onClick,
  children,
  to,
  isLoading,
  variant = VARIANTS.contained,
  color = COLORS.primary,
  disabled = false,
  ...props
}) => {
  const navigate = useNavigate();

  const handlerOnClick = event => {
    if (to) {
      return navigate(to);
    }

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

Button.variants = Object.assign({}, VARIANTS);
Button.colors = Object.assign({}, COLORS);
