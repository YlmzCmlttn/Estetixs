import DashboardContainer from "@/containers/dashboard/admin";
import AdminDashboardContainer from "@/containers/dashboard/admin"
import DoctorDashboardContainer from "@/containers/dashboard/doctor"
import PatientDashboardContainer from "@/containers/dashboard/patient"
import { headers } from 'next/headers'
const Dashboard = ({searchParams}) => {
    const headersList = headers();
    const role = headersList.get('x-user-role');
    const doctor_id = searchParams.doctor_id || null;
    return (
        <>
        {role === 'Admin' && <AdminDashboardContainer/> }
        {role === 'Doctor' && <DoctorDashboardContainer/> }
        {role === 'Patient' && <PatientDashboardContainer doctor_id={doctor_id}/> }
        </>
     );
}
 
export default Dashboard;