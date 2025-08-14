import { GridLoader } from "react-spinners";

export default function PageLoading() {
  {
    return (
      <div className="w-full h-[50vh] flex justify-center items-center">
        <GridLoader color="black" />
      </div>
    );
  }
}
