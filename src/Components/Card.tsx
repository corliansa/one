export const Card: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ className, ...props }) => (
  <div
    className={`rounded-lg border-2 border-dashed p-6 ${className}`}
    {...props}
  />
);
