import * as Yup from 'yup';

const StudentSchema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório!'),

  email: Yup.string()
    .email('Insira um e-mail válido!')
    .required('O e-mail é obrigatório!'),

  date_of_birth: Yup.date('Insira uma data válida!')
    .min('1900-01-01', 'Insira uma data válida!')
    .max(new Date(), 'Insira uma data válida!')
    .required('A data de nascimento é obrigatória!'),

  weight_metric: Yup.number('Insira um número inteiro!')
    .integer('Apenas números inteiros!')
    .min(0, 'Insira um peso válido!')
    .max(635, 'Insira um peso válido!')
    .required('A altura é obrigatória!'),

  height_metric: Yup.number('Insira um número válido!')
    .min(0, 'Insira uma altura válida!')
    .max(2.72, 'Insira uma altura válida!')
    .required('A altura é obrigatória!'),
});

export default StudentSchema;
