import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { size } from "lodash";
import { useQuery } from "@apollo/client";
import { GET_PUBLICATION } from "../gql/publication";
import Profile from "../components/User/Profile";
import Publications from "../components/Publications";

export default function User(){
    const { username } = useParams();
    const { data, loading, startPolling, stopPolling } = useQuery(GET_PUBLICATION, {
        variables: { username },
    });

    useEffect(() => {
        startPolling(1000);
        return () => {
            stopPolling();
        };
        
    }, [startPolling, stopPolling]);

    if(loading) return null;

    
    const { getPublications } = data;
    
    
    return (
        <>
           
            <Profile username={username} totalPublicaciones={size(getPublications)}/>
            <Publications getPublications={getPublications} />
        </>
    );
}
