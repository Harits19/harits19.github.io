import { ReactNode } from "react";

export default function SectionView({
  children,
  title,
}: {
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className=" w-full flex flex-col text-justify">
      <span className="font-semibold text-12pt uppercase border-b-[0.5px]">
       {title}
      </span>
      <div className="h-1" />
      {children}
      <div className="h-6" />
    </div>
  );
}
