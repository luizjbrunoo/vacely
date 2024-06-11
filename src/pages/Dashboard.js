import React from 'react';
import Quicksight from '../Quicksight'; // Importa o componente Quicksight

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {/* <Quicksight /> */}
      <a href="https://us-east-1.quicksight.aws.amazon.com/sn/dashboards/dashboardId" target="_blank" rel="noopener noreferrer">
            Acesse o Dashboard do QuickSight
        </a>
    </div>
  );
};

export default Dashboard;