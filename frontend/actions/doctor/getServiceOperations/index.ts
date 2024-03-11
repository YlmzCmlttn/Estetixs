'use server';

import { cookies } from 'next/headers'
import { redirect } from "next/dist/server/api-utils";

async function getServiceOperations(service_id : string) {
    if (cookies().has('token')) {
        const token = cookies().get('token')?.value;
        try {
            const response = await fetch(`http://api:8000/api/v1/service/${service_id}/operations/`, {
                cache: 'no-cache',
                method: 'GET',
                headers: {
                    Authorization: `Token ${token}`,
                }
            });
            if(response.status === 200){
                const data = await response.json();
                return data;
            }
            if(response.status === 404){
                return null;
            }
        } catch (error) {
            console.log('error', error);
            cookies().set('token', '');
            cookies().delete('token');
            redirect('/login');
        }
    }    
}   

export default getServiceOperations;