import RegisterInput from "../../components/RegisterInput";
import { Link } from "react-router-dom";
import Button from "../../components/Button";

const Login = () => {
  return (
    <div className="flex flex-col justify-center items-stratch w-140 h-full px-5 bg-white">
      <h2 className="text-heading mb-36 font-black text-center">FitPlace</h2>
      <RegisterInput type="text" placeholder="이메일" margin="mb-4" />
      <RegisterInput type="password" placeholder="비밀번호" margin="mb-4" />
      <Button label="로그인" size="full" color="green" />
      <Link to={"/register"} className="text-placeholder mt-6 text-center">
        회원가입
      </Link>
    </div>
  );
};

export default Login;
