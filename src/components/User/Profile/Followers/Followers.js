import React, { useState, useEffect } from 'react';
import { size } from "lodash";
import { useQuery } from "@apollo/client";
import { GET_FOLLOWER, GET_FOLLOEWDS } from "../../../../gql/follow";
import ModalBasic from "../../../Modal/ModalBasic";
import ListUsers from "../../ListUsers";
import "./Followers.scss";

export default function Followers(props) {

    const { username, totalPublicaciones } = props;

    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [childrenModal, setChildrenModal] = useState(null);

    const { data: dataFollowers, loading: loadingFollowers,
         startPolling: starPollingFollowers, stopPolling: stopPollingFollowers } = useQuery(GET_FOLLOWER, {
        variables: { username }
    });

    const { data: dataFolloweds, 
        loading: loadingFolloweds, 
        startPolling: startPollingFolloweds, 
        stopPolling: stopPollingFolloweds } = useQuery(GET_FOLLOEWDS, {
        variables: {username}
    })

    // Use Efect para seguidores
    useEffect(() => {
        starPollingFollowers(1000);
        return () => {
            stopPollingFollowers();
        }
    }, [starPollingFollowers, stopPollingFollowers]);

    //use Efect para seguidos

    useEffect(() => {
        startPollingFolloweds(1000);
        return () => {
            stopPollingFolloweds();
        }
    }, [startPollingFolloweds, stopPollingFolloweds]);


    // modal seguidores
    const openFollowers = () => {
        setTitleModal("Seguidores");
        setChildrenModal(<ListUsers  users={getFollowers} setShowModal={setShowModal}/>);
        setShowModal(true);
    };

    // modal de seguidos
    const openFolloweds = () => {
        setTitleModal("Usuarios Seguidos");
        setChildrenModal(<ListUsers users={getFolloweds} setShowModal={setShowModal} />);
        setShowModal(true);
    };



    if (loadingFollowers || loadingFolloweds) return null;
    const {getFollowers} = dataFollowers
    const {getFolloweds} = dataFolloweds

    return (
        <>
            <div className="followers">
                <p><span>{totalPublicaciones}</span> publicaciones</p>
                <p className="link" onClick={openFollowers}><span>{size(getFollowers)}</span> seguidores</p>
                <p className="link" onClick={openFolloweds}><span>{size(getFolloweds)}</span> seguidos</p>
            </div>
            <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
                {childrenModal}
            </ModalBasic>
        </>

    );
}
