export const Container: React.FC<{ children: React.ReactNode }> = (props) => (
  <div
    className="container flex flex-col items-center justify-center gap-12 px-4 py-16 "
    {...props}
  />
);
