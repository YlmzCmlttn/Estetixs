'use server';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function createConnectionAction(doctorId: string) {
    if (cookies().has('_session_id')) {
        const session_id = cookies().get('_session_id')?.value;
        try {
            await fetch('http://api:4000/api/connection/create', {
                cache: 'no-store',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Cookie: `session_id=${session_id}`,
                },
                body: JSON.stringify({doctor_name: doctorId}),
            });
        } catch (error) {
            console.log('error', error);
            cookies().set('_session_id', '');
            cookies().delete('_session_id');
            redirect('/login');
        }
    }
}

export default createConnectionAction;