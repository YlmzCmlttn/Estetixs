'use service';
import { cookies } from 'next/headers'
import { redirect } from "next/dist/server/api-utils";
async function createServiceAction(doctorId: string) {
    console.log(doctorId);
    if (cookies().has('_session_id')) {
        const session_id = cookies().get('_session_id')?.value;
        try {
            const response = await fetch('http://api:4000/api/service/create', {
                cache: 'no-store',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Cookie: `session_id=${session_id}`,
                },
                body: JSON.stringify({ doctor_name : doctorId })
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

export default createServiceAction;