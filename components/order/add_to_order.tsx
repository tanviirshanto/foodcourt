import React, { useEffect } from "react";
import { createCartItem } from "@/redux/cartSlice";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "@/redux/hooks";

interface AddToOrderProps {
  newItem: any; // You can replace 'any' with your actual item type
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Add_to_order: React.FC<AddToOrderProps> = ({ newItem, setShowModal }) => {
  const { data: session } = useSession();
  const user_id = session?.user?.id;
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(newItem);
  }, [newItem]);

  const addItem = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (session && user_id) {
      const postData = {
        newItem,
        user_id,
      };
      dispatch(createCartItem(postData));
    }

    setShowModal(false);
  };

  return (
    <button
      type="submit"
      className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 mt-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      onClick={addItem}
    >
      <svg
        className="me-1 -ms-1 w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
          clipRule="evenodd"
        ></path>
      </svg>
      Order Now
    </button>
  );
};

export default Add_to_order;
