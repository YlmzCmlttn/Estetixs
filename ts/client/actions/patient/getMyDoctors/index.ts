'use server';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function getMyDoctorsAction() {
    if (cookies().has('_session_id')) {
        const session_id = cookies().get('_session_id')?.value;
        try {
            const response = await fetch('http://api:4000/api/patient/get-my-doctors', {
                cache: 'no-store',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Cookie: `session_id=${session_id}`,
                }
            });
            if(response.status === 200){
                const data = await response.json();
                return data.myDoctors;
            }
        } catch (error) {
            console.log('error', error);
            cookies().set('_session_id', '');
            cookies().delete('_session_id');
            redirect('/login');
        }
    }
}

export default getMyDoctorsAction;