import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import SideNav from '../components/SideNav';
import DashboardView from '../components/DashboardView';
import TimeTableView from '../components/TimeTableView';
import CreateTimeTable from '../components/CreateTimeTable';
import Subjects from '../pages/subjects/SubjectList';
import AddSubject from '../pages/subjects/AddSubject';
import ListSubjects from '../pages/subjects/SubjectList';
import Staffs from '../pages/staffs/StaffList';
import AddStaff from '../pages/staffs/AddStaff';
import ListStaffs from '../pages/staffs/StaffList';
import Classes from '../pages/class/ClassList';
import AddClass from '../pages/class/AddClass';
import ListClasses from '../pages/class/ClassList';
import { useLocation } from 'react-router-dom';

// const Dashboard = () => {
//   const [activeView, setActiveView] = useState('dashboard');

//   const renderContent = () => {
//     switch (activeView) {
//       case 'dashboard':
//         return <DashboardView />;
//       case 'timetable-list':
//         return <TimeTableView />;
//       case 'create-timetable':
//         return <CreateTimeTable />;
      
//       // Subjects
//       case 'subjects':
//         return <Subjects />;
//       case 'add-subject':
//         return <AddSubject />;
//       case 'list-subjects':
//         return <ListSubjects />;
      
//       // Staffs
//       case 'staffs':
//         return <Staffs />;
//       case 'add-staff':
//         return <AddStaff />;
//       case 'list-staffs':
//         return <ListStaffs />;
      
//       // Classes
//       case 'classes':
//         return <Classes />;
//       case 'add-class':
//         return <AddClass />;
//       case 'list-classes':
//         return <ListClasses />;
      
//       default:
//         return <DashboardView />;
//     }
//   };

//   return (
//     <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
//       <TopBar />
//       <div className="d-flex flex-grow-1">
//         <SideNav activeView={activeView} setActiveView={setActiveView} />
//         <main className="flex-grow-1 p-4">
//           {renderContent()}
//         </main>
//       </div>
//     </div>
//   );
// };

const Dashboard = () => {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case '/dashboard':
        return <DashboardView />;
      case '/timetable':
        return <TimeTableView />;
      case '/create-timetable':
        return <CreateTimeTable />;
      case '/subjects':
        return <Subjects />;
      case '/add-subject':
        return <AddSubject />;
      case '/list-subjects':
        return <ListSubjects />;
      case '/staffs':
        return <Staffs />;
      case '/add-staff':
        return <AddStaff />;
      case '/list-staffs':
        return <ListStaffs />;
      case '/classes':
        return <Classes />;
      case '/add-class':
        return <AddClass />;
      case '/list-classes':
        return <ListClasses />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <TopBar />
      <div className="d-flex flex-grow-1">
        <SideNav />
        <main className="flex-grow-1 p-4 bg-light">
          {renderContent()}

          
        </main>
      </div>
      {/* <div className="position-absolute bottom-0 start-0 end-0 p-3 border-top bg-white mt-4">
        <div className="text-center">
          <small className="text-muted">School Management v1.0</small>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;

// export default Dashboard;