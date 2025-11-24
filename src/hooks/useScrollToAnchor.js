import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollToAnchor = () => {
  const location = useLocation();
  const lastHash = useRef('');

  useEffect(() => {
    if (location.hash) {
      lastHash.current = location.hash.slice(1);
    }

    if (lastHash.current) {
      const element = document.getElementById(lastHash.current);
      if (element) {
        setTimeout(() => {
          element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          lastHash.current = '';
        }, 100);
      }
    }
  }, [location]);

  return null;
};

export default useScrollToAnchor;
