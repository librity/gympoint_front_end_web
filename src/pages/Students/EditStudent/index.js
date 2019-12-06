/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import ReturnButton from '~/components/ReturnButton';
import SaveButton from '~/components/SaveButton';
import StudentForm from '~/components/StudentForm';

import StudentSchema from '~/schemas/StudentSchema';

import { Container } from './styles';

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
        schema={StudentSchema}
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
