// src/features/catalog/ui/CatalogEmpty/CatalogEmpty.tsx

import { memo } from 'react';

interface CatalogEmptyProps {
  title?: string;
  description?: string;
  onReset?: () => void;
  className?: string;
}

export const CatalogEmpty = memo(({
  title = 'Список пуст!',
  description = 'К сожалению, по вашему запросу ничего не нашли.',
  onReset,
  className = ''
}: CatalogEmptyProps) => {
  return (
    <div className={`flex flex-col items-center justify-center py-20 ${className}`}>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-colGray mb-4">{description}</p>
      {onReset && (
        <button
          onClick={onReset}
          className="text-colDarkGray hover:text-colBlack font-semibold transition-colors"
        >
          Сбросить фильтры
        </button>
      )}
    </div>
  );
});

CatalogEmpty.displayName = 'CatalogEmpty';