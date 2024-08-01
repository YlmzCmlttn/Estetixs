'use server';

import { cookies } from 'next/headers'
import { redirect } from "next/dist/server/api-utils";

async function loginAction(prevState: any, formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');
    console.log('email', email);
    console.log('password', password);

    try {
        const response = await fetch('http://api:4000/api/auth/login', {
            cache: 'no-cache',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (response.headers.has('Set-Cookie')) {
            const cookie = response.headers.get('Set-Cookie');
            // Split the cookies - this is a simplistic split and might not work with all cookie formats
            const splitCookies = cookie.split(', ');

            // Parsing each cookie
            const parsedCookies = splitCookies.map(cookie => {
                const parts = cookie.split(';').map(part => part.trim());
                const cookiePart = parts[0];
                const [key, value] = cookiePart.split('=');
                return { key, value };
            });

            // Find a specific cookie, for example, a cookie named 'session_id'
            const sessionCookie = parsedCookies.find(cookie => cookie.key === 'session_id');
            console.log('sessionCookie', sessionCookie);
            cookies().set({
                name: '_session_id',
                value: sessionCookie.value,
                httpOnly: true,
                path: '/',
            });

            if (response.status === 200) {
                console.log('Authorized');
                return { message: 'Authorized' };
            } else {
                console.log('Unauthorized');
                return { message: 'Unauthorized' };
            }
        } else {
            console.log('Unauthorized');
            return { message: 'Unauthorized' };
        }
    } catch (error) {
        console.log('error', error);
    }
}

export default loginAction;