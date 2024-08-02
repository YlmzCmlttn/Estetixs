import getMyDoctorsAction from '@/actions/patient/getMyDoctors';
import Link from 'next/link';
const PatientMyDoctorsContainer = async () => {
    const myDoctors = await getMyDoctorsAction();
    return ( 
        <div>
            {myDoctors && myDoctors.map((doctor) => {
                return (
                    <div key={doctor.doctor_url}>
                        <h1>{doctor.fullname}</h1>
                        <h2>{doctor.title}</h2>
                        <Link href={`/dashboard/services/create?doctor_url=${doctor.doctor_url}`}>
                            Create a new service
                        </Link>
                    </div>
                )
            })}
        </div>
     );
}
 
export default PatientMyDoctorsContainer;