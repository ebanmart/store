import { useState } from "react";
import { FiLock, FiMail } from "react-icons/fi";
import { MdLocalPhone } from "react-icons/md";

//internal  import
import Layout from "@layout/Layout";
import Error from "@components/form/Error";
import useLoginSubmit from "@hooks/useLoginSubmit";
import InputArea from "@components/form/InputArea";
import BottomNavigation from "@components/login/BottomNavigation";

const Login = () => {


  const [phoneNumber, setPhoneNumber] = useState("");

  const [isValid, setIsValid] = useState(true);

  const { handleSubmit, submitHandler, register, errors, loading } =
    useLoginSubmit(phoneNumber);

    
  const handleChange = (e) => {
    let inputValue = e.target.value;
    // Remove any non-numeric characters from the input
    inputValue = inputValue.replace(/\D/g, "");
    // Add the country code '880' if not already included
    if (!inputValue.startsWith("88") && inputValue.length > 0) {
      inputValue = "88" + inputValue;
    }
    // Limit the phone number to 11 digits
    inputValue = inputValue.slice(0, 13);
    // Format the phone number as +8801992151537
    const formattedPhoneNumber = formatPhoneNumber(inputValue);
    setPhoneNumber(formattedPhoneNumber);
    // Validate the input
    setIsValid(validateBangladeshiPhoneNumber(inputValue));
  };

  const formatPhoneNumber = (value) => {
    if (value.length < 4) return value;
    return `${value.slice(0, 3)}${value.slice(3)}`;
  };

  const validateBangladeshiPhoneNumber = (value) => {
    // Check if the phone number starts with '880' and has 8 additional digits in total
    return /^880\d{10}$/.test(value);
  };

  return (
    <Layout title="Login" description="This is login page">
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
        <div className="py-4 flex flex-col lg:flex-row w-full">
          <div className="w-full sm:p-5 lg:p-8">
            <div className="mx-auto text-left justify-center rounded-md w-full max-w-lg px-4 py-8 sm:p-10 overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-2x">
              <div className="overflow-hidden mx-auto">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold font-serif">Login</h2>
                  <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">
                    Login with your email and password
                  </p>
                </div>
                <form
                  onSubmit={handleSubmit(submitHandler)}
                  className="flex flex-col justify-center"
                >
                  <div className="grid grid-cols-1 gap-5">
                    <div className="form-group">
                      <span className=" text-sm  font-bold text-[#6B7280]">
                        Your Mobile Number
                      </span>

                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-800 focus-within:text-gray-900 sm:text-base">
                            <MdLocalPhone />
                          </span>
                        </div>
                        <input
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={phoneNumber}
                          onChange={handleChange}
                          className="py-2 pl-10 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-[#1E73BE] h-11 md:h-12"
                        />
                      </div>

                      {!isValid && (
                        <p className=" text-sm mt-2" style={{ color: "red" }}>
                          আপনার সঠিক নাম্বারটি লিখুন!
                        </p>
                      )}
                    </div>

                    <div className="form-group">
                      <InputArea
                        register={register}
                        defaultValue="12345678"
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        Icon={FiLock}
                        autocomplete="current-password"
                      />

                      <Error errorName={errors.password} />
                    </div>

                    {/* <div className="flex items-center justify-between">
                      <div className="flex ms-auto">
                        <Link
                          href="/auth/forget-password"
                          className="text-end text-sm text-heading ps-3 underline hover:no-underline focus:outline-none"
                        >
                          Forgot password?
                        </Link>
                      </div>
                    </div> */}
                    {loading ? (
                      <button
                        disabled={loading}
                        type="submit"
                        className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-[#1E73BE] text-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white  h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto"
                      >
                        <img
                          src="/loader/spinner.gif"
                          alt="Loading"
                          width={20}
                          height={10}
                        />
                        <span className="font-serif ml-2 font-light">
                          Processing
                        </span>
                      </button>
                    ) : (
                      <button
                        disabled={loading}
                        type="submit"
                        className="w-full text-center py-3 rounded bg-[#1E73BE] text-white  transition-all focus:outline-none my-1"
                      >
                        Login
                      </button>
                    )}
                  </div>
                </form>
                <BottomNavigation
                  or={true}
                  route={"/auth/signup"}
                  pageName={"Sign Up"}
                  loginTitle="Login"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
