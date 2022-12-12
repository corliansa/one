export const Card: React.FC<{
  children?: React.ReactNode;
}> = (props) => (
  <div className="rounded-lg border-2 border-dashed p-6 " {...props} />
);
