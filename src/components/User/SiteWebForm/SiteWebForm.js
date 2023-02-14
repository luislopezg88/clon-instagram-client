import React from 'react';
import { Form, Button} from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";
import "./SiteWebForm.scss";

export default function SiteWebForm(props) {
    const { setShowModal, currentSiteWeb, refetch } = props;

    const [updateUser] = useMutation(UPDATE_USER);

    const formik = useFormik({
        initialValues:{
            siteweb: currentSiteWeb || "",
        },
        validationSchema: Yup.object({
            siteweb: Yup.string().required(),
        }),
        onSubmit: async (formData) => {

            try {
              //  console.log(formData);
                await updateUser({
                    variables: {
                        input: formData,
                    },
                });
                refetch();
                setShowModal(false);

            } catch (error) {
                toast.error("Error al actualizar el site Web");
            }

        },
    });

    return (
        <Form className="siteweb-form" onSubmit={formik.handleSubmit}>
            <Form.Input 
                placeholder="Url web"
                name="siteweb"
                value={formik.values.siteweb}
                onChange={formik.handleChange}
                error={formik.errors.siteweb && true}
            />
            <Button type="submit" className="btn-submit">Actualizar</Button>
        </Form>
    )
}
