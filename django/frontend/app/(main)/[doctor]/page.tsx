import DoctorProfileContainer from "@/containers/doctor/profile";

const DoctorProfilePage = ({params}) => {
    console.log(params);
    return ( 
        <DoctorProfileContainer doctor={params.doctor}/>
     );
}
 
export default DoctorProfilePage;