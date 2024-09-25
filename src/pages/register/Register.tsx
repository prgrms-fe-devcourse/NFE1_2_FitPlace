import RegisterInput from '../../components/RegisterInput';

const Register = () => {
  return (
    <div className="flex flex-col justify-center items-center w-140 h-full border-solid border-2 border-neutral-400 px-5 bg-white">
      {/* 아이디 입력 */}
      <RegisterInput
        type='text'
        placeholder='아이디'
        margin='mb-3'
      />
      <p className='
        mb-3
        w-full
        text-left
        text-lg
        text-medium
      '>사용가능한 아이디 입니다</p>

      {/* 비밀번호 입력 */}
      <RegisterInput 
        type='password'
        placeholder='비밀번호'
        margin='mb-3'
      />
      <p className='
        mb-3
        w-full
        text-left
        text-lg
        text-medium
      '>사용가능한 비밀번호 입니다</p>

      {/* 비밀번호 확인 */}
      <RegisterInput 
        type='password'
        placeholder='비밀번호 확인'
        margin='mb-3'
      />
      <p className='
        mb-3
        w-full
        text-left
        text-lg
        text-medium
      '>비밀번호가 일치하지 않습니다</p>

      {/* 하단 기타정보 */}
      <div className='w-full'>
        <RegisterInput 
          type='text'
          placeholder='이름'
          margin='mb-5'
        />
        <RegisterInput
          type='text'
          placeholder='생년월일'
          margin='mb-5'
        />
        <RegisterInput
          type='text'
          placeholder='이메일'
          margin='mb-5'
        />
        <p className='
          mb-3
          w-full
          text-left
          text-lg
          text-medium
        '>비밀번호가 일치하지 않습니다</p>
      </div>
    </div>
  );
};

export default Register;