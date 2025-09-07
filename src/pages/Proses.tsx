
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Breadcrumb from '@/components/ui/breadcrumb';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select } from "@radix-ui/react-select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Settings, Play, Download, Save } from 'lucide-react';

const Proses = () => {
  const breadcrumbItems = [
    { label: 'Beranda', href: '/' },
    { label: 'Proses' }
  ];

  const [isGenerating, setIsGenerating] = useState(false);
  const [jadwalGenerated, setJadwalGenerated] = useState(false);

  // Sample data for bentrok
  const bentrokData = [
    { id: 1, hari: 'Senin', jam: 'Jam ke-1', guru: 'Budi Santoso, S.Pd', kelas1: 'X-A', kelas2: 'X-B', mata_pelajaran1: 'Matematika', mata_pelajaran2: 'Matematika' },
    { id: 2, hari: 'Selasa', jam: 'Jam ke-3', guru: 'Siti Nurhaliza, M.Pd', kelas1: 'X-C', kelas2: 'X-A', mata_pelajaran1: 'Bahasa Indonesia', mata_pelajaran2: 'Bahasa Indonesia' },
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate process delay
    setTimeout(() => {
      setIsGenerating(false);
      setJadwalGenerated(true);
    }, 2000);
  };

  return (
    <MainLayout title="Proses">
      <div className="container mx-auto">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="bg-white p-4 rounded-md shadow mb-6">
          <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
            <Settings size={20} />
            Proses Penjadwalan
          </h3>
          <p className="text-gray-600 mt-2">Halaman ini digunakan untuk memproses penjadwalan mengajar guru.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Parameter Penjadwalan</CardTitle>
              <CardDescription>Atur parameter untuk proses penjadwalan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tahun Ajaran</label>
                    <Input placeholder="2023/2024" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Semester</label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                      <option value="ganjil">Ganjil</option>
                      <option value="genap">Genap</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Jumlah Generasi</label>
                  <Input type="number" placeholder="100" min="1" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Jumlah Populasi</label>
                  <Input type="number" placeholder="50" min="1" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Probabilitas Cross Over</label>
                    <Input type="number" placeholder="0.8" min="0" max="1" step="0.1" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Probabilitas Mutasi</label>
                    <Input type="number" placeholder="0.2" min="0" max="1" step="0.1" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset</Button>
              <Button 
                className="flex items-center gap-2" 
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                    Memproses...
                  </>
                ) : (
                  <>
                    <Play size={16} />
                    Jalankan Proses
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status Proses</CardTitle>
              <CardDescription>Informasi hasil proses penjadwalan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="grid grid-cols-2 gap-y-2">
                    <div className="text-sm text-gray-600">Status:</div>
                    <div className="text-sm font-medium">
                      {isGenerating ? (
                        <span className="text-amber-600">Sedang Diproses</span>
                      ) : jadwalGenerated ? (
                        <span className="text-green-600">Berhasil</span>
                      ) : (
                        <span className="text-gray-600">Belum Diproses</span>
                      )}
                    </div>
                    
                    {jadwalGenerated && (
                      <>
                        <div className="text-sm text-gray-600">Waktu Proses:</div>
                        <div className="text-sm font-medium">00:01:45</div>
                        
                        <div className="text-sm text-gray-600">Generasi ke:</div>
                        <div className="text-sm font-medium">85</div>
                        
                        <div className="text-sm text-gray-600">Fitness Terbaik:</div>
                        <div className="text-sm font-medium">0.98</div>
                        
                        <div className="text-sm text-gray-600">Jumlah Bentrok:</div>
                        <div className="text-sm font-medium">2</div>
                      </>
                    )}
                  </div>
                </div>

                {jadwalGenerated && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Daftar Bentrok</h4>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Hari</TableHead>
                            <TableHead>Jam</TableHead>
                            <TableHead>Guru</TableHead>
                            <TableHead>Kelas</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {bentrokData.map((bentrok) => (
                            <TableRow key={bentrok.id}>
                              <TableCell>{bentrok.hari}</TableCell>
                              <TableCell>{bentrok.jam}</TableCell>
                              <TableCell>{bentrok.guru}</TableCell>
                              <TableCell>{bentrok.kelas1}, {bentrok.kelas2}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            {jadwalGenerated && (
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" className="flex items-center gap-1">
                  <Save size={16} />
                  Simpan Jadwal
                </Button>
                <Button className="flex items-center gap-1">
                  <Download size={16} />
                  Unduh Jadwal
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Proses;
