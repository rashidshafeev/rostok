// src/features/catalog/ui/CatalogError/CatalogError.tsx

import { memo } from 'react';

interface CatalogErrorProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export const CatalogError = memo(({
  title = 'Что-то пошло не так!',
  description = 'Произошла ошибка при загрузке каталога.',
  onRetry,
  className = ''
}: CatalogErrorProps) => {
  return (
    <div className={`flex flex-col items-center justify-center py-20 ${className}`}>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-colGray mb-4">{description}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-colGreen text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
        >
          Попробовать снова
        </button>
      )}
    </div>
  );
});

CatalogError.displayName = 'CatalogError';