import React, { ReactNode } from "react";

export default function DetailView({
  endDate,
  position,
  startDate,
  title,
}: {
  title: (string | undefined)[];
  position: ReactNode;
  startDate: string;
  endDate: string;
}) {
  return (
    <React.Fragment>
      <span className="font-semibold">{title.filter(Boolean).join(" - ")}</span>
      <span className="italic">{position}</span>
      <span className="italic text-black/70">
        {startDate} - {endDate}
      </span>
    </React.Fragment>
  );
}
