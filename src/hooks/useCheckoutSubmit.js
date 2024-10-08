import Cookies from "js-cookie";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useCart } from "react-use-cart";
import useRazorpay from "react-razorpay";
import axios from "axios";
//internal import
import useAsync from "./useAsync";
import { getUserSession } from "@lib/auth";
import { UserContext } from "@context/UserContext";
import OrderServices from "@services/OrderServices";
import CouponServices from "@services/CouponServices";
import { notifyError, notifySuccess } from "@utils/toast";
import CustomerServices from "@services/CustomerServices";
import NotificationServices from "@services/NotificationServices";

const useCheckoutSubmit = (storeSetting) => {
  const { dispatch } = useContext(UserContext);
  const [error, setError] = useState("");
  const [total, setTotal] = useState("");
  const [couponInfo, setCouponInfo] = useState({});
  const [minimumAmount, setMinimumAmount] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [isCheckoutSubmit, setIsCheckoutSubmit] = useState(false);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [useExistingAddress, setUseExistingAddress] = useState(false);
  const [isCouponAvailable, setIsCouponAvailable] = useState(false);

  const router = useRouter();
  const couponRef = useRef("");
  const [Razorpay] = useRazorpay();
  const { isEmpty, emptyCart, items, cartTotal } = useCart();
  const userInfo = getUserSession();

  const { data, loading } = useAsync(() =>
    CustomerServices.getShippingAddress({
      userId: userInfo?.id,
    })
  );

  const hasShippingAddress =
    !loading &&
    data?.shippingAddress &&
    Object.keys(data?.shippingAddress)?.length > 0;

  // console.log("storeSetting", storeSetting);

  // console.log("res", data);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (Cookies.get("couponInfo")) {
      const coupon = JSON.parse(Cookies.get("couponInfo"));
      // console.log('coupon information',coupon)
      setCouponInfo(coupon);
      setDiscountPercentage(coupon.discountType);
      setMinimumAmount(coupon.minimumAmount);
    }
    setValue("email", userInfo?.email);
  }, [isCouponApplied]);

  //remove coupon if total value less then minimum amount of coupon
  useEffect(() => {
    if (minimumAmount - discountAmount > total || isEmpty) {
      setDiscountPercentage(0);
      Cookies.remove("couponInfo");
    }
  }, [minimumAmount, total]);

  //calculate total and discount value
  //calculate total and discount value
  useEffect(() => {
    const discountProductTotal = items?.reduce(
      (preValue, currentValue) => preValue + currentValue.itemTotal,
      0
    );

    let totalValue = 0;
    const subTotal = parseFloat(cartTotal + Number(shippingCost)).toFixed(2);
    const discountAmount =
      discountPercentage?.type === "fixed"
        ? discountPercentage?.value
        : discountProductTotal * (discountPercentage?.value / 100);

    const discountAmountTotal = discountAmount ? discountAmount : 0;

    totalValue = Number(subTotal) - discountAmountTotal;

    setDiscountAmount(discountAmountTotal);

    // console.log("total", totalValue);

    setTotal(totalValue);
  }, [cartTotal, shippingCost, discountPercentage]);

  const submitHandler = async (data) => {
    try {
      // dispatch({ type: "SAVE_SHIPPING_ADDRESS", payload: data });
      // Cookies.set("shippingAddress", JSON.stringify(data));
      setIsCheckoutSubmit(true);
      setError("");
      const userDetails = {
        name: data.name,
        contact: data.contact,
        email: data.email,
        address: data.address,
        country: data.country,
        city: data.city,
        zipCode: data.zipCode,
      };

      let orderInfo = {
        user_info: userDetails,
        shippingOption: data.shippingOption,
        paymentMethod: data.paymentMethod,
        status: "Pending",
        cart: items,
        subTotal: cartTotal,
        shippingCost: shippingCost,
        discount: discountAmount,
        total: total,
      };

      // const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

      // await CustomerServices.addShippingAddress({
      //   userId: uniqueId,
      //   shippingAddressData: {
      //     name: data.firstName + " " + data.lastName,
      //     contact: data.contact,
      //     email: userInfo?.email,
      //     address: data.address,
      //     country: data.country,
      //     city: data.city,
      //     // area: data.area,
      //     zipCode: data.zipCode,
      //   },
      // });

      // if (data.paymentMethod === "Bkash") {
      //   try {
      //     const generateTranId = () => {
      //       const timestamp = Date.now();
      //       const randomNum = Math.floor(Math.random() * 1000000);
      //       return `REF${timestamp}${randomNum}`;
      //     };

      //     const tranId = generateTranId();
      //     const orderResponse = await OrderServices.addOrder(orderInfo);
      //     const sslCommerzData = {
      //       message: "Order placed successfully",
      //       total_amount: orderInfo.total, // Use total amount from orderInfo
      //       currency: "BDT", // Assuming currency is always BDT
      //       tran_id: tranId, // This should be a unique transaction ID, generate as needed
      //       success_url: `http://localhost:3000/order/${orderResponse._id}`,
      //       fail_url: `${process.env.NEXT_PUBLIC_STORE_DOMAIN}fail`,
      //       cancel_url: `${process.env.NEXT_PUBLIC_STORE_DOMAIN}cancel`,
      //       ipn_url: `${process.env.NEXT_PUBLIC_STORE_DOMAIN}ipn`,
      //       shipping_method: orderInfo.shippingOption, // Use shipping option from orderInfo
      //       product_name: orderInfo.cart
      //         .map((item) => item.productName)
      //         .join(", "), // Assuming product names are in the cart items
      //       product_profile: "general", // Assuming a general profile for products
      //       product_category: "Electronic", // Assuming electronic category, adjust as needed
      //       cus_name: userDetails.name,
      //       cus_email: userDetails.email,
      //       cus_add1: userDetails.address,
      //       cus_add2: userDetails.address, // Assuming the same address for add1 and add2
      //       cus_city: userDetails.city,
      //       cus_state: userDetails.city, // Assuming the same as city for state
      //       cus_postcode: userDetails.zipCode,
      //       cus_country: userDetails.country,
      //       cus_phone: userDetails.contact,
      //       cus_fax: userDetails.contact, // Assuming fax is the same as contact
      //       ship_name: userDetails.name,
      //       ship_add1: userDetails.address,
      //       ship_add2: userDetails.address, // Assuming the same address for add1 and add2
      //       ship_city: userDetails.city,
      //       ship_state: userDetails.city, // Assuming the same as city for state
      //       ship_postcode: userDetails.zipCode,
      //       ship_country: userDetails.country,
      //     };

      //     console.log(
      //       `${process.env.NEXT_PUBLIC_STORE_DOMAIN}order/${orderResponse._id}`
      //     );

      //     const res = await axios.post(
      //       ` ${process.env.NEXT_PUBLIC_API_BASE_URL}/ssl/init`,
      //       sslCommerzData
      //     );

      //     window.location.href = res?.data?.url;
      //   } catch (error) {
      //     console.error("Error making the POST request", error);
      //     // setResponse("An error occurred");
      //   }
      // }

      if (data.paymentMethod === "Cash") {
        const orderResponse = await OrderServices.addOrder(orderInfo);
        // notification info
        const notificationInfo = {
          orderId: orderResponse?._id,
          message: `${orderResponse?.user_info?.name}, Placed ${parseFloat(
            orderResponse?.total
          ).toFixed(2)} order!`,
          image:
            "https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png",
        };
        // notification api call
        await NotificationServices.addNotification(notificationInfo);

        router.push(`/order/${orderResponse?._id}`);
        notifySuccess("Your Order Confirmed!");
        Cookies.remove("couponInfo");

        emptyCart();
        setIsCheckoutSubmit(false);
      }
    } catch (err) {
      notifyError(err ? err?.response?.data?.message : err?.message);
      setIsCheckoutSubmit(false);
    }
  };

  //handle stripe payment

  // const handlePaymentWithBkash = async (order) => {
  //   try {
  //     const orderData = {
  //       ...order,
  //       cardInfo: stripeInfo,
  //     };
  //     const orderResponse = await OrderServices.addOrder(orderData);

  //     // notification info
  //     const notificationInfo = {
  //       orderId: orderResponse._id,
  //       message: `${orderResponse.user_info.name}, Placed ${parseFloat(
  //         orderResponse.total
  //       ).toFixed(2)} order!`,
  //       image:
  //         "https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png",
  //     };
  //     // notification api call
  //     await NotificationServices.addNotification(notificationInfo);

  //     router.push(`/order/${orderResponse._id}`);
  //     notifySuccess("Your Order Confirmed!");
  //     Cookies.remove("couponInfo");
  //     emptyCart();

  //     setIsCheckoutSubmit(false);
  //   } catch (err) {
  //     // console.log("err", err?.message);
  //     notifyError(err?.response?.data?.message || err?.message);
  //     setIsCheckoutSubmit(false);
  //   }
  // };

  //handle razorpay payment
  // const handlePaymentWithRazorpay = async (orderInfo) => {
  //   try {
  //     const { amount, id, currency } =
  //       await OrderServices.createOrderByRazorPay({
  //         amount: Math.round(total).toString(),
  //       });

  //     // console.log("amount:::", amount);
  //     // setIsCheckoutSubmit(false);

  //     if ((amount, id, currency)) {
  //       const razorpayKey = storeSetting?.razorpay_id;

  //       // console.log("razorpayKey", razorpayKey);

  //       const options = {
  //         key: razorpayKey,
  //         amount: amount,
  //         currency: currency,
  //         name: "Fably Store",
  //         description: "This is total cost of your purchase",
  //         order_id: id,
  //         handler: async function (response) {
  //           const razorpay = {
  //             amount: total,
  //             razorpayPaymentId: response.razorpay_payment_id,
  //             razorpayOrderId: response.razorpay_order_id,
  //             razorpaySignature: response.razorpay_signature,
  //           };

  //           const orderData = {
  //             ...orderInfo,
  //             total: total,
  //             cardCharge: cardCharge,
  //             razorpay,
  //           };

  //           const res = await OrderServices.addRazorpayOrder(orderData);
  //           if (res) {
  //             router.push(`/order/${res._id}`);
  //             notifySuccess("Your Order Confirmed!");
  //             Cookies.remove("couponInfo");
  //             localStorage.removeItem("products");
  //             emptyCart();

  //             await NotificationServices.addNotification({
  //               message: `${data?.firstName} placed $${total} order!`,
  //               orderId: res._id,
  //               image: userInfo?.image,
  //             });
  //             socket.emit("notification", {
  //               message: `${data.firstName} placed $${total} order!`,
  //               orderId: res._id,
  //               image: userInfo?.image,
  //             });
  //           }
  //         },

  //         modal: {
  //           ondismiss: function () {
  //             setTotal(total);
  //             setIsCheckoutSubmit(false);
  //             console.log("Checkout form closed!");
  //           },
  //         },

  //         prefill: {
  //           name: "Alamgir",
  //           email: "alamgirh389@example.com",
  //           contact: "01957434434",
  //         },
  //         notes: {
  //           address: "Mumbai, India",
  //         },
  //         theme: {
  //           color: "#10b981",
  //         },
  //       };

  //       const rzpay = new Razorpay(options);
  //       rzpay.open();
  //     }
  //   } catch (err) {
  //     setIsCheckoutSubmit(false);
  //     notifyError(err.message);
  //   }
  // };

  const handleShippingCost = (value) => {
    // console.log("handleShippingCost", value);
    setShippingCost(Number(value));
  };

  //handle default shipping address
  const handleDefaultShippingAddress = (value) => {
    setUseExistingAddress(value);
    if (value) {
      const address = data?.shippingAddress;
      setValue("firstName", address.name);

      setValue("address", address.address);
      setValue("contact", address.contact);
      setValue("city", address.city);
      setValue("country", address.country);
      setValue("zipCode", address.zipCode);
    } else {
      setValue("firstName");
      setValue("lastName");
      setValue("address");
      setValue("contact");
      setValue("city");
      setValue("country");
      setValue("zipCode");
    }
  };

  const handleCouponCode = async (e) => {
    e.preventDefault();

    if (!couponRef.current.value) {
      notifyError("Please Input a Coupon Code!");
      return;
    }
    setIsCouponAvailable(true);

    try {
      const coupons = await CouponServices.getShowingCoupons();
      const result = coupons.filter(
        (coupon) => coupon.couponCode === couponRef.current.value
      );
      setIsCouponAvailable(false);

      if (result.length < 1) {
        notifyError("Please Input a Valid Coupon!");
        return;
      }

      if (dayjs().isAfter(dayjs(result[0]?.endTime))) {
        notifyError("This coupon is not valid!");
        return;
      }

      if (total < result[0]?.minimumAmount) {
        notifyError(
          `Minimum ${result[0].minimumAmount} USD required for Apply this coupon!`
        );
        return;
      } else {
        notifySuccess(
          `Your Coupon ${result[0].couponCode} is Applied on ${result[0].productType}!`
        );
        setIsCouponApplied(true);
        setMinimumAmount(result[0]?.minimumAmount);
        setDiscountPercentage(result[0].discountType);
        dispatch({ type: "SAVE_COUPON", payload: result[0] });
        Cookies.set("couponInfo", JSON.stringify(result[0]));
      }
    } catch (error) {
      return notifyError(error.message);
    }
  };

  return {
    register,
    errors,
    showCard,
    setShowCard,
    error,
    couponInfo,
    couponRef,
    total,
    isEmpty,
    items,
    cartTotal,
    handleSubmit,
    submitHandler,
    handleShippingCost,
    handleCouponCode,
    discountPercentage,
    discountAmount,
    shippingCost,
    isCheckoutSubmit,
    isCouponApplied,
    useExistingAddress,
    hasShippingAddress,
    isCouponAvailable,
    handleDefaultShippingAddress,
  };
};

export default useCheckoutSubmit;
