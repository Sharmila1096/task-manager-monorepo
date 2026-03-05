export function Button({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="px-4 py-2 rounded-xl bg-black text-white hover:opacity-80"
      {...props}
    >
      {children}
    </button>
  );
}