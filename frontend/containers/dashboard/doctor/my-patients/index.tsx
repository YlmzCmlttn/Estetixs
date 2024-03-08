import getMyPatientsAction from '@/actions/doctor/getMyPatients';
import Link from 'next/link';
const DoctorMyPatientsContainer = async () => {
    const myPatients = await getMyPatientsAction();
    return ( 
        <div>
            {myPatients.map((patient) => {
                return (
                    <div key={patient.id}>
                        <h1>{patient.fullname}</h1>
                    </div>
                )
            })}
        </div>
     );
}
 
export default DoctorMyPatientsContainer;