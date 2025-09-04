import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Accordion({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };
  return (
    <div className="p-1 bg-gray-100 rounded" onClick={handleShow}>
      <div className="question w-full font-medium p-2 cursor-pointer flex justify-between items-center">
        {question}
        <FontAwesomeIcon
          icon={faAngleDown}
          className={`${show ? "rotate-180" : ""} transition`}
        />
      </div>

      <div
        className={`answer transition-all px-2 ${
          show && "p-1"
        } duration-100 overflow-hidden`}
        style={{
          maxHeight: show ? "500px" : "0px",
          opacity: show ? "1" : "0",
        }}
      >
        {answer}
      </div>
    </div>
  );
}
