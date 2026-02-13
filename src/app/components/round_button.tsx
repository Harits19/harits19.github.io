import { ReactNode } from "react";

export default function RoundButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-full text-11pt uppercase h-10 w-10 bg-gray-500 flex flex-col  text-white justify-center items-center"
    >
      {children}
    </button>
  );
}
