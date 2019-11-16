import React, { useState, useEffect } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';

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

  return (
    <Container>
      <div>
        <h1>Gerenciando alunos</h1>

        <aside>
          <button type="button">
            <MdAdd size={20} />
            CADASTRAR
          </button>
          <MdSearch size={20} />
          <input placeholder="Buscar aluno" />
        </aside>
      </div>
      <Content>
        <ProductTable>
          <thead>
            <tr>
              <th className="name">NOME</th>
              <th className="email">E-MAIL</th>
              <th className="age">IDADE</th>
              <th className="options" />
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
