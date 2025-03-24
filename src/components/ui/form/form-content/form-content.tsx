import { cn } from '../../../../lib/utils';

interface Props extends React.InputHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const FormContent = (props: Props) => {
  const { children, className } = props;
  return (
    <div className={cn('flex flex-col border border-gray-200 rounded-lg p-4 ', className)}>
      {children}
    </div>
  );
};
