import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import Home from "./pages/Home";
import { PatientSignup, PatientLogin } from "./pages/Auth";
import PatientDashboard from "./pages/PatientDashboard";
import MedicalProfile from "./pages/MedicalProfile";
import AccessLogs from "./pages/AccessLogs";
import { EmergencyAccess, EmergencyProfile } from "./pages/Emergency";
import { HospitalLogin, HospitalDashboard, EmergencySummary } from "./pages/Hospital";
import { GuardianNotification, GuardianAccessRequest, GuardianDashboard, ChildProfile } from "./pages/Guardian";
import EmergencyCardPage from "./pages/EmergencyCardPage";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

function PatientGuard({children}) {
  const {patientAuthed}=useApp();
  return patientAuthed ? children : <Navigate to="/patient/login" replace />;
}
function HospitalGuard({children}) {
  const {hospitalAuthed}=useApp();
  return hospitalAuthed ? children : <Navigate to="/hospital/login" replace />;
}

function AppRoutes(){
 return <Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/home" element={<Navigate to="/" replace/>}/>
  <Route path="/patient/signup" element={<PatientSignup/>}/>
  <Route path="/patient/login" element={<PatientLogin/>}/>
  <Route path="/patient/dashboard" element={<PatientGuard><PatientDashboard/></PatientGuard>}/>
  <Route path="/patient/medical-profile" element={<PatientGuard><MedicalProfile/></PatientGuard>}/>
  <Route path="/patient/access-logs" element={<PatientGuard><AccessLogs/></PatientGuard>}/>
  <Route path="/patient/settings" element={<PatientGuard><Settings/></PatientGuard>}/>
  <Route path="/emergency" element={<EmergencyAccess/>}/>
  <Route path="/emergency/:emergencyId" element={<EmergencyProfile/>}/>
  <Route path="/hospital/login" element={<HospitalLogin/>}/>
  <Route path="/hospital/dashboard" element={<HospitalGuard><HospitalDashboard/></HospitalGuard>}/>
  <Route path="/hospital/emergency-summary" element={<HospitalGuard><EmergencySummary/></HospitalGuard>}/>
  <Route path="/guardian/notification" element={<GuardianNotification/>}/>
  <Route path="/guardian/access-request" element={<GuardianAccessRequest/>}/>
  <Route path="/guardian/dashboard" element={<GuardianDashboard/>}/>
  <Route path="/guardian/child-profile" element={<ChildProfile/>}/>
  <Route path="/emergency-card" element={<PatientGuard><EmergencyCardPage/></PatientGuard>}/>
  <Route path="*" element={<NotFound/>}/>
 </Routes>
}

export default function App(){
 return <AppProvider><BrowserRouter><AppRoutes/></BrowserRouter></AppProvider>
}
