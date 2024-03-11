'use server';

import { cookies } from 'next/headers'
import { redirect } from "next/dist/server/api-utils";

async function loginAction(prevState: any, formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');
    try {
        const response = await fetch('http://api:8000/api/v1/auth/login/', {
            cache: 'no-cache',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if(data.token){    
            cookies().set({
                name: 'token',
                value: data.token,
                httpOnly: true,
                path: '/',
            });
        }else{
            return { message: 'Unauthorized' };
        }
        if(response.ok){
            return { message: 'Authorized' };
        }else{
            return { message: 'Unauthorized' };
        }
    } catch (error) {
        console.log('error', error);
    }
}
export default loginAction;