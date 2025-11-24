import { FiLoader } from 'react-icons/fi';
import { TYPES, VARIANTS } from './const';
import { useNavigate } from 'react-router-dom';
import { StyledButton } from './styled';

export const Button = ({ onClick, children, to, isLoading, type = TYPES.BUTTON, disabled = false }) => {
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
    <StyledButton type={type} onClick={handlerOnClick} disabled={disabled}>
      {isLoading ? <FiLoader /> : children}
    </StyledButton>
  );
};

Button.variants = Object.assign({}, VARIANTS);
Button.types = Object.assign({}, TYPES);
