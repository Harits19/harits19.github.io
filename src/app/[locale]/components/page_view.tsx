import CvView from "./cv_view";
import PortfolioView from "./portfolio_view";

export default function PageView() {
  return (
    <div className="h-screen w-[210mm] overflow-y-scroll no-scrollbar">
      <div className=" gap-y-5 flex flex-col">
        <CvView />
        <PortfolioView />
      </div>
    </div>
  );
}
