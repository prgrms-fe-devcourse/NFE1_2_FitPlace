import RegisterInput from "../../components/RegisterInput";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { initializeUser, isLogin } from "../../data/store";
import { Cookies } from "react-cookie";

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cookies = new Cookies();

  const setCookie = (name: string, value: string, opt: object) => {
    return cookies.set(name, value, { ...opt })
  }

  const handleLogin = () => {
    axios.post('https://kdt.frontend.5th.programmers.co.kr:5009/login', {
      email: email,
      password: password
    })
    .then(res => {
        if(res.status === 200) {
          const { token } = res.data
          setCookie("token", `bearer ${token}`, {
            path: '/',
            sameSite: "strict",
            secure: true
          })
          setLoginError(false)
          dispatch(initializeUser(res.data.user))
          // 임시로 profile페이지로 감 추후 메인으로 바꿔야함
          // navigate('/')
          navigate('/profile')
        }
      }
    )
    .catch(err => err.status === 400 ? setLoginError(true) : null)
  }

  return (
    <div className="flex flex-col justify-center items-stratch w-140 h-full px-5 bg-white">
      <h2 className="text-heading mb-36 font-black text-center">FitPlace</h2>
      <RegisterInput
        type="text"
        placeholder="이메일"
        margin="mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <RegisterInput
        type="password"
        placeholder="비밀번호"
        margin="mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button label="로그인" size="full" color="green" onClick={handleLogin} />
      <Link to={"/register"} className="text-placeholder mt-6 text-center">
        회원가입
      </Link>
      <p className="text-center text-red-600 font-bold mt-6">{ loginError ? "아이디 혹은 비밀번호를 확인해주세요" : null }</p>
    </div>
  );
};

export default Login;
