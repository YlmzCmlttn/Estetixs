'use server';

import { cookies } from 'next/headers'
import { redirect } from "next/dist/server/api-utils";

async function getServiceDetailsAction(service_id : string) {
    if (cookies().has('token')) {
        const token = cookies().get('token')?.value;
        try {
            const response = await fetch(`http://api:8000/api/v1/service/${service_id}`, {
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
            return null;
        } catch (error) {
            cookies().set('token', '');
            cookies().delete('token');
            redirect('/login');
        }
    }    
}   

export default getServiceDetailsAction;