import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido!')
    .required('O e-mail é obrigatório!'),
  password: Yup.string()
    .min(6, 'No mínimo 6 caracteres!')
    .required('A senha é obrigatório!'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  const handleSubmit = ({ email, password }) => {
    dispatch(signInRequest(email, password));
  };

  return (
    <>
      <img src={logo} alt="GymPoint" />

      <Form schema={signInSchema} onSubmit={handleSubmit}>
        <label htmlFor="email">SEU E-MAIL </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="exemplo@gympoint.com"
        />
        <label htmlFor="password">SUA SENHA</label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="*************"
        />

        <button type="submit">{loading ? 'Carregando...' : 'Acessar'}</button>
      </Form>
    </>
  );
}
