import notFoundImg from "../assets/page_not_found.png";

export default function PageNotFound() {
  return (
    <div className="not-found flex flex-col justify-evenly items-center h-[65vh] gap-2 relative bottom-3">
      <div className="h-[100%]">
        <img src={notFoundImg} alt="" className="h-full" />
      </div>
    </div>
  );
}
