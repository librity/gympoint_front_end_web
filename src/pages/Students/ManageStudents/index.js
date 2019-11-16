import React, { useState, useEffect } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';

import history from '~/services/history';
import api from '~/services/api';

import { Container, Content, ProductTable } from './styles';

export default function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const loadStudents = async () => {
      const response = await api.get('students');

      setStudents(response.data);
    };

    loadStudents();
  }, []);

  const registerStudent = () => {
    history.push('/students/new');
  };

  const handleSearch = async ({ queryName }) => {
    // console.tron.log(queryName);

    const response = await api.get('/students', {
      params: { name: queryName },
    });

    setStudents(response.data);
  };

  return (
    <Container>
      <div>
        <h1>Gerenciando alunos</h1>

        <aside>
          <button
            className="registerStudent"
            type="button"
            onClick={registerStudent}
          >
            <MdAdd size={20} color="#fff" />
            CADASTRAR
          </button>
          <Form onSubmit={handleSearch}>
            <button className="search" type="submit">
              <MdSearch size={20} color="#999" />
            </button>
            <Input name="queryName" type="text" placeholder="Buscar aluno" />
          </Form>
        </aside>
      </div>
      <Content>
        <ProductTable>
          <thead>
            <tr>
              <th className="name">NOME</th>
              <th className="email">E-MAIL</th>
              <th className="age">IDADE</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr>
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
                  <button className="edit" type="button" onClick={() => {}}>
                    editar
                  </button>
                  <button className="delete" type="button" onClick={() => {}}>
                    apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </ProductTable>
      </Content>
    </Container>
  );
}
