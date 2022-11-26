export const Card: React.FC<{ children?: React.ReactNode }> = (props) => (
  <div
    className="flex max-w-xs flex-col rounded-lg bg-white/20 p-8 text-white"
    {...props}
  />
);
