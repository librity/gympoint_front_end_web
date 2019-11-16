import React from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';

import { Container } from './styles';

export default function Students() {
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
    </Container>
  );
}
