interface FieldErrorProps {
  error?: string[];
}

const FieldError = ({ error }: FieldErrorProps) => {

  if (!error?.length) return null;

  return (
    <div
      className="w-full rounded-md py-2"
      role="alert"
    >
      <p className="text-sm text-red-700">
        {error[0]}
      </p>
    </div>
  );
};

export default FieldError;