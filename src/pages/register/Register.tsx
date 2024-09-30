import { useState } from "react";
import Button from "../../components/Button";
import RegisterInput from "../../components/RegisterInput";
import axios from "axios";

const Register = () => {

  const [userId, setUserId] = useState('')
  const [userPw, setUserPw] = useState('')
  const [userPwConfirm, setUserPwConfirm] = useState('')
  const [userName, setUserName] = useState('')
  const [userBirth, setUserBirth] = useState('')
  const [userEmail, setUserEmail] = useState('')

  const handleRegi = () => {
    let regiObj: { email?: string, password?: string, fullName?: string } = {}
    const stringObj = {
      fullName: userName,
      birth: userBirth,
      userId: userId,
    }
    
    if (userPw === userPwConfirm) {
      regiObj.email = userEmail
      regiObj.fullName = JSON.stringify(stringObj);
      regiObj.password = userPw
    }

    axios.post('https://kdt.frontend.5th.programmers.co.kr:5009/signup', {
      ...regiObj
    })
    .then(res => {
      alert('회원가입이 완료되었습니다.')
      console.log(res)
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="flex flex-col justify-center items-stratch w-140 h-full  px-5 bg-white">
      <h2 className="text-heading mb-14 font-black text-center">FitPlace</h2>
      {/* 아이디 입력 */}
      <RegisterInput
        type="text"
        placeholder="아이디"
        margin="mb-3"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <p
        className="
        mb-3
        w-full
        text-left
        text-lg
        text-medium
      "
      >
        사용가능한 아이디 입니다
      </p>

      {/* 비밀번호 입력 */}
      <RegisterInput
        type="password"
        placeholder="비밀번호"
        margin="mb-3"
        value={userPw}
        onChange={(e) => setUserPw(e.target.value)}
      />
      <p
        className="
        mb-3
        w-full
        text-left
        text-lg
        text-medium
      "
      >
        사용가능한 비밀번호 입니다
      </p>

      {/* 비밀번호 확인 */}
      <RegisterInput
        type="password"
        placeholder="비밀번호 확인"
        margin="mb-3"
        value={userPwConfirm}
        onChange={(e) => setUserPwConfirm(e.target.value)}
      />
      <p
        className="
        mb-3
        w-full
        text-left
        text-lg
        text-medium
      "
      >
        비밀번호가 일치하지 않습니다
      </p>

      {/* 하단 기타정보 */}
      <div className="w-full mt-12 mb-24">
        <RegisterInput 
          type="text"
          placeholder="이름"
          margin="mb-5"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <RegisterInput 
          type="text"
          placeholder="생년월일"
          margin="mb-5"
          value={userBirth}
          onChange={(e) => setUserBirth(e.target.value)}
        />
        <RegisterInput 
          type="text"
          placeholder="이메일"
          margin="mb-5"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <p
          className="
          mb-3
          w-full
          text-left
          text-lg
          text-medium
        "
        >
          사용 가능한 이메일 입니다
        </p>
      </div>

      <Button label="회원가입" size="full" color="green" onClick={handleRegi}/>
    </div>
  );
};

export default Register;
