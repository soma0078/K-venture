import * as yup from 'yup';

export const activityFormSchema = yup.object().shape({
  title: yup.string().required('제목을 입력해주세요.'),
  description: yup.string().required('설명을 입력해주세요.'),
  price: yup
    .number()
    .typeError('가격은 숫자여야 합니다.')
    .positive('가격은 양수여야 합니다.')
    .integer('가격은 정수여야 합니다.')
    .required('가격을 입력해주세요.')
    .transform((value, originalValue) =>
      typeof originalValue === 'string' && originalValue.trim() === ''
        ? null
        : value,
    ),
  address: yup.string().required('주소를 입력해주세요.'),
});
