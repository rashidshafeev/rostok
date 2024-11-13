import { useState } from 'react';
import inactive from '../../assets/icons/comparison-card-inactive.svg';
import active from '../../assets/icons/comparison-card-active.svg';
import hover from '../../assets/icons/comparison-green.svg';

function ComparisonIcon(props) {
  const [iconState, setIconState] = useState(
    props.comparison === 'true' ? 'active' : 'inactive'
  );
  if ((props.comparison === 'true' ? 'active' : 'inactive') != iconState) {
    setIconState(props.comparison === 'true' ? 'active' : 'inactive');
  }
  return (
    <div {...props}>

      {iconState === 'active' && (
        <img className='w-3 h-3' src={active} alt='icon' />
      )}
      {iconState === 'inactive' && (
        <img className='w-3 h-3' src={inactive} alt='icon' />
      )}
      {iconState === 'hover' && (
        <img className='w-3 h-3' src={hover} alt='icon' />
      )}
    </div>
  );
}

export default ComparisonIcon;
