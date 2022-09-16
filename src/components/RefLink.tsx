import { Link } from '@mui/material';
import React, { forwardRef, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

export const RefLink = ({ to, children }: { to: string; children?: ReactNode | string }): JSX.Element => {
  return (
    <Link
      component={forwardRef<HTMLAnchorElement, { children: ReactNode } & React.RefAttributes<HTMLAnchorElement>>(
        (props, ref) => (
          <RouterLink ref={ref} {...props} to={to}>
            {props.children}
          </RouterLink>
        ),
      )}
    >
      {children}
    </Link>
  );
};
