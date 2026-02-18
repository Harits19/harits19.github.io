import ListView from "./list_view";
import Text from "./text";

export default function ListItemView({
  items,
  charBefore: charBeforeParent = 0,
}: {
  items: {
    title: string;
    value: string[];
  }[];
  charBefore?: number;
}) {
  return (
    <ListView
      items={items.map((item, index) => {
        const itemBefore = items.slice(0, index);
        const charBefore =
          itemBefore.reduce(
            (prev, curr) =>
              prev + `${curr.title} : ${curr.value.join(", ")}`.length,
            0,
          ) + charBeforeParent;

        return {
          charBefore,
          view: (
            <div key={item.title} className="flex flex-row ">
              <span className="w-1/3">
                <Text text={item.title} charBefore={charBefore} />
              </span>
              <span className="w-full">
                <Text
                  text={` : ${item.value.join(", ")}`}
                  charBefore={charBefore + item.title.length}
                />
              </span>
            </div>
          ),
        };
      })}
    />
  );
}
