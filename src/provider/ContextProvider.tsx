import { createContext, useContext, useState, type ReactNode } from "react";
import type { UserData } from "../shared/types/user";
import type CartProductType from "../shared/types/cart";
import type OrderProductType from "../shared/types/order";

export interface AppContextType {
  searchInput: string;
  setSearchInput: (value: string) => void;
  loggedInUser: UserData | null;
  setLoggedInUser: (value: UserData | null) => void;
  cartItems: CartProductType[];
  setCartItems: (value: CartProductType[]) => void;
  orderItems: OrderProductType[];
  setOrderItems: (value: OrderProductType[]) => void;
}

const AppContext = createContext<AppContextType>({
  searchInput: "",
  setSearchInput: function () {},
  loggedInUser: null,
  setLoggedInUser: function () {},
  cartItems: [],
  setCartItems: function () {},
  orderItems: [],
  setOrderItems: function () {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  return useContext(AppContext);
};

export default function ContextProvider({ children }: { children: ReactNode }) {
  const [searchInput, setSearchInput] = useState("");
  const [loggedInUser, setLoggedInUser] = useState<UserData | null>(null);
  const [cartItems, setCartItems] = useState<CartProductType[]>([]);
  const [orderItems, setOrderItems] = useState<OrderProductType[]>([]);
  return (
    <AppContext.Provider
      value={{
        searchInput,
        setSearchInput,
        loggedInUser,
        setLoggedInUser,
        cartItems,
        setCartItems,
        orderItems,
        setOrderItems,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
