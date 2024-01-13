import { Link, useLocation } from 'react-router-dom';
import { crumbLinkReplacer } from './crumbLinkReplacer';

const Breadcrumbs = () => {
  const { pathname } = useLocation();

  let crumbLink = '';
  const crumbPath = pathname
    ?.split('/')
    ?.filter((path) => path !== '')
    ?.map((crumb) => {
      crumbLink += `/${crumb}`;
      return (
        <Link to={crumbLink} key={crumb} className='text-xs text-colBlack'>
          {crumbLinkReplacer[crumb] || crumb}
        </Link>
      );
    });

  console.log(crumbPath);

  return (
    <div className='content w-full flex items-center space-x-3 pt-6 pb-3 truncate lining-nums proportional-nums'>
      <Link to='/' className='text-xs text-colGray'>
        Главная
      </Link>
      <span className='min-w-[5px] w-[5px] h-[5px] rounded-full bg-colGreen'></span>
      {crumbPath}
    </div>
  );
};

export default Breadcrumbs;
