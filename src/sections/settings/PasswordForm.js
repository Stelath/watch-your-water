import * as Yup from 'yup';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

export default function PasswordForm({ onSubmit }) {
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string()
      .notOneOf([Yup.ref('oldPassword'), null], 'New password cannot be the same')
      .required('New Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required()
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: ({ oldPassword, newPassword }) => {
      onSubmit(oldPassword, newPassword);
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Old Password"
            {...getFieldProps('oldPassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.oldPassword && errors.oldPassword)}
            helperText={touched.oldPassword && errors.oldPassword}
          />

          <TextField
            fullWidth
            autoComplete="new-password"
            type="text"
            label="New Password"
            {...getFieldProps('newPassword')}
            error={Boolean(touched.newPassword && errors.newPassword)}
            helperText={touched.newPassword && errors.newPassword}
          />

          <TextField
            fullWidth
            autoComplete="new-password"
            type="text"
            label="Confirm Password"
            {...getFieldProps('confirmPassword')}
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ mt: 2 }}
        >
          Change Password
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}

PasswordForm.propTypes = {
  onSubmit: PropTypes.func
};
