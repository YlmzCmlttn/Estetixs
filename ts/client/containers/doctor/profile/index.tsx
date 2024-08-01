import { notFound } from 'next/navigation'
import Link from 'next/link';
import getDoctorProfileAction from "@/actions/profile/getDoctorProfile";
const DoctorProfileContainer = async ({doctor}) => {
    const doctorData = await getDoctorProfileAction(doctor);
    console.log(doctorData);
    if(!doctorData){
        notFound();
    }
    return ( 
        <div>
            <h1>Doctor Profile Container</h1>
            <p>{doctorData.fullname}</p>

            <Link href={`/register?doctor_id=${doctor}`}>
                Get Appointment
            </Link>
        </div>
     );
}
 
export default DoctorProfileContainer;