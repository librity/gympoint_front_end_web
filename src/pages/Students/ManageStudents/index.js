import React, { useState, useEffect, useCallback } from 'react';
import { MdSearch } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import history from '~/services/history';
import api from '~/services/api';

import RegisterButton from '~/components/RegisterButton';
import EditButton from '~/components/EditButton';
import DeleteButton from '~/components/DeleteButton';
import PageNavigation from '~/components/PageNavigation';

import { Container, Scroll, ProductTable } from './styles';

const studentQuerySchema = Yup.object().shape({
  queryName: Yup.string(),
});

export default function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const requestsPerPage = 10;

  // const loadStudents = useCallback(() => {
  //   setTechs([...techs, newTech]);
  //   setNewTech('');
  // }, [techs, newTech]);

  const loadStudents = async ({ queryName }) => {
    if (queryName !== name) {
      setName(queryName);
      setPage(1);
    }

    const response = await api.get('/students', {
      params: { name, page, requestsPerPage },
    });

    setStudents(response.data.rows);
    setCount(response.data.count);
  };

  useEffect(() => {
    loadStudents({ queryName: name });
  }, [page, name]);

  const navigateNewStudent = () => {
    history.push('/students/new');
  };

  const handleDelete = async ({ id }) => {
    if (window.confirm('Você tem certeza que deseja remover este aluno?')) {
      try {
        await api.delete(`/students/${id}`);

        loadStudents({ queryName: name });

        toast.success('Aluno apagado com sucesso!');
      } catch (err) {
        toast.error('Falha na ataulização, verifique os dados!');
      }
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (count % (page * requestsPerPage) < requestsPerPage - 1) {
      setPage(page + 1);
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
        <PageNavigation previous={handlePrevious} next={handleNext} />
      </Scroll>
    </Container>
  );
}
