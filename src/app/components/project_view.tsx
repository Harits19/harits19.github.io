import { ExperienceItem } from "@/hooks/use_profile/type";
import DetailView from "./detail_view";
import ListView from "./list_view";
import Text from "./text";

export default function ProjectView({
  item,
  charBefore,
}: {
  item: ExperienceItem;
  charBefore: number;
}) {
  const normalizedTitle = [item.company, item.location, item.employment_type]
    .filter(Boolean)
    .join(" - ");

  const section1 =
    charBefore +
    normalizedTitle.length +
    item.end_date.length +
    item.start_date.length +
    item.position.length;
  return (
    <div key={item.company} className="flex flex-col w-full">
      <DetailView
        charBefore={charBefore}
        title={normalizedTitle}
        endDate={item.end_date}
        startDate={item.start_date}
        position={item.position}
      />

      <ListView
        items={item.responsibilities.map((responsibility, index) => {
          const charBefore =
            item.responsibilities
              .slice(0, index)
              .reduce((prev, curr) => prev + curr.length, 0) + section1;
          return (
            <Text
              text={responsibility}
              key={responsibility}
              charBefore={charBefore}
            />
          );
        })}
      />
    </div>
  );
}
