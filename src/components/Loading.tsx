import { BeatLoader } from "react-spinners";

export default function Loading({
  width = "15px",
  usedInBtn = false,
}: {
  width?: string;
  usedInBtn?: boolean;
}) {
  return (
    <div
      className={
        usedInBtn
          ? "w-min h-min flex justify-center items-center"
          : "w-full h-[50vh] flex justify-center items-center"
      }
    >
      <BeatLoader size={width} color={usedInBtn ? "white" : "black"} />
    </div>
  );
}
