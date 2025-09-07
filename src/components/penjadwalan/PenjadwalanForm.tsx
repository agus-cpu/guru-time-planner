
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { FileSpreadsheet } from 'lucide-react';

const PenjadwalanForm = () => {
  return (
    <div className="bg-white rounded-md shadow p-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
          <select className="w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            <option>GANJIL</option>
            <option>GENAP</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Probabilitas CrossOver</label>
          <Input type="text" placeholder="0.8" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tahun Belajar</label>
          <select className="w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            <option>2023-2024</option>
            <option>2024-2025</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Probabilitas Mutasi</label>
          <Input type="text" placeholder="0.2" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Populasi</label>
          <Input type="text" placeholder="10" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Generasi</label>
          <Input type="text" placeholder="100" />
        </div>
      </div>
      
      <div className="mt-6">
        <Button className="bg-dark hover:bg-dark hover:bg-opacity-90">Proses</Button>
      </div>
    </div>
  );
};

export default PenjadwalanForm;
