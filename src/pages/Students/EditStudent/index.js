/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { MdChevronLeft, MdDone } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import history from '~/services/history';
import api from '~/services/api';

import { Container, Content } from './styles';

const updateStudentSchema = Yup.object().shape({
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

export default function EditStudent({ location }) {
  const { student } = location.state;

  const navigateManageStudents = () => {
    history.push('/students');
  };

  const updateStudent = async ({
    name,
    email,
    date_of_birth,
    weight_metric,
    height_metric,
  }) => {
    try {
      await api.put(`/students/${student.id}`, {
        name,
        email,
        date_of_birth,
        weight_metric,
        height_metric,
      });

      toast.success('Aluno atualizado com sucesso!');
      history.push('/students');
    } catch (err) {
      toast.error('Falha na ataulização, verifique os dados!');
    }
  };

  return (
    <Container>
      <div className="pageHeader">
        <h1>Edição de aluno</h1>

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
            className="updateStudent"
            type="submit"
            form="updateStudentForm"
          >
            <MdDone size={20} color="#fff" />
            SALVAR
          </button>
        </aside>
      </div>
      <Content>
        <Form
          schema={updateStudentSchema}
          onSubmit={updateStudent}
          id="updateStudentForm"
          initialData={student}
        >
          <label htmlFor="name">NOME COMPLETO</label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            required
          />
          <label htmlFor="email">ENDEREÇO DE E-MAIL</label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="exemplo@email.com"
            required
          />
          <span>
            <span>
              <label htmlFor="date_of_birth">DATA DE NASCIMENTO</label>
              <Input
                id="date_of_birth"
                name="date_of_birth"
                type="date"
                required
              />
            </span>
            <span>
              <label htmlFor="weight_metric">PESO (em kg)</label>
              <Input
                id="weight_metric"
                name="weight_metric"
                type="number"
                placeholder="60"
                required
              />
            </span>
            <span>
              <label htmlFor="height_metric">Altura (em metros)</label>
              <Input
                id="height_metric"
                name="height_metric"
                type="number"
                step="0.01"
                placeholder="1,70"
                required
              />
            </span>
          </span>
        </Form>
      </Content>
    </Container>
  );
}

EditStudent.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      student: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        date_of_birth: PropTypes.string,
        weight_metric: PropTypes.number,
        height_metric: PropTypes.number,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};
