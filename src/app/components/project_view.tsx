export default function ProjectView({
  item,
}: {
  item: Readonly<{
    company: string;
    location?: string;
    employment_type: string;
    position: string;
    start_date: string;
    end_date: string;
    responsibilities: readonly string[];
  }>;
}) {
  return (
    <div key={item.company} className="flex flex-col w-full">
      <span className="font-semibold">
        {item.company} - {item.location} - {item.employment_type}
      </span>
      <span className="italic">{item.position}</span>
      <span className="italic text-black/70">
        {item.start_date} - {item.end_date}
      </span>
      <ul className="list-disc ml-4">
        {item.responsibilities.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
