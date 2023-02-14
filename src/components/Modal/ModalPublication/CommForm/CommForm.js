import React from 'react';
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../../../gql/comment";
import "./CommForm.scss";

export default function CommForm(props) {

    const {publication} = props;

    //mutation son con array
    const [addComment] = useMutation(ADD_COMMENT);

    const formik = useFormik({
        initialValues: {
            comment: "",
        },
        validationSchema: Yup.object({
            comment: Yup.string().required(),
        }),
        onSubmit: async (formData) => {
            
            try {
                 await addComment({
                    variables: {
                        input: {
                            idPublication: publication.id,
                            comment: formData.comment,
                        },
                    },
                });
                formik.handleReset();
            } catch (error) {
                console.log(error);
            }
        },
    });

    return (
        <Form className="commm-form" onSubmit={formik.handleSubmit}>
            <Form.Input placeholder="Añade un comentario..." 
            name="comment" 
            values={formik.values.comment} 
            onChange={formik.handleChange} 
            error={formik.errors.comment && true} />
            <Button type="submit">Publicar</Button>
        </Form>
    );
}
