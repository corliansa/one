export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (
  props
) => (
  <select
    className="mt-1 mb-2 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-[#7eb0ff] focus:ring-opacity-50 disabled:bg-gray-900/20"
    {...props}
  />
);
