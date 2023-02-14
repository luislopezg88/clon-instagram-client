import React from 'react';
import { Form, Button } from "semantic-ui-react";
import {useFormik} from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";
import "./PasswordForm.scss";

export default function PasswordForm(props) {


    const [updateUser] = useMutation(UPDATE_USER);

    const { logout } = props;

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            currentPassword: Yup.string().required(),
            newPassword: Yup.string().required().oneOf([Yup.ref("repeatNewPassword")]),
            repeatNewPassword: Yup.string().required().oneOf([Yup.ref("newPassword")]),
        }),
        onSubmit: async (formValues) => {
            try {
                const result = await updateUser({
                    variables: {
                        input: {
                            currentPassword: formValues.currentPassword,
                            newPassword: formValues.newPassword,
                        }
                    }
                });
                if(!result.data.updateUser) {
                    toast.error("Error al cambiar la contraseña");  
                }else {
                    logout();
                }
            } catch (error) {
               toast.error("Error al cambiar la contraseña"); 
            }
        }
    });

    return (
        <Form className="password-from" onSubmit={formik.handleSubmit}>

            <Form.Input 
                type="password"
                placeholder="Contraseña Actual" 
                name="currentPassword" 
                value={formik.values.currentPassword} 
                onChange={formik.handleChange}
                error={formik.errors.currentPassword && true}
            />

            <Form.Input 
                type="password"
                placeholder="Nueva contraseña" 
                name="newPassword" 
                value={formik.values.newPassword} 
                onChange={formik.handleChange}
                error={formik.errors.newPassword && true}
            />
            <Form.Input 
                type="password"
                placeholder="Repita la contraseña" 
                name="repeatNewPassword" 
                value={formik.values.repeatNewPassword}
                onChange={formik.handleChange}
                error={formik.errors.repeatNewPassword && true}
            />

            <Button type="submit" className="btn-submit">Actualizar</Button>


        </Form>
    )
}

function initialValues() {
    return {
        currentPassword: "",
        newPassword: "",
        repeatNewPassword: "",
    }
}
