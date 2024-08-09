import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { notifyError, notifySuccess } from "@utils/toast";

const useLoginSubmit = (phoneNumber) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const redirectUrl = useSearchParams().get("redirectUrl");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerUser = async (name, phone, password) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/register`,
        { name, phone, password }
      );
      notifySuccess(response.data.message);
      return true;
    } catch (error) {
      notifyError(error.response ? error.response.data.message : error.message);
      return false;
    }
  };

  const loginUser = async (phone, password) => {
    const result = await signIn("credentials", {
      redirect: false,
      phone,
      password,
      callbackUrl: "/",
    });

    setLoading(false);

    if (result?.error) {
      notifyError("Your Phone Number or Password is wrong!");
      console.error("Error during sign-in:", result.error);
    } else if (result?.ok) {
      console.log(redirectUrl);

      notifySuccess("Login Success!");
      const url = redirectUrl ? "/checkout" : result.url;
      router.push(url);
    }
  };

  const submitHandler = async ({ name, password }) => {
    setLoading(true);

    if (name && phoneNumber && password) {
      const registrationSuccess = await registerUser(
        name,
        phoneNumber,
        password
      );
      if (registrationSuccess) {
        await loginUser(phoneNumber, password);
      }
    } else if (phoneNumber && password && !name) {
      await loginUser(phoneNumber, password);
    }

    setLoading(false);
  };

  return {
    register,
    errors,
    loading,
    handleSubmit,
    submitHandler,
  };
};

export default useLoginSubmit;
