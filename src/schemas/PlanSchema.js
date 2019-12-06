import * as Yup from 'yup';

const PlanSchema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório!'),

  duration: Yup.number()
    .integer('Insira número inteiro!')
    .min(1, 'Duração mínima: 1 mês!')
    .max(24, 'Duração máxima: 24 mês!')
    .required('A duração é obrigatória!'),

  price: Yup.number('Insira número!')
    .min(0.0, 'Preço mínimo: R$ 0,00!')
    .max(1000.0, 'Preço máximo: R$ 1000,00!')
    .required('O preço é obrigatório!'),
});

export default PlanSchema;
