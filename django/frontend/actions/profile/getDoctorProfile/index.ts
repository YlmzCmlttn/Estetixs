'use server';

import { cookies } from 'next/headers'
import { redirect } from "next/dist/server/api-utils";

async function getDoctorProfileAction(doctorId: string) {
    try {
        const response = await fetch(`http://api:8000/api/v1/profile/doctor/${doctorId}`, {
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status !== 200) {
            return null;
        }
        const data = await response.json()
        return data;
    } catch (error) {
        console.log('error', error);
        return null;
    }
}

export default getDoctorProfileAction;