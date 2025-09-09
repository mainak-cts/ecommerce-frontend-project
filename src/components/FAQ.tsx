import { useState } from "react";
import { faqData } from "../shared/data/faq_data";
import Accordion from "./Accordion";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FAQ() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="w-full flex justify-evenly flex-col gap-2">
      <h1 className="font-bold text-3xl m-2 text-center">FAQs</h1>
      <div className="accordions flex flex-col gap-2">
        {faqData.slice(0, 4).map((item, index) => (
          <Accordion
            key={index}
            question={item.question}
            answer={item.answer}
          />
        ))}
        {showMore &&
          faqData
            .slice(4)
            .map((item, index) => (
              <Accordion
                key={index}
                question={item.question}
                answer={item.answer}
              />
            ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="flex items-center gap-2 cursor-pointer bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white font-semibold py-2 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? (
            <>
              Show less <FontAwesomeIcon icon={faChevronUp} />
            </>
          ) : (
            <>
              Show more <FontAwesomeIcon icon={faChevronDown} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
