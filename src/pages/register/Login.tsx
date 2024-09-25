import RegisterInput from "../../components/RegisterInput";
import RegisterBtn from '../../components/RegisterBtn';
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <form className="flex flex-col justify-center items-center w-140 h-full border-solid border-2 border-neutral-400 px-5 bg-white">
      <h2 className="text-heading mb-36">FitPlace</h2>
      <RegisterInput 
        type="text"
        placeholder="이메일"
        margin="mb-4"
      />
      <RegisterInput
        type="password"
        placeholder="비밀번호"
        margin="mb-4"
      />
      <RegisterBtn 
        text="로그인"
        margin="mb-8"
      />
      <Link to={'/register'} className="text-placeholder">회원가입</Link>
    </form>
  );
};

export default Login;
