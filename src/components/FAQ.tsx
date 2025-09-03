import Accordion from "./Accordion";

export default function FAQ() {
  return (
    <div className="w-full flex justify-evenly flex-col gap-2">
      <h1 className="font-bold text-3xl m-2 text-center">FAQs</h1>
      <div className="accordions flex flex-col gap-2">
        <Accordion
          question="What is the return policy for this product?"
          answer="You can return the product within 30 days of delivery for a full refund, provided it is unused and in original packaging."
        />
        <Accordion
          question="Does this product come with a warranty?"
          answer="Yes, this product includes a 1-year manufacturer warranty covering any manufacturing defects."
        />
        <Accordion
          question="Are there any discounts available?"
          answer="Yes, you can get a 10% discount on your first purchase using the code WELCOME10 at checkout."
        />
        <Accordion
          question="How long does delivery take?"
          answer="Standard delivery takes 3–5 business days. Express delivery options are also available at checkout."
        />
        <Accordion
          question="Is this product available in other colors or sizes?"
          answer="Yes, this product is available in multiple colors and sizes. Please check the product page for all available options."
        />
      </div>
    </div>
  );
}
