'use server';

import { cookies } from 'next/headers'
import { redirect } from "next/dist/server/api-utils";

async function registerAction(prevState: any, formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const response = await fetch('http://api:8000/api/v1/auth/signup/', {
            cache: 'no-cache',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        console.log('data', data);
        if(data.email){
            return { message: 'Email: ' + data.email };
        }
        if(data.password){
            return { message: 'Password: ' + data.password };
        }
        if(data.token){    
            console.log('token', data.token);
            cookies().set({
                name: 'token',
                value: data.token,
                httpOnly: true,
                path: '/',
            });
        }else{
            console.log('no token');
            return { message: 'Unauthorized' };
        }
        if(response.status === 201){
            return { message: 'Registered' };
        }else{
            return { message: 'Unauthorized' };
        }
    } catch (error) {
        console.log('error', error);
        return false;
    }
}

export default registerAction;