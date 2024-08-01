import getMyPatientsAction from '@/actions/doctor/getMyPatients';
import Link from 'next/link';
const DoctorMyPatientsContainer = async () => {
    const myPatients = await getMyPatientsAction();
    return ( 
        <div>
            {myPatients.map((patient) => {
                return (
                    <Link href={`/dashboard/patients/${patient.id}`} key={patient.id}>
                    <div key={patient.id}>
                        <h1>{patient.username}</h1>
                    </div>
                    </Link>
                )
            })}
        </div>
     );
}
 
export default DoctorMyPatientsContainer;