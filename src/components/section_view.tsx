import { ReactNode } from "react";

export default function SectionView({
  children,
  title,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className=" w-full flex flex-col text-justify">
      <span className="font-semibold text-12pt uppercase">{title}</span>
      <div className="w-full border-b-[0.5px]"></div>
      <div className="h-3" />
      {children}
      <div className="h-6" />
    </div>
  );
}
