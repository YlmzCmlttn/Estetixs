'use server';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
async function logout() {
    if (cookies().has('_session_id')) {
        const session_id = cookies().get('_session_id')?.value;
        try {
            await fetch('http://api:4000/api/auth/logout', {
                cache: 'no-store',
                method: 'POST',
                headers: {
                    Cookie: `session_id=${session_id}`,
                },
            });
        } catch (error) {
            console.log('error', error);
        }
    }
    cookies().set('_session_id', '');
    cookies().delete('_session_id');
    redirect('/login');
}

export default logout;