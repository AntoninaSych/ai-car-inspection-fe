import React from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';

function ElevationScroll(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true, // миттєва реакція
    threshold: 0, // з першого пікселя
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 6 : 0,
  });
}

export default ElevationScroll;
