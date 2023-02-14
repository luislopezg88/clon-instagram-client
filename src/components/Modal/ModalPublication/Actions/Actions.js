import React, { useState } from 'react';
import { Icon } from "semantic-ui-react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_LIKE, IS_LIKE, DELETE_LIKE, COUNT_LIKE } from "../../../../gql/like";
import "./Actions.scss";

export default function Actions(props) {
    const {publication} = props;
    const [loadingAction, setLoadingAction] = useState(false);
    // En el mutation usamos Corchetes y llega
    // la variable del mutation en minusculas
    const [addLike] = useMutation(ADD_LIKE);

    const [deleteLike] = useMutation(DELETE_LIKE);
    // en query usamos llaves y por lo general llega
    // data y loading
    const {data, loading, refetch} = useQuery(IS_LIKE, {
        variables: {
            idPublication: publication.id,
        },
    });

    const {data: dataCount, loading: loadingCount, refetch: refetchCount} = useQuery(COUNT_LIKE, {
        variables: {
            idPublication: publication.id,
        },
    });

    

    const onAddLike = async () => {
        setLoadingAction(true);
        try {
            await addLike({
                variables: {
                    idPublication: publication.id,
                },
            });
            refetch();
            refetchCount();
        } catch (error) {
            console.log(error);   
        }
        setLoadingAction(false);
    };

    const onDeleteLike = async () => {
        setLoadingAction(true);
        try {

            await deleteLike({
                variables: {
                    idPublication: publication.id,
                },
            });
            refetch();
            refetchCount();
        } catch (error) {
           console.log(error); 
        }
        setLoadingAction(false);
    };

    const onAction = () => {
        if(!loadingAction) {
            if(isLike) {
                onDeleteLike();
            } else {
                onAddLike();
            }
        }
    };

    if(loading || loadingCount) return null;
    const {isLike} = data;
    const {countLikes} = dataCount;
    
    

    return (
        <div className="action">
            <Icon 
                className={isLike ? "like active" : "like"}
                name={isLike ? "heart" : "heart outline"}
                onClick={onAction}
            />

            {countLikes} {countLikes === 1 ? "Like" : "Likes"}
        </div>
    )
}
