import { useState } from 'react';

import active from '@/shared/assets/icons/comparison-card-active.svg';
import inactive from '@/shared/assets/icons/comparison-card-inactive.svg';
import hover from '@/shared/assets/icons/comparison-green.svg';

export const ComparisonIcon = (props) => {
  const [iconState, setIconState] = useState(
    props.comparison ? 'active' : 'inactive'
  );
  if ((props.comparison ? 'active' : 'inactive') != iconState) {
    setIconState(props.comparison ? 'active' : 'inactive');
  }
  return (
    <div {...props}>
      {iconState === 'active' ? (
        <img className="w-3 h-3" src={active} alt="icon" />
      ) : null}
      {iconState === 'inactive' ? (
        <img className="w-3 h-3" src={inactive} alt="icon" />
      ) : null}
      {iconState === 'hover' ? (
        <img className="w-3 h-3" src={hover} alt="icon" />
      ) : null}
    </div>
  );
};
