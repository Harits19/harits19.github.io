import { ReactNode } from "react";

export default function ListView({ items }: { items: readonly string[] | ReactNode[]}) {
  return (
    <ul className="list-disc ml-4">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
