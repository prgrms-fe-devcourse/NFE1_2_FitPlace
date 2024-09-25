interface RegiProps {
  text: string
  margin?: string
}

const RegisterInput = (props: RegiProps) => {
  return (
    <div className={`w-full ${props.margin}`}>
      <button
        className="w-full bg-primary text-placeholder text-lg py-4 leading-button rounded"
      >{ props.text }</button>
    </div>
  );
};

export default RegisterInput;