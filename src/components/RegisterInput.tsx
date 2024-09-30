interface LoginProps {
  type: string
  placeholder: string
  margin?: string
  minLength?: number
  maxLength?: number
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const inputStyle = {
  border: '1px solid #e8e8e8'
}

const RegisterInput = (props: LoginProps) => {
  return (
    <div className={`w-full ${props.margin}`}>
      <input
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
        className="px-3.5 py-2.5 text-lg w-full placeholder:text-placeholder text-black leading-input rounded focus:outline-none"
        style={inputStyle}
      />
    </div>
  );
};

export default RegisterInput;