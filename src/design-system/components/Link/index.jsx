import clsx from 'clsx';
import css from './Link.module.css';
import { Link as RouteLink } from 'react-router-dom';

export const Link = ({ onClick, children, href, to, className, title }) => {
  const clickHandler = event => {
    if (onClick) {
      event.preventDefault();
      onClick(event);
    }
  };

  const classNames = clsx(css.link, className);

  if (href) {
    return (
      <a href={href} className={classNames} rel="nofollow noopener" target="_blank" title={title}>
        {children}
      </a>
    );
  } else if (to) {
    return (
      <RouteLink to={to} className={classNames}>
        {children}
      </RouteLink>
    );
  }

  return (
    <a href="#" onClick={clickHandler} className={classNames}>
      {children}
    </a>
  );
};
