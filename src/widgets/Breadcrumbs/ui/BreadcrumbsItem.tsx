import { clsx } from 'clsx';
import { NavLink } from 'react-router-dom';

interface BreadcrumbsItemProps {
  name: string;
  slug: string;
  isActive: boolean;
  isLast: boolean;
}

export const BreadcrumbsItem = ({
  name,
  slug,
  isActive,
  isLast,
}: BreadcrumbsItemProps) => (
  <>
    <NavLink
      to={slug}
      className={clsx(
        'mr-3 mt-2 text-xs text-colBlack hover:opacity-100 duration-200',
        isActive ? 'opacity-100' : 'opacity-60'
      )}
    >
      {name}
    </NavLink>
    {!isLast ? (
      <span className="min-w-[5px] w-[5px] h-[5px] mr-3 mt-2 rounded-full bg-colGreen" />
    ) : null}
  </>
);
