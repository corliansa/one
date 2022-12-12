export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => (
  <input
    className="focus:ring-opacity-800 mt-1 mb-2 w-full rounded-lg border-[1px] border-gray-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7eb0ff] disabled:border-gray-200 disabled:text-gray-200"
    {...props}
  />
);
