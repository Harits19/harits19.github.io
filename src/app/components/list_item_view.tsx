import ListView from "./list_view";

export default function ListItemView({items}: {
  items: {
    title: string;
    value: string[];
  }[];
}) {
  return (
    <ListView
      items={items.map((item) => (
        <div key={item.title} className="flex flex-row ">
          <span className="w-1/3">{item.title}</span>
          <span className="w-full"> : {item.value.join(", ")}</span>
        </div>
      ))}
    />
  );
}
