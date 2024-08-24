import * as yup from 'yup';

const baseSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
      '이메일 형식으로 입력해주세요.',
    )
    .required('이메일을 입력해주세요'),
  password: yup
    .string()
    .min(8, '8자 이상 입력해주세요')
    .required('비밀번호를 입력해주세요'),
});

const loginSchema = baseSchema;

const signupSchema = baseSchema.shape({
  nickname: yup
    .string()
    .max(10, '10자 이하로 입력해주세요')
    .required('닉네임을 입력해주세요'),
  password_confirm: yup
    .string()
    .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호를 입력해주세요'),
});

export { loginSchema, signupSchema };
