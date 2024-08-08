import { Route } from 'next';
import { ReactNode } from 'react';

export interface KebabContainerProps {
  children: ReactNode;
  className?: string;
  onClose?: () => void;
}

export interface KebabMenuProps {
  children: string;
  onClick?: () => void;
}

export interface KebabLinkProps extends KebabMenuProps {
  href: Route | URL;
}
