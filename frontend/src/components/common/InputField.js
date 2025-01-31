import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

const InputField = ({ name, label, type = 'text', rules }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <TextField
      fullWidth
      margin="normal"
      label={label}
      type={type}
      error={!!errors[name]}
      helperText={errors[name]?.message}
      {...register(name, rules)}
    />
  );
};

export default InputField;
