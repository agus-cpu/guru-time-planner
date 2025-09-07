
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Breadcrumb from '@/components/ui/breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, Building2, Clock, Calendar, UserCheck, BellOff } from 'lucide-react';

const Data = () => {
  const breadcrumbItems = [
    { label: 'Beranda', href: '/' },
    { label: 'Data' }
  ];

  // Sample statistics data
  const stats = [
    { title: 'Total Guru', value: 5, icon: Users, color: 'text-blue-600' },
    { title: 'Mata Pelajaran', value: 6, icon: BookOpen, color: 'text-green-600' },
    { title: 'Ruang Kelas', value: 6, icon: Building2, color: 'text-purple-600' },
    { title: 'Jam Pelajaran', value: 8, icon: Clock, color: 'text-orange-600' },
    { title: 'Hari Aktif', value: 6, icon: Calendar, color: 'text-red-600' },
    { title: 'Guru Pengampu', value: 5, icon: UserCheck, color: 'text-indigo-600' },
    { title: 'Waktu Tidak Tersedia', value: 5, icon: BellOff, color: 'text-pink-600' }
  ];

  return (
    <MainLayout title="Data">
      <div className="container mx-auto">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="bg-white p-4 rounded-md shadow mb-6">
          <h3 className="text-lg font-medium text-gray-800">Ringkasan Data penjadwalan</h3>
          <p className="text-gray-600 mt-2">Halaman ini menampilkan ringkasan semua data yang diperlukan untuk sistem penjadwalan mengajar guru.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Data Guru Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">Budi Santoso, S.Pd</span>
                  <span className="text-xs text-gray-500">G001</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">Siti Nurhaliza, M.Pd</span>
                  <span className="text-xs text-gray-500">G002</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">Ahmad Dahlan, S.Pd</span>
                  <span className="text-xs text-gray-500">G003</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Ruang Tersedia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">Ruang Kelas 1A</span>
                  <span className="text-xs text-gray-500">Kapasitas: 35</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">Lab Komputer</span>
                  <span className="text-xs text-gray-500">Kapasitas: 30</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">Lab Fisika</span>
                  <span className="text-xs text-gray-500">Kapasitas: 25</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Mata Pelajaran Aktif
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">Matematika</span>
                  <span className="text-xs text-gray-500">4 jam/minggu</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">Bahasa Indonesia</span>
                  <span className="text-xs text-gray-500">4 jam/minggu</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">Bahasa Inggris</span>
                  <span className="text-xs text-gray-500">3 jam/minggu</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Jadwal Jam Pelajaran
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">Jam ke-1</span>
                  <span className="text-xs text-gray-500">07:00 - 07:45</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">Jam ke-2</span>
                  <span className="text-xs text-gray-500">07:45 - 08:30</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">Istirahat</span>
                  <span className="text-xs text-gray-500">10:00 - 10:15</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Data;
