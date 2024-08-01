'use server';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
async function logout() {
    if (cookies().has('token')) {
        const token = cookies().get('token')?.value;
        try {
            await fetch('http://api:8000/api/v1/auth/logout/', {
                cache: 'no-cache',
                method: 'POST',
                headers: {
                  Authorization: `Token ${token}`,
                },
            });
        } catch (error) {
            console.log('error', error);
        }
    }
    cookies().set('token', '');
    cookies().delete('token');
    redirect('/login');
}

export default logout;