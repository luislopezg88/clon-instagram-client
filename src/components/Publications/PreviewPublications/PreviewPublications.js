import React, { useState } from 'react';
import { Image } from "semantic-ui-react";
import ModalPublication from "../../Modal/ModalPublication";
import "./PreviewPublications.scss";

export default function PreviewPublications(props) {
    const {publication} = props;

    const [showModal, setShowModal] = useState(false);
    
    
    return (
        <>
            <div className="previw-publications" onClick={() => setShowModal(true)}>
                <Image className="previw-publications__image" src={publication.file} />

            </div>

            <ModalPublication show={showModal} setShow={setShowModal} publication={publication}/>
        </>
    );
}
