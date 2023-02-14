import React from 'react';
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import useAuth from "../../../hooks/useAuth";
import PasswordForm from "../PasswordForm";
import EmailForm from "../EmailForm";
import DescriptionForm from "../DescriptionForm";
import SiteWebForm from "../SiteWebForm";
import "./SettignsFrom.scss"

export default function SettignsFrom(props) {
    const { setShowModal, setTitleModal, setChildrenModal, getUser, refetch } = props;
    const history = useHistory();
    const client = useApolloClient();
    const { logout } = useAuth();


    const onChangePassword = () => {
        setTitleModal("Cambiar tu contraseña");
        setChildrenModal(<PasswordForm logout={onLogout} />);
    }

    const onChangeEmail = () => {
        setTitleModal("Cambiar Email");
        setChildrenModal(
            <EmailForm  
                setShowModal={setShowModal}
                currentEmail={getUser.email} 
                refetch={refetch} 
            />
        );
    }

    const onChangeDescription = () => {
        setTitleModal("Cambiar Descripcion");
        setChildrenModal(<DescriptionForm
                setShowModal={setShowModal}
                currnetDescription={getUser.description}
                refetch={refetch}
            />
            );
    }

    const onChangeSiteWeb = () => {
        setTitleModal("Cambiar Site Web");
        setChildrenModal(<SiteWebForm
                setShowModal={setShowModal}
                currentSiteWeb={getUser.siteweb}
                refetch={refetch}
            />);
    }

    const onLogout = () => {
        client.clearStore();
        logout();
        history.push("/");
    }

    return (
        <div className="settigns-from">
            <Button onClick={onChangePassword}>Cambiar Contraseña</Button>
            <Button onClick={onChangeEmail}>Cambiar Email</Button>
            <Button onClick={onChangeDescription}>Descripción</Button>
            <Button onClick={onChangeSiteWeb}>sitio web</Button>
            <Button onClick={onLogout}>Cerrar session</Button>
            <Button onClick={() => setShowModal(false)}>Cancelar</Button>
        </div>
    )
}
