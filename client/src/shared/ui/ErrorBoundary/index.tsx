import { ReactNode, useState, useEffect, FC, useContext } from 'react';
import { Toast } from '../..';
import { Context } from '../../../main';

export const ErrorBoundary: FC<{ children: ReactNode }> = ({ children }) => {
  const { store } = useContext(Context);
  const [error, setError] = useState<Error | null>(null);
  const [, setShowToast] = useState<boolean>();

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      setError(event.error);
    };
    window.addEventListener('error', errorHandler);
    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  return (
    <div>
      {children}
      {error && (
        <Toast
          clearIsError={() => store.setIsError(false)}
          onClose={() => setShowToast(false)}
          message={error.message}
        />
      )}
    </div>
  );
};
