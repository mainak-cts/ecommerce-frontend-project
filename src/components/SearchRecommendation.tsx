import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeSearchInput } from "../redux/slices/search";

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
  const dispatch = useDispatch();
  const redirectToProduct = () => {
    dispatch(changeSearchInput(productName));
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
