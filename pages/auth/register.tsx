import React from 'react';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../../components/layouts';
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import { validations } from '../../utils';
import { ecommerceApi } from '../../api';

interface FormData {
  name: string;
  email: string;
  password: string;
  password2: string;
}

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>();
  const onRegister = async ({ name, email, password }: FormData) => {
    try {
      const { data } = await ecommerceApi.post('/user/register', {
        name,
        email,
        password,
      });
      const { token, user } = data;
      console.log({ token, user });
    } catch (error) {
      console.error('Hubo un error enviando la solicitud de registro');
    }
  };
  return (
    <AuthLayout title='Ingresar'>
      <form onSubmit={handleSubmit(onRegister)}>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1'>
                Crear cuenta
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Nombre'
                variant='filled'
                fullWidth
                {...register('name', {
                  required: 'Este campo es requerido',
                  minLength: {
                    value: 2,
                    message: 'Minimo 2 caracteres',
                  },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Correo'
                variant='filled'
                fullWidth
                {...register('email', {
                  required: 'Este campo es requerido',
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Contraseña'
                variant='filled'
                fullWidth
                {...register('password', {
                  required: 'Este campo es requerido',
                  minLength: {
                    value: 6,
                    message: 'Minimo 6 caracteres',
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Confirmar contraseña'
                variant='filled'
                fullWidth
                {...register('password2', {
                  required: 'Este campo es requerido',
                  minLength: {
                    value: 6,
                    message: 'Minimo 6 caracteres',
                  },
                  validate: (value) =>
                    value === getValues('password')
                      ? undefined
                      : 'Las contraseñas no coiciden',
                })}
                error={!!errors.password2}
                helperText={errors.password2?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type='submit'
                color='secondary'
                className='circular-btn'
                size='large'
                fullWidth
              >
                Ingresar
              </Button>
            </Grid>
            <Grid item xs={12} display='flex' justifyContent='end'>
              <NextLink href='/auth/login' passHref>
                <Link underline='always'>¿Ya tienes cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
