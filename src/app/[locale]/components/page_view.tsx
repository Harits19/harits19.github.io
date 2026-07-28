import CvView from "./cv_view";
import PortfolioView from "./portfolio_view";

export default function PageView() {
  return (
    <div className="min-h-screen w-full max-w-[210mm] overflow-x-hidden sm:overflow-y-auto no-scrollbar">
      <div className="flex flex-col gap-5">
        <CvView />
        <PortfolioView />
      </div>
    </div>
  );
}
