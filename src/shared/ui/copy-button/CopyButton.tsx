import { ContentCopy } from '@mui/icons-material';
import { toast } from 'sonner';

interface CopyButtonProps {
  textToCopy: string;
  className?: string;
  containerClassName?: string;
  iconClassName?: string;
  toastMessage?: string;
}

export const CopyButton = ({
  textToCopy,
  className = '',
  containerClassName = '',
  iconClassName = '!w-4 cursor-pointer !mr-3',
  toastMessage = 'Скопировано',
}: CopyButtonProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    toast(toastMessage);
  };

  return (
    <div className={`${containerClassName} ${className}`}>
      <ContentCopy onClick={handleCopy} className={iconClassName} />
    </div>
  );
};
