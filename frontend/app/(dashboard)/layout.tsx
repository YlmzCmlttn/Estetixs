import { headers } from 'next/headers';
import DoctorDashboardSideNav from '@/components/dashboard/sidenav/doctor';
import PatientDashboardSideNav from '@/components/dashboard/sidenav/patient';
const DashboardLayout = ({ children }) => {
    const headersList = headers();
    const role = headersList.get('x-user-role');
        return (
            <main className="flex h-screen flex-col md:flex-row md:overflow-hidden">
                <div className="w-full flex-none md:w-64">
                    
                    {role === 'Admin' && 'Admin Dashboard SideBar'}
                    {role === 'Doctor' && <DoctorDashboardSideNav />}
                    {role === 'Patient' && <PatientDashboardSideNav />}
                </div>
                <div className="flex-grow md:overflow-y-auto md:p-12">
                {children}
                </div>
            </main>
        );
}

export default DashboardLayout;