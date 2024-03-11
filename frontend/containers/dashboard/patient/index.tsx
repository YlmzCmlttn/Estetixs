import createConnectionAction from "@/actions/connection/createConnection";
import { redirect } from 'next/navigation'
const PatientDashboardContainer = async ({doctor_id}) => {
    if(doctor_id){
        await createConnectionAction(doctor_id);
        redirect('/dashboard/my-doctors');
    }
    return ( 
        <div>
            <h1>Patient Dashboard</h1>
        </div>
     );
}
 
export default PatientDashboardContainer;