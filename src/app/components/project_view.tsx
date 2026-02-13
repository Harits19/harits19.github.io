import DetailView from "./detail_view";
import ListView from "./list_view";

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
      <DetailView
        title={[item.company, item.location, item.employment_type]}
        endDate={item.end_date}
        startDate={item.start_date}
        position={item.position}
      />

      <ListView items={item.responsibilities} />
    </div>
  );
}
