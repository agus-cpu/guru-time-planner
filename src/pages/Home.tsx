
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Link } from 'react-router-dom';
import { Calendar, Database, Users, BookOpen, Building2 } from 'lucide-react';

const Home = () => {
  const menuCards = [
    { icon: Database, label: 'Data', path: '/data', color: 'bg-blue-500' },
    { icon: Users, label: 'Guru', path: '/guru', color: 'bg-green-500' },
    { icon: BookOpen, label: 'Mata Pelajaran', path: '/mata-pelajaran', color: 'bg-purple-500' },
    { icon: Building2, label: 'Ruang', path: '/ruang', color: 'bg-orange-500' },
    { icon: Calendar, label: 'Penjadwalan', path: '/penjadwalan', color: 'bg-red-500' }
  ];

  return (
    <MainLayout title="Beranda">
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Selamat Datang di Sistem Penjadwalan Mengajar Guru</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuCards.map((card) => (
            <Link 
              key={card.path} 
              to={card.path}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className={`${card.color} h-2`}></div>
              <div className="p-6 flex items-center gap-4">
                <div className={`${card.color} bg-opacity-20 p-3 rounded-full`}>
                  <card.icon size={24} className={card.color.replace('bg-', 'text-').replace('-500', '-600')} />
                </div>
                <span className="text-lg font-medium">{card.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
