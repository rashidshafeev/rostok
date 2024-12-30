import { useState } from 'react';

const TooltipCaption = ({ text, tooltipText }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <span
        className="text-sm font-medium text-colBlack line-clamp-1 break-all ml-1"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {text}
      </span>
      {isVisible ? (
        <div className="absolute left-0 bottom-[-2rem] bg-black text-white text-sm rounded-lg p-2 w-max max-w-xs">
          <span>{tooltipText}</span>
          <div className="absolute top-full left-4 border-8 border-transparent border-t-black"></div>
        </div>
      ) : null}
    </div>
  );
};

export default TooltipCaption;
