import React, { useState, useMemo } from 'react';
import { MdChevronLeft, MdDone } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { parseISO, format, addYears } from 'date-fns';
import pt from 'date-fns/locale/pt';

import history from '~/services/history';
import api from '~/services/api';

import { formatPricePtBr } from '~/util/format';

import { Container, Content } from './styles';

const submitNewMembershipSchema = Yup.object().shape({
  student_id: Yup.number()
    .integer()
    .min(1, 'Insira um aluno válido!')
    .required('O aluno é obrigatório!'),

  plan_id: Yup.number()
    .integer()
    .min(1, 'Insira um plano válido!')
    .required('O plano é obrigatório!'),

  start_date: Yup.date('Insira uma data válida!')
    .min(new Date(), 'Matriculas não podem ser criadas retroativamente!')
    .max(
      addYears(new Date(), 3),
      'Matriculas não podem ser agendadas mais do que três anos!'
    )
    .required('A data de início é obrigatória!'),
});

export default function NewMembership() {
  const [membershipDuration, setMembershipDuration] = useState(0);
  const [membershipPrice, setMembershipPrice] = useState(0);

  const totalPrice = useMemo(
    () => formatPricePtBr(membershipDuration * membershipPrice),
    [membershipDuration, membershipPrice]
  );

  const navigateManageMemberships = () => {
    history.push('/Memberships');
  };

  const submitNewMembership = async ({ title, duration, price }) => {
    try {
      await api.post('/Memberships', {
        title,
        duration,
        price,
      });

      toast.success('Aluno cadastrado com sucesso!');
      history.push('/Memberships');
    } catch (err) {
      // console.tron.log(err);
      toast.error('Falha no cadastro, verifique os dados!');
    }
  };

  return (
    <Container>
      <div>
        <h1>Cadastro de matrícula</h1>

        <aside>
          <button
            className="navigateManageMemberships"
            type="button"
            onClick={navigateManageMemberships}
          >
            <MdChevronLeft size={20} color="#fff" />
            VOLTAR
          </button>
          <button
            className="submitNewMembership"
            type="submit"
            form="submitNewMembershipForm"
          >
            <MdDone size={20} color="#fff" />
            SALVAR
          </button>
        </aside>
      </div>
      <Content>
        <Form
          schema={submitNewMembershipSchema}
          onSubmit={submitNewMembership}
          id="submitNewMembershipForm"
        >
          <label htmlFor="nome">ALUNO</label>
          <Input
            id="nome"
            name="nome"
            type="text"
            required
            placeholder="Buscar aluno"
          />
          <span>
            <span>
              <label htmlFor="plan">PLANO</label>
              <Input
                id="plan"
                name="plan"
                type="number"
                required
                value={membershipDuration}
                onInput={e => setMembershipDuration(e.target.value)}
                placeholder="Selecione o plano"
              />
            </span>
            <span>
              <label htmlFor="start_date">DATA DE INÍCIO</label>
              <Input
                id="start_date"
                name="start_date"
                type="number"
                step="0.01"
                required
                value={membershipPrice}
                onInput={e => setMembershipPrice(e.target.value)}
                placeholder="Escolha a data"
              />
            </span>
            <span>
              <label htmlFor="end_date">DATA DE TÉRMINO</label>
              <Input
                id="end_date"
                name="end_date"
                type="text"
                readOnly
                value={totalPrice}
              />
            </span>
            <span>
              <label htmlFor="total_price">VALOR FINAL</label>
              <Input
                id="total_price"
                name="total_price"
                type="text"
                readOnly
                value={totalPrice}
              />
            </span>
          </span>
        </Form>
      </Content>
    </Container>
  );
}
