import { KebabMenuProps } from '@/types/kebabTypes';

export default function KebabDelete({ onClick, children }: KebabMenuProps) {
  return (
    <button className="kebab-menu" onClick={onClick}>
      {children}
    </button>
  );
}
