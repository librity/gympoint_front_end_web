import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo_small.svg';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const user = useSelector(state => state.auth.profile);

  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(signOut());
  };

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GymPoint" />
          <Link to="/students">ALUNOS</Link>
          <Link to="/plans">PLANOS</Link>
          <Link to="/memberships">MATRÍCULAS</Link>
          <Link to="/help_orders">PEDIDOS DE AUXÍLIO</Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{user.name}</strong>
              <button type="button" onClick={handleLogOut}>
                sair do sistema
              </button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
