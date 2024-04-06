export const Card: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ className, ...props }) => (
  <div
    className={`rounded-lg border-2 bg-white p-6 shadow-md ${className}`}
    {...props}
  />
);
