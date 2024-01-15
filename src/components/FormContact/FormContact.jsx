import { nanoid } from 'nanoid';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  ButtonForm,
  Container,
  FormContactStyle,
  InputForm,
} from './FormContact.styled';

export function FormContact({ handleAddContact }) {
  const initialValues = {
    name: '',
    number: '',
  };

  const schema = Yup.object().shape({
    name: Yup.string(),
    number: Yup.number().min(3, 'Too Short!'),
  });

  const handlerSubmitFormic = ({ name, number }, actions) => {
    handleAddContact({
      id: nanoid(),
      name,
      number,
    });
    actions.resetForm();
  };

  return (
    <Container>
      <h2>Phonebook</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handlerSubmitFormic}
        validationSchema={schema}
      >
        <FormContactStyle>
          <label>
            Name
            <InputForm type="text" name="name" required />
            <ErrorMessage name="name" />
          </label>
          <label>
            Number
            <InputForm type="tel" name="number" required />
            <ErrorMessage name="number" />
          </label>
          <ButtonForm type="submit">Add contact</ButtonForm>
        </FormContactStyle>
      </Formik>
    </Container>
  );
}
