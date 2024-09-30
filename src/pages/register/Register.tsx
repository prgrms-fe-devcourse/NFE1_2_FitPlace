import { useEffect, useState } from "react";
import Button from "../../components/Button";
import RegisterInput from "../../components/RegisterInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  const [userId, setUserId] = useState('')
  const [userPw, setUserPw] = useState('')
  const [userPwConfirm, setUserPwConfirm] = useState('')
  const [userName, setUserName] = useState('')
  const [userBirth, setUserBirth] = useState('')
  const [userEmail, setUserEmail] = useState('')

  const [checkEmail, setCheckEmail] = useState(0);
  const [checkPw, setCheckPw] = useState(false);

  const [emailMsg, setEmailMsg] = useState('');

  // 비밀번호 일치 체크
  useEffect(() => {
    userPw === userPwConfirm ? setCheckPw(true) : setCheckPw(false)
  }, [userPwConfirm])

  // 이메일 검사
  useEffect(() => {
    switch (checkEmail) {
      case -1:
        setEmailMsg("유효한 이메일 주소가 아닙니다")
        break;
      case 0:
        setEmailMsg("사용가능한 이메일 주소입니다")
        break;
      case 1:
        setEmailMsg("이미 등록된 이메일 주소입니다.")
        break;
    }
  }, [checkEmail])

  useEffect(() => {
    axios.post('https://kdt.frontend.5th.programmers.co.kr:5009/login', {
      "email": "test7@gmail.com",
	    "password": "test123"
    })
    .then(res => {
      console.log(res.data.user)
      console.log(res.data.user.fullName)
      console.log(JSON.parse(res.data.user.fullName).birth)
    });
  }, [])

  function regEmail(){
    const reg = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

    reg.test(userEmail) ? setCheckEmail(0) : setCheckEmail(-1);
  }

  const handleRegi = () => {
    let regiObj: { email?: string, password?: string, fullName?: string } = {}
    const stringObj = {
      fullName: userName,
      birth: userBirth,
      userId: userId,
    }
    
    if (checkEmail === 0 && checkPw === true) {
      regiObj.email = userEmail
      regiObj.fullName = JSON.stringify(stringObj);
      regiObj.password = userPw;

      axios.post('https://kdt.frontend.5th.programmers.co.kr:5009/signup', {
        ...regiObj
      })
      .then(res => {
        const regiName = JSON.parse(res.data.user.fullName)
        alert(`${regiName.fullName}님 회원가입이 완료되었습니다!`)
        navigate('/')
      })
      .catch(err => {
        err.response.data === "The email address is already being used." ?
        setCheckEmail(1)
        : null
      })
    } else {
      alert('회원가입창을 다시 수정해주십시요')
    }
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
        {/* 사용가능한 아이디 입니다 */}
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
        {/* 사용가능한 비밀번호 입니다 */}
      </p>

      {/* 비밀번호 확인 */}
      <RegisterInput
        type="password"
        placeholder="비밀번호 확인"
        margin="mb-3"
        value={userPwConfirm}
        onChange={(e) => {
          setUserPwConfirm(e.target.value)
        }}
      />
      <p
        className={`
        mb-3
        w-full
        text-left
        text-lg
        text-medium
        ${ !checkPw ? "text-red-600" : null }
      `}
      >
        { !checkPw ? "비밀번호가 일치하지 않습니다" : null }
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
          placeholder="생년월일 ex)20240930"
          margin="mb-5"
          value={userBirth}
          onChange={(e) => setUserBirth(e.target.value)}
        />
        <RegisterInput 
          type="text"
          placeholder="이메일"
          margin="mb-5"
          value={userEmail}
          onChange={(e) => {
            setUserEmail(e.target.value)
            regEmail()
          }}
        />
        <p
          className={`
          mb-3
          w-full
          text-left
          text-lg
          text-medium
          ${checkEmail ? 'text-red-600 font-bold' : null}
        `}
        >
          {emailMsg}
        </p>
      </div>

      <Button label="회원가입" size="full" color="green" onClick={handleRegi}/>
    </div>
  );
};

export default Register;
