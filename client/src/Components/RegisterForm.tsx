import { FcGoogle } from "react-icons/fc";
import OAuthBtn from "./OAuthBtn";
import EmailRegisterForm from "./EmailRegisterForm";

const RegisterForm = () => {
  return (
    <div className="form">
      <h2 className="formHeader">Register To Access Our Services</h2>
      <div className="flex flex-col space-y-2 mt-6">
        <OAuthBtn method={'google'} />
        <OAuthBtn method={'github'} />
      </div>
      <div className="flex row justify-between items-center">
        <div className="h-[1px] w-[44%] bg-gray-200" />
        <p className="font-semibold md:text-[16px] text-[14px] text-gray-500">OR</p>
        <div className="h-[1px] w-[44%] bg-gray-200" />
      </div>
      <div className="w-full">
        <EmailRegisterForm />
      </div>
    </div>
  )
}

export default RegisterForm