import React from 'react';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import ReturnButton from '~/components/ReturnButton';
import SaveButton from '~/components/SaveButton';
import StudentForm from '~/components/StudentForm';

import StudentSchema from '~/schemas/StudentSchema';

import { Container } from './styles';

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
      toast.error('Falha no cadastro, verifique os dados!');
    }
  };

  return (
    <Container>
      <div className="pageHeader">
        <h1>Cadastro de aluno</h1>

        <aside>
          <ReturnButton onClick={navigateManageStudents} />

          <SaveButton form="studentForm" />
        </aside>
      </div>
      <StudentForm schema={StudentSchema} onSubmit={submitNewStudent} />
    </Container>
  );
}
