import { useNavigate } from "react-router-dom";

export default function SearchRecommendations({
  productName,
  productId,
  productImage,
}: {
  productName: string;
  productId: string;
  productImage: string;
}) {
  const navigate = useNavigate();
  const redirectToProduct = () => {
    navigate(`/products/${productId}`);
  };
  return (
    <div
      onClick={redirectToProduct}
      className="flex gap-2 px-2 py-2 w-full items-center bg-white overflow-ellipsis hover:bg-blue-100 transition-colors cursor-pointer"
    >
      <img src={productImage} className="w-5 h-5" />
      <div>{productName}</div>
    </div>
  );
}
