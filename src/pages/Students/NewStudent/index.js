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

  date_of_birth: Yup.date('Insira uma data válida!')
    .min('1900-01-01', 'Insira uma data válida!')
    .max(new Date(), 'Insira uma data válida!')
    .required('A data de nascimento é obrigatória!'),

  weight_metric: Yup.number('Insira um número inteiro!')
    .integer('Apenas números inteiros!')
    .min(0, 'Insira um peso válido!')
    .max(635, 'Insira um peso válido!')
    .required('A altura é obrigatória!'),

  height_metric: Yup.number('Insira um número válido!')
    .min(0, 'Insira uma altura válida!')
    .max(2.72, 'Insira uma altura válida!')
    .required('A altura é obrigatória!'),
});

export default function NewStudent() {
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
      await api.post('/students', {
        name,
        email,
        date_of_birth,
        weight_metric,
        height_metric,
      });

      toast.success('Aluno cadastrado com sucesso!');
      history.push('/students');
    } catch (err) {
      // console.tron.log(err);
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
            form="submitNewStudentForm"
          >
            <MdDone size={20} color="#fff" />
            SALVAR
          </button>
        </aside>
      </div>
      <Content>
        <Form
          schema={submitNewStudentSchema}
          onSubmit={submitNewStudent}
          id="submitNewStudentForm"
        >
          <strong>NOME COMPLETO</strong>
          <Input name="name" type="text" placeholder="John Doe" />
          <strong>ENDEREÇO DE E-MAIL</strong>
          <Input name="email" type="email" placeholder="exemplo@email.com" />
          <span>
            <span>
              <strong>DATA DE NASCIMENTO</strong>
              <Input name="date_of_birth" type="date" required />
            </span>
            <span>
              <strong>PESO (em kg)</strong>
              <Input
                name="weight_metric"
                type="number"
                placeholder="60"
                required="false"
              />
            </span>
            <span>
              <strong>Altura (em metros)</strong>
              <Input
                name="height_metric"
                type="number"
                step="0.01"
                placeholder="1,70"
                required="false"
              />
            </span>
          </span>
        </Form>
      </Content>
    </Container>
  );
}
