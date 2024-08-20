import Link from 'next/link';

import { KebabLinkProps } from '@/types/kebabTypes';

export default function KebabLink({ href, children }: KebabLinkProps) {
  return (
    <Link href={href} className="kebab-menu kebal-first-menu">
      {children}
    </Link>
  );
}
