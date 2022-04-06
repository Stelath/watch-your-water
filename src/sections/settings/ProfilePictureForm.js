import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

export default function ProfilePictureForm({ onSubmit }) {
  const LoginSchema = Yup.object().shape({
    url: Yup.string().url('Must be a valid URL').required('URL is required')
  });

  const formik = useFormik({
    initialValues: {
      url: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: ({ url }) => {
      onSubmit(url);
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <TextField
          fullWidth
          type="url"
          label="New URL"
          {...getFieldProps('url')}
          error={Boolean(touched.url && errors.url)}
          helperText={touched.url && errors.url}
        />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ mt: 2 }}
        >
          Change Profile Picture
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}

ProfilePictureForm.propTypes = {
  onSubmit: PropTypes.func
};
