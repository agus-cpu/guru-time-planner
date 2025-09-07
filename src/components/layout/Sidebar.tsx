
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Database, Users, BookOpen, 
  UserCheck, Building2, Clock, Calendar, 
  BellOff, Settings, FileSpreadsheet 
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/', label: 'Beranda', icon: Home },
    { path: '/data', label: 'Data', icon: Database },
    { path: '/guru', label: 'Guru', icon: Users },
    { path: '/mata-pelajaran', label: 'Mata Pelajaran', icon: BookOpen },
    { path: '/guru-pengampu', label: 'Guru Pengampu', icon: UserCheck },
    { path: '/ruang', label: 'Ruang', icon: Building2 },
    { path: '/jam', label: 'Jam', icon: Clock },
    { path: '/hari', label: 'Hari', icon: Calendar },
    { path: '/waktu-tidak-tersedia', label: 'Waktu Tidak Bersedia', icon: BellOff },
    { path: '/proses', label: 'Proses', icon: Settings },
    { path: '/penjadwalan', label: 'Penjadwalan', icon: Calendar },
  ];

  return (
    <div className="dark-sidebar w-64 min-h-screen flex flex-col">
      <div className="p-4 border-b border-dark-border">
        <h1 className="text-xl font-semibold">
          <span className="text-white">Penjadwalan</span>{' '}
          <span className="text-gray-300">Mengajar Guru</span>
        </h1>
      </div>
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
              >
                <item.icon size={18} className="menu-item-icon" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
