import { PropsWithChildren } from 'react';

function ErrorText({ children }: PropsWithChildren) {
  return (
    <span className="font-kv-medium leading-[1.5] text-kv-red kv-text-xs">
      {children}
    </span>
  );
}

export default ErrorText;
