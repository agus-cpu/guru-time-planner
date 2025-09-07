
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Breadcrumb from '@/components/ui/breadcrumb';
import PenjadwalanForm from '@/components/penjadwalan/PenjadwalanForm';
import PenjadwalanTable from '@/components/penjadwalan/PenjadwalanTable';

const Penjadwalan = () => {
  const breadcrumbItems = [
    { label: 'Beranda', href: '/' },
    { label: 'Penjadwalan' }
  ];

  return (
    <MainLayout title="Penjadwalan">
      <div className="container mx-auto">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="bg-white p-4 rounded-md shadow mb-6">
          <h3 className="text-lg font-medium text-gray-800">Penjadwalan</h3>
        </div>
        
        <PenjadwalanForm />
        <PenjadwalanTable />
      </div>
    </MainLayout>
  );
};

export default Penjadwalan;
