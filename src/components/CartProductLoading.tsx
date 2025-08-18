import { BeatLoader } from "react-spinners";

export default function CartProductLoading() {
  return (
    <div className="w-full h-[250px] flex justify-center items-center">
      <BeatLoader size="10px" color="#0187D5" />
    </div>
  );
}
