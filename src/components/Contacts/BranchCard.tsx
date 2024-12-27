import CopyButton from '../common/CopyButton';

import type { ProjectBranch } from '@/types/ServerData/PageContent/GetContactsResponse';

interface BranchCardProps {
  branch: ProjectBranch;
}

export const BranchCard = ({ branch }: BranchCardProps) => {
  return (
    <div className="w-full md:basis-[calc(33%-(20px*2)/3)] border border-colGreen rounded-xl p-4 md:p-5 flex flex-col">
      <div className="font-semibold text-xl md:text-2xl mb-3 md:mb-4">
        {branch.name}
      </div>
      <div className="flex flex-col justify-between grow">
        <div className="flex flex-col gap-3 md:gap-4 mb-6 md:mb-10">
          <div className="flex flex-col md:flex-row md:gap-2 md:items-end">
            <div className="text-colDarkGray text-sm md:text-base">Телефон</div>
            <div className="flex items-center gap-2">
              <span>{branch.phone}</span>
              <CopyButton
                textToCopy={branch.phone}
                toastMessage="Номер телефона скопирован"
                containerClassName="flex-shrink-0"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:gap-2 md:items-end">
            <div className="text-colDarkGray text-sm md:text-base">
              Режим работы
            </div>
            <div className="font-semibold text-base md:text-lg">
              {branch.working_hours}
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:gap-2 md:items-end">
            <div className="text-colDarkGray text-sm md:text-base">
              Эл. почта
            </div>
            <div className="font-semibold text-base md:text-lg">
              {branch.email}
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:gap-2 md:items-start">
            <div className="text-colDarkGray text-sm md:text-base">Адрес</div>
            <div className="font-semibold text-base md:text-lg">
              {branch.address}
            </div>
          </div>
        </div>
        <button className="font-semibold text-colGreen border border-colGreen p-3 rounded w-full md:w-1/2">
          Подробнее
        </button>
      </div>
    </div>
  );
};
