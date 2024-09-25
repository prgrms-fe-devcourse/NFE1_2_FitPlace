interface RegiProps {
  type: string
}

const RegisterInput = (props: RegiProps) => {
  return (
    <>
      <input
        type={props.type}
        className="px-3.5 py-2.5 text-lg w-full"
      />
    </>
  );
};

export default RegisterInput;