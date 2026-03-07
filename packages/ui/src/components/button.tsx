<<<<<<< HEAD
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
=======
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
>>>>>>> 97ec523c03aa7a64e6b8e08c1a6a4bd903d446de
}