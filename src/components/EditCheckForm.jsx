import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import DatePicker from 'react-datepicker'
import { CURRENCIES, CATEGORIES } from '../constants'

const EditCheckForm = ({ initialData, onSave, onCancel }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Название обязательно'),
    amount: Yup.number()
      .typeError('Сумма должна быть числом')
      .positive('Сумма должна быть больше 0')
      .required('Сумма обязательна'),
    date: Yup.date().required('Дата обязательна'),
    category: Yup.string().required('Категория обязательна'),
    currency: Yup.string().required('Валюта обязательна'),
  })

  const initialDate = initialData.date ? new Date(initialData.date) : new Date()

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      <h2>Редактировать чек</h2>
      <Formik
        initialValues={{ ...initialData, date: initialDate }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const formattedDate = values.date.toISOString().split('T')[0]
          onSave({ ...values, date: formattedDate })
        }}
        enableReinitialize
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div>
              <label>Название:</label><br />
              <Field name="name" />
              <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <label>Сумма:</label><br />
              <Field name="amount" />
              <ErrorMessage name="amount" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <label>Валюта:</label><br />
              <Field as="select" name="currency">
                {CURRENCIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </Field>
              <ErrorMessage name="currency" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <label>Дата:</label><br />
              <DatePicker
                selected={values.date}
                onChange={(date) => setFieldValue('date', date)}
                dateFormat="yyyy-MM-dd"
              />
              <ErrorMessage name="date" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <label>Категория:</label><br />
              <Field as="select" name="category">
                <option value="">Выберите категорию</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </Field>
              <ErrorMessage name="category" component="div" style={{ color: 'red' }} />
            </div>

            <button type="submit" style={{ marginTop: '1rem', marginRight: '1rem' }}>Сохранить</button>
            <button type="button" onClick={onCancel} style={{ marginTop: '1rem' }}>Отмена</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default EditCheckForm