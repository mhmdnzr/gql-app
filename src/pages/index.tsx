import {useEffect, useRef, useState} from 'react'
import {useLazyQuery, useQuery} from '@apollo/client'

import Head from 'next/head'

import GET_USERS from '@/graphql/queries/getUsers.gql'
import SEARCH_USERS from '@/graphql/queries/searchUsers.gql'

export default function Home() {
    const [users, setUsers] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const usersRef = useRef(null);

    const {data, loading, error} = useQuery(GET_USERS);

    const [getSearchedUsers] = useLazyQuery(SEARCH_USERS, {
        fetchPolicy: "network-only",
        onCompleted(data) {
            setUsers(data.searchUser);
        },
    });

    useEffect(() => {
        if (data) {
            setUsers(data.users);
            usersRef.current = data.users;
        }
    }, [data]);

    const searchUser = () => {
        getSearchedUsers({
            variables: {
                value: searchValue,
            },
        });
    };

    if (error) {
        console.error(error);
        return null;
    }

    console.log(data)
    return (
        <>
            <Head>
                <title>Nextjs and Graphql Setup</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>


            </main>
        </>
    )
}