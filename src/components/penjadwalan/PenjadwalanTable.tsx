
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileSpreadsheet } from 'lucide-react';

interface ScheduleRow {
  id: number;
  day: string;
  session: string;
  time: string;
  subject: string;
  semester: string;
  class: string;
  teacher: string;
  room: string;
}

const PenjadwalanTable = () => {
  const scheduleData: ScheduleRow[] = [
    {
      id: 1,
      day: 'Senin',
      session: '(2-4)',
      time: '08.45-10.50',
      subject: 'TAHFIZ',
      semester: '1',
      class: 'A',
      teacher: 'Pak Madi',
      room: 'AL - AWWAL'
    },
    {
      id: 2,
      day: 'Senin',
      session: '(5-8)',
      time: '11.26-13.55',
      subject: 'TEMATIK',
      semester: '1',
      class: 'A',
      teacher: 'Bu Azizah',
      room: 'AL - AWWAL'
    },
    {
      id: 3,
      day: 'Senin',
      session: '(10-12)',
      time: '14.31-12.45',
      subject: 'TAHFIZ',
      semester: '1',
      class: 'A',
      teacher: 'Pak Madi',
      room: 'AL - AWWAL'
    },
    {
      id: 4,
      day: 'Selasa',
      session: '(1-3)',
      time: '08.11-10.15',
      subject: 'TAHFIZ',
      semester: '1',
      class: 'A',
      teacher: 'Pak Madi',
      room: 'AL - AWWAL'
    }
  ];

  return (
    <div className="mt-6 bg-white rounded-md shadow">
      <div className="p-4 flex justify-end">
        <Button variant="default" className="flex items-center gap-2 bg-blue-800 hover:bg-blue-900">
          <FileSpreadsheet size={16} />
          Export to Excel
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-700 bg-gray-50 border-y">
            <tr>
              <th className="px-4 py-3 text-center">#</th>
              <th className="px-4 py-3">Hari</th>
              <th className="px-4 py-3">Sesi</th>
              <th className="px-4 py-3">Jam</th>
              <th className="px-4 py-3">MataPelajaran</th>
              <th className="px-4 py-3">Semester</th>
              <th className="px-4 py-3">Kelas</th>
              <th className="px-4 py-3">Guru</th>
              <th className="px-4 py-3">Ruang</th>
            </tr>
          </thead>
          <tbody>
            {scheduleData.map((row) => (
              <tr key={row.id} className="border-b">
                <td className="px-4 py-3 text-center">{row.id}</td>
                <td className="px-4 py-3">{row.day}</td>
                <td className="px-4 py-3">{row.session}</td>
                <td className="px-4 py-3">{row.time}</td>
                <td className="px-4 py-3">{row.subject}</td>
                <td className="px-4 py-3">{row.semester}</td>
                <td className="px-4 py-3">{row.class}</td>
                <td className="px-4 py-3">{row.teacher}</td>
                <td className="px-4 py-3">{row.room}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PenjadwalanTable;
