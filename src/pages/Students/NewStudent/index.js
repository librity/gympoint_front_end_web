import React from 'react';
import { MdChevronLeft, MdDone } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import history from '~/services/history';
import api from '~/services/api';

import { Container, Content } from './styles';

const submitNewStudentSchema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório!'),
  email: Yup.string()
    .email('Insira um e-mail válido!')
    .required('O e-mail é obrigatório!'),
  date_of_birth: Yup.date('Insira uma data válida!').required(),
  weight_metric: Yup.number(),
  height_metric: Yup.number(),
});

export default function Students() {
  const navigateManageStudents = () => {
    history.push('/students');
  };

  const submitNewStudent = async ({
    name,
    email,
    date_of_birth,
    weight_metric,
    height_metric,
  }) => {
    try {
      // console.tron.log(queryName);
      await api.post('/students', {
        body: { name, email, date_of_birth, weight_metric, height_metric },
      });

      history.push('/students');
      toast.success('Aluno cadastrado com sucesso!');
    } catch (err) {
      toast.error('Falha no cadastro, verifique os dados!');
    }
  };

  return (
    <Container>
      <div>
        <h1>Cadastro de aluno</h1>

        <aside>
          <button
            className="navigateManageStudents"
            type="button"
            onClick={navigateManageStudents}
          >
            <MdChevronLeft size={20} color="#fff" />
            VOLTAR
          </button>
          <button
            className="submitNewStudent"
            type="submit"
            onClick={submitNewStudent}
          >
            <MdDone size={20} color="#fff" />
            SALVAR
          </button>
        </aside>
      </div>
      <Content>
        <Form schema={submitNewStudentSchema} onSubmit={submitNewStudent}>
          <strong>NOME COMPLETO</strong>
          <Input name="name" type="text" placeholder="John Doe" />
          <strong>ENDEREÇO DE E-MAIL</strong>
          <Input name="email" type="email" placeholder="exemplo@email.com" />
          <div>
            <strong>IDADE</strong>
            <Input name="date_of_birth" type="date" />
            <strong>PESO (em kg)</strong>
            <Input name="weight_metric" type="number" placeholder="60" />
            <strong>Altura (em m)</strong>
            <Input name="height_metric" type="number" placeholder="1,70" />
          </div>
        </Form>
      </Content>
    </Container>
  );
}
