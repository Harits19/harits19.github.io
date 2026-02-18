import React, { ReactNode } from "react";
import Text from "./text";

export default function DetailView({
  endDate,
  position,
  startDate,
  title,
  charBefore = 0,
}: {
  title: string;
  position: string;
  startDate: string;
  endDate: string;
  charBefore?: number;
}) {
  const section1 = title.length + charBefore;
  const section2 = section1 + position.length;
  return (
    <React.Fragment>
      <span className="font-semibold">
        <Text text={title} charBefore={charBefore} />
      </span>
      <span className="italic">
        <Text text={position} charBefore={section1} />
      </span>
      <span className="italic text-black/70">
        <Text text={`${startDate} - ${endDate}`} charBefore={section2} />
      </span>
    </React.Fragment>
  );
}
