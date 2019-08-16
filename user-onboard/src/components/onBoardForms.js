import React from 'react';
import { Formik, Field } from 'formik';
import * as Yup from "yup";
import axios from "axios";
const onBoardForm = ({ errors, touched, values, status }) => {
    const [user, setUser] = useState([]);
    useEffect(() => {
        if (status) {
            setUser([...user, status]);
        }
    }, [status]);
    return (
        <div className='onboard-form'>
            <Form>
                <Field
                    component='input'
                    type='text'
                    name='name'
                    placeholder='Name'
                />
                {touched.name && errors.name && (<p className="error">{errors.name}</p>)}
                <Field
                    type='text'
                    name='email'
                    placeholder='Email'
                />
                {touched.email && errors.email && <p className="error">{errors.email}</p>}
                <Field
                    type='password'
                    name='password'
                    placeholder='Password'
                />
                {touched.email && errors.email && <p className="error">{errors.email}</p>}
                <label className="checkbox-container">
                    Terms of Service
                    <Field
                        type="checkbox"
                        name="terms"
                        checked={values.terms}
                    />
                    <span className="checkmark" />
                </label>
                <button>Submit!</button>
            </Form>
        </div>
    )
}