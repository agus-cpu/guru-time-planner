
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Breadcrumb from '@/components/ui/breadcrumb';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Clock, PlusCircle, Search, Edit, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';

interface JamData {
  id: number;
  kode: string;
  nama: string;
  waktu_mulai: string;
  waktu_selesai: string;
}

const Jam = () => {
  const breadcrumbItems = [
    { label: 'Beranda', href: '/' },
    { label: 'Jam' }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJam, setEditingJam] = useState<JamData | null>(null);

  // Sample data for Jam Pelajaran
  const [jamData, setJamData] = useState<JamData[]>([
    { id: 1, kode: 'J01', nama: 'Jam ke-1', waktu_mulai: '07:00', waktu_selesai: '07:45' },
    { id: 2, kode: 'J02', nama: 'Jam ke-2', waktu_mulai: '07:45', waktu_selesai: '08:30' },
    { id: 3, kode: 'J03', nama: 'Jam ke-3', waktu_mulai: '08:30', waktu_selesai: '09:15' },
    { id: 4, kode: 'J04', nama: 'Jam ke-4', waktu_mulai: '09:15', waktu_selesai: '10:00' },
    { id: 5, kode: 'J05', nama: 'Istirahat', waktu_mulai: '10:00', waktu_selesai: '10:15' },
    { id: 6, kode: 'J06', nama: 'Jam ke-5', waktu_mulai: '10:15', waktu_selesai: '11:00' },
    { id: 7, kode: 'J07', nama: 'Jam ke-6', waktu_mulai: '11:00', waktu_selesai: '11:45' },
    { id: 8, kode: 'J08', nama: 'Jam ke-7', waktu_mulai: '11:45', waktu_selesai: '12:30' },
  ]);

  const form = useForm<Omit<JamData, 'id'>>({
    defaultValues: {
      kode: '',
      nama: '',
      waktu_mulai: '',
      waktu_selesai: ''
    }
  });

  // Filter data based on search term
  const filteredData = jamData.filter(jam =>
    jam.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    jam.kode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddJam = () => {
    setEditingJam(null);
    form.reset({
      kode: '',
      nama: '',
      waktu_mulai: '',
      waktu_selesai: ''
    });
    setIsDialogOpen(true);
  };

  const handleEditJam = (jam: JamData) => {
    setEditingJam(jam);
    form.reset({
      kode: jam.kode,
      nama: jam.nama,
      waktu_mulai: jam.waktu_mulai,
      waktu_selesai: jam.waktu_selesai
    });
    setIsDialogOpen(true);
  };

  const handleDeleteJam = (id: number) => {
    setJamData(jamData.filter(jam => jam.id !== id));
    toast({
      title: "Berhasil",
      description: "Data jam berhasil dihapus.",
    });
  };

  const onSubmit = (data: Omit<JamData, 'id'>) => {
    if (editingJam) {
      // Update existing jam
      setJamData(jamData.map(jam => 
        jam.id === editingJam.id 
          ? { ...jam, ...data }
          : jam
      ));
      toast({
        title: "Berhasil",
        description: "Data jam berhasil diperbarui.",
      });
    } else {
      // Add new jam
      const newJam: JamData = {
        id: Math.max(...jamData.map(j => j.id)) + 1,
        ...data
      };
      setJamData([...jamData, newJam]);
      toast({
        title: "Berhasil",
        description: "Data jam berhasil ditambahkan.",
      });
    }
    setIsDialogOpen(false);
    form.reset();
  };

  return (
    <MainLayout title="Jam">
      <div className="container mx-auto">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="bg-white p-4 rounded-md shadow mb-6">
          <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
            <Clock size={20} />
            Data Jam Pelajaran
          </h3>
          <p className="text-gray-600 mt-2">Halaman ini berisi daftar jam pelajaran yang digunakan dalam jadwal.</p>
        </div>

        <div className="bg-white p-4 rounded-md shadow">
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Cari jam pelajaran..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-1" onClick={handleAddJam}>
                  <PlusCircle size={16} />
                  Tambah Jam
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingJam ? 'Edit Jam' : 'Tambah Jam'}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="kode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kode</FormLabel>
                          <FormControl>
                            <Input placeholder="Masukkan kode jam" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="nama"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nama</FormLabel>
                          <FormControl>
                            <Input placeholder="Masukkan nama jam" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="waktu_mulai"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Waktu Mulai</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="waktu_selesai"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Waktu Selesai</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end gap-2 pt-4">
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Batal
                      </Button>
                      <Button type="submit">
                        {editingJam ? 'Perbarui' : 'Tambah'}
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Kode</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Waktu Mulai</TableHead>
                  <TableHead>Waktu Selesai</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((jam, index) => (
                    <TableRow key={jam.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{jam.kode}</TableCell>
                      <TableCell>{jam.nama}</TableCell>
                      <TableCell>{jam.waktu_mulai}</TableCell>
                      <TableCell>{jam.waktu_selesai}</TableCell>
                      <TableCell className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditJam(jam)}>
                          <Edit size={14} />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              <Trash2 size={14} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Hapus Jam</AlertDialogTitle>
                              <AlertDialogDescription>
                                Apakah Anda yakin ingin menghapus jam "{jam.nama}"? 
                                Tindakan ini tidak dapat dibatalkan.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteJam(jam.id)}>
                                Hapus
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      Tidak ada data jam pelajaran yang ditemukan.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Jam;
