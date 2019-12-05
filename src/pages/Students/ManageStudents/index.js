import React, { useState, useEffect } from 'react';
import { MdSearch } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import history from '~/services/history';
import api from '~/services/api';

import RegisterButton from '~/components/RegisterButton';
import EditButton from '~/components/EditButton';
import DeleteButton from '~/components/DeleteButton';

import { Container, Scroll, ProductTable } from './styles';

const studentQuerySchema = Yup.object().shape({
  queryName: Yup.string(),
});

export default function ManageStudents() {
  const [students, setStudents] = useState([]);

  const loadStudents = async ({ queryName }) => {
    const response = await api.get('/students', {
      params: { name: queryName },
    });

    setStudents(response.data);
  };

  useEffect(() => {
    loadStudents('');
  }, []);

  const navigateNewStudent = () => {
    history.push('/students/new');
  };

  const handleDelete = async ({ id }) => {
    if (window.confirm('Você tem certeza que deseja remover este aluno?')) {
      try {
        await api.delete(`/students/${id}`);

        loadStudents('');

        toast.success('Aluno apagado com sucesso!');
      } catch (err) {
        toast.error('Falha na ataulização, verifique os dados!');
      }
    }
  };

  return (
    <Container>
      <div className="pageHeader">
        <h1>Gerenciando alunos</h1>

        <aside>
          <RegisterButton onClick={navigateNewStudent} />
          <Form schema={studentQuerySchema} onSubmit={loadStudents}>
            <button className="search" type="submit">
              <MdSearch size={20} color="#999" />
            </button>
            <Input name="queryName" type="text" placeholder="Buscar aluno" />
          </Form>
        </aside>
      </div>
      <Scroll>
        <ProductTable>
          <thead>
            <tr>
              <th className="id">ID</th>
              <th className="name">NOME</th>
              <th className="email">E-MAIL</th>
              <th className="age">IDADE</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr>
                <td className="id">
                  <strong>{student.id}</strong>
                </td>
                <td className="name">
                  <strong>{student.name}</strong>
                </td>
                <td className="email">
                  <strong>{student.email}</strong>
                </td>
                <td className="age">
                  <strong>{student.age}</strong>
                </td>
                <td className="options">
                  <EditButton
                    to={{ pathname: '/students/edit', state: { student } }}
                  />

                  <DeleteButton onClick={handleDelete} remove={student} />
                </td>
              </tr>
            ))}
          </tbody>
        </ProductTable>
      </Scroll>
    </Container>
  );
}
