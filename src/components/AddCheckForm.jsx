import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { CURRENCIES, CATEGORIES } from '../constants'

const AddCheckForm = ({ onAdd }) => {
  return (
    <Formik
      initialValues={{
        name: '',
        amount: '',
        date: new Date(),
        category: '',
        currency: '₽'
      }}
      validationSchema={Yup.object({
        name: Yup.string().required('Название обязательно'),
        amount: Yup.number()
          .typeError('Сумма должна быть числом')
          .positive('Сумма должна быть больше 0')
          .required('Сумма обязательна'),
        date: Yup.date().required('Дата обязательна'),
        category: Yup.string().required('Категория обязательна'),
        currency: Yup.string().required('Выберите валюту'),
      })}
      onSubmit={(values, { resetForm }) => {
        const formattedDate = values.date.toISOString().split('T')[0]
        onAdd({ ...values, date: formattedDate })
        resetForm()
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <div style={{ marginBottom: '0.3rem' }}>
            <label>Название:</label><br />
            <Field name="name" />
            <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
          </div>

          <div style={{ marginBottom: '0.3rem' }}>
            <label>Сумма:</label><br />
            <Field name="amount" />
            <ErrorMessage name="amount" component="div" style={{ color: 'red' }} />
          </div>

          <div style={{ marginBottom: '0.3rem' }}>
            <label>Валюта:</label><br />
            <Field as="select" name="currency">
              {CURRENCIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </Field>
            <ErrorMessage name="currency" component="div" style={{ color: 'red' }} />
          </div>

          <div style={{ marginBottom: '0.3rem' }}>
            <label>Дата:</label><br />
            <DatePicker
              selected={values.date}
              onChange={(date) => setFieldValue('date', date)}
              dateFormat="yyyy-MM-dd"
            />
            <ErrorMessage name="date" component="div" style={{ color: 'red' }} />
          </div>

          <div style={{ marginBottom: '0.3rem' }}>
            <label>Категория:</label><br />
            <Field as="select" name="category">
              <option value="">Выберите категорию</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Field>
            <ErrorMessage name="category" component="div" style={{ color: 'red' }} />
          </div>

          <button type="submit" style={{ marginTop: '1rem' }}>Добавить чек</button>
        </Form>
      )}
    </Formik>
  )
}

export default AddCheckForm