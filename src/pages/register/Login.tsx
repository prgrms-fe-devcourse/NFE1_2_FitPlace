import RegisterInput from "../../components/RegisterInput";

const Login = () => {
  return (
    <div className="flex flex-col justify-center items-center w-140 h-full border-solid border-2 border-neutral-400">
      <h2 className="text-heading">FitPlace</h2>
      <RegisterInput type={'text'} />
      <RegisterInput type={'password'} />
    </div>
  );
};

export default Login;
