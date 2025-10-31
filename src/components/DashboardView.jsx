import React from 'react';

const DashboardView = () => {
  // Mock data - replace with actual data from your backend
  const stats = [
    { title: 'Total Staff', value: '24', icon: 'bi-people', color: 'primary' },
    { title: 'Total Subject', value: '15', icon: 'bi-book', color: 'success' },
    { title: 'Total Class', value: '8', icon: 'bi-building', color: 'info' }
  ];

  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>
      <div className="row">
        {stats.map((stat, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className={`card border-0 bg-${stat.color} text-white shadow-sm`}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h4 className="card-title">{stat.value}</h4>
                    <p className="card-text mb-0">{stat.title}</p>
                  </div>
                  <i className={`bi ${stat.icon} display-4 opacity-50`}></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardView;