import Button from "../../components/Button";
import RegisterInput from "../../components/RegisterInput";

const Register = () => {
  return (
    <div className="flex flex-col justify-center items-stratch w-140 h-full  px-5 bg-white">
      <h2 className="text-heading mb-14 font-black text-center">FitPlace</h2>
      {/* 아이디 입력 */}
      <RegisterInput type="text" placeholder="아이디" margin="mb-3" />
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
      <RegisterInput type="password" placeholder="비밀번호" margin="mb-3" />
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
        <RegisterInput type="text" placeholder="이름" margin="mb-5" />
        <RegisterInput type="text" placeholder="생년월일" margin="mb-5" />
        <RegisterInput type="text" placeholder="이메일" margin="mb-5" />
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

      <Button label="회원가입" size="full" color="green" />
    </div>
  );
};

export default Register;
