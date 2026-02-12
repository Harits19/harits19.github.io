import useProfile from "../../hooks/useProfile";

export default function Home() {
  const { name, details } = useProfile();
  return (
    <div className="flex flex-col items-center p-20 w-full h-full text-11pt">
      <span className="font-semibold text-16pt">{name}</span>
      <div className="flex flex-wrap text-center justify-center">
        {details.map(({ text, link }, index) => {
          return (
            <div key={text} className="flex flex-row items-center">
              {index !== 0 && <span className="px-1">|</span>}
              <a target="_blank" href={link}>
                {text}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
