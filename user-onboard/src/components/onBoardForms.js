import React, { useState, useEffect } from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
const OnBoardForm = ({ errors, touched, values, status }) => {

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

const formikHOC = withFormik({
    mapPropsToValues({ name, password, checkbox, email, terms }) {
        return {
            name: name || "",
            password: password || "",
            checkbox: checkbox || "",
            email: email || "",
            terms: terms || false
        };
    },
    termsSchema: Yup.object().shape({
        name: Yup.string().required("not a good input"),
        password: Yup.number().required(),
        checkbox: Yup.string()
    }),
    handleSubmit(values, { setStatus, resetForm }) {
        axios
            .post("https://reqres.in/api/users", values)
            .then(res => {
                console.log("handleSubmit: then: res: ", res);
                setStatus(res.data);
                resetForm();
            })
            .catch(err => console.error("handleSubmit: catch: err: ", err));
    }
});
const OnBoardFormWithFormik = formikHOC(OnBoardForm);

export default OnBoardFormWithFormik;