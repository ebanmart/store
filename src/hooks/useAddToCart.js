import { useState } from "react";
import { useCart } from "react-use-cart";

import { notifyError, notifySuccess } from "@utils/toast";
import * as fbPixel from "@lib/fb-pixel";

const useAddToCart = () => {
  const [item, setItem] = useState(1);
  const { addItem, items, updateItemQuantity } = useCart();
  // console.log('products',products)
  // console.log("items", items);

  const handleAddItem = (product) => {
    const result = items.find((i) => i.id === product.id);
    // console.log(
    //   "result in add to",
    //   result,
    //   items,
    //   product.id
    //   // product?.quantity < result?.stock,
    //   // result?.quantity,
    //   // "item",
    //   // item
    // );
    const { variants, categories, description, ...updatedProduct } = product;

    if (result !== undefined) {
      if (
        result?.quantity + item <=
        (product?.variants?.length > 0
          ? product?.variant?.quantity
          : product?.stock)
      ) {
        addItem(updatedProduct, item);
        notifySuccess(`${item} ${product.title} added to cart!`);

        // Track AddToCart event for Facebook Pixel
        fbPixel.addToCart({
          content_name: product.title,
          content_ids: [product.id],
          content_type: "product",
          value: product.price * item,
          currency: "BDT",
          num_items: item,
        });
      } else {
        notifyError("Insufficient stock!");
      }
    } else {
      if (
        item <=
        (product?.variants?.length > 0
          ? product?.variant?.quantity
          : product?.stock)
      ) {
        addItem(updatedProduct, item);
        notifySuccess(`${item} ${product.title} added to cart!`);

        // Track AddToCart event for Facebook Pixel
        fbPixel.addToCart({
          content_name: product.title,
          content_ids: [product.id],
          content_type: "product",
          value: product.price * item,
          currency: "BDT",
          num_items: item,
        });
      } else {
        notifyError("Insufficient stock!");
      }
    }
  };

  const handleIncreaseQuantity = (product) => {
    const result = items?.find((p) => p.id === product.id);
    // console.log(
    //   "handleIncreaseQuantity",
    //   product,
    //   result?.quantity + item,
    //   product?.variants?.length > 0
    //     ? product?.variant?.quantity
    //     : product?.stock
    // );
    if (result) {
      if (
        result?.quantity + item <=
        (product?.variants?.length > 0
          ? product?.variant?.quantity
          : product?.stock)
      ) {
        updateItemQuantity(product.id, product.quantity + 1);
      } else {
        notifyError("Insufficient stock!");
      }
    }
  };

  return {
    setItem,
    item,
    handleAddItem,
    handleIncreaseQuantity,
  };
};

export default useAddToCart;
