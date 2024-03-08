'use server';

import { cookies } from 'next/headers'
import { redirect } from "next/dist/server/api-utils";

async function getDoctorProfileAction(doctorId: string) {
    try {
        const response = await fetch(`http://api:4000/api/doctor/${doctorId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if(response.status === 404){
        return null;
        }
        const data = await response.json()
        return data;
    } catch (error) {
        return null;
    }
}

export default getDoctorProfileAction;