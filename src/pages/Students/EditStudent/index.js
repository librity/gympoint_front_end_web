/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import history from '~/services/history';
import api from '~/services/api';

import ReturnButton from '~/components/ReturnButton';
import SaveButton from '~/components/SaveButton';
import StudentForm from '~/components/StudentForm';

import { Container } from './styles';

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
          <ReturnButton onClick={navigateManageStudents} />

          <SaveButton form="studentForm" />
        </aside>
      </div>
      <StudentForm
        student={student}
        schema={updateStudentSchema}
        onSubmit={updateStudent}
      />
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
