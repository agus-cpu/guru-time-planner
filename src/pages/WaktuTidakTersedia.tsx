
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Breadcrumb from '@/components/ui/breadcrumb';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BellOff, PlusCircle, Search, Edit, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';

interface WaktuTidakTersediaData {
  id: number;
  guru: string;
  hari: string;
  jam: string;
  keterangan: string;
}

const WaktuTidakTersedia = () => {
  const breadcrumbItems = [
    { label: 'Beranda', href: '/' },
    { label: 'Waktu Tidak Tersedia' }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingWaktu, setEditingWaktu] = useState<WaktuTidakTersediaData | null>(null);

  // Sample data for Waktu Tidak Tersedia
  const [waktuTidakTersediaData, setWaktuTidakTersediaData] = useState<WaktuTidakTersediaData[]>([
    { id: 1, guru: 'Budi Santoso, S.Pd', hari: 'Senin', jam: 'Jam ke-1', keterangan: 'Rapat Mingguan' },
    { id: 2, guru: 'Siti Nurhaliza, M.Pd', hari: 'Selasa', jam: 'Jam ke-7', keterangan: 'Tugas Luar' },
    { id: 3, guru: 'Ahmad Dahlan, S.Pd', hari: 'Rabu', jam: 'Jam ke-2', keterangan: 'Pelatihan' },
    { id: 4, guru: 'Ratna Sari, S.Pd', hari: 'Kamis', jam: 'Jam ke-3', keterangan: 'Jadwal di Sekolah Lain' },
    { id: 5, guru: 'Hendra Wijaya, M.Pd', hari: 'Jumat', jam: 'Jam ke-6', keterangan: 'Izin Keluarga' },
    { id: 6, guru: 'Amrul Maulana, S.Pd', hari: 'Sabtu', jam: 'Jam ke-2', keterangan: 'Izin Sakit' },
    { id: 7, guru: 'Mauliani, M.Pd, M.Pd', hari: 'Selasa', jam: 'Jam ke-7', keterangan: 'Tugas Luar' },
    { id: 8, guru: 'Dahlan Saputra, S.Pd', hari: 'Rabu', jam: 'Jam ke-2', keterangan: 'Pelatihan' },
    { id: 9, guru: 'Rahul Pratama, S.Pd', hari: 'Kamis', jam: 'Jam ke-1', keterangan: 'Jadwal di Sekolah Lain' },
    { id: 10, guru: 'Wijayatullah, M.Pd', hari: 'Jumat', jam: 'Jam ke-4', keterangan: 'Izin Keluarga' },
  ]);

  const form = useForm<Omit<WaktuTidakTersediaData, 'id'>>({
    defaultValues: {
      guru: '',
      hari: '',
      jam: '',
      keterangan: ''
    }
  });

  // Sample data for dropdowns
  const guruOptions = [
    'Budi Santoso, S.Pd',
    'Siti Nurhaliza, M.Pd',
    'Ahmad Dahlan, S.Pd',
    'Ratna Sari, S.Pd',
    'Hendra Wijaya, M.Pd',
    'Maya Kusuma, S.Pd',
    'Andi Pratama, M.Pd'
  ];

  const hariOptions = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const jamOptions = ['Jam ke-1', 'Jam ke-2', 'Jam ke-3', 'Jam ke-4', 'Jam ke-5', 'Jam ke-6', 'Jam ke-7', 'Jam ke-8'];

  // Filter data based on search term
  const filteredData = waktuTidakTersediaData.filter(wtt =>
    wtt.guru.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wtt.hari.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddWaktu = () => {
    setEditingWaktu(null);
    form.reset({
      guru: '',
      hari: '',
      jam: '',
      keterangan: ''
    });
    setIsDialogOpen(true);
  };

  const handleEditWaktu = (waktu: WaktuTidakTersediaData) => {
    setEditingWaktu(waktu);
    form.reset({
      guru: waktu.guru,
      hari: waktu.hari,
      jam: waktu.jam,
      keterangan: waktu.keterangan
    });
    setIsDialogOpen(true);
  };

  const handleDeleteWaktu = (id: number) => {
    setWaktuTidakTersediaData(waktuTidakTersediaData.filter(waktu => waktu.id !== id));
    toast({
      title: "Berhasil",
      description: "Data waktu tidak tersedia berhasil dihapus.",
    });
  };

  const onSubmit = (data: Omit<WaktuTidakTersediaData, 'id'>) => {
    if (editingWaktu) {
      // Update existing waktu
      setWaktuTidakTersediaData(waktuTidakTersediaData.map(waktu => 
        waktu.id === editingWaktu.id 
          ? { ...waktu, ...data }
          : waktu
      ));
      toast({
        title: "Berhasil",
        description: "Data waktu tidak tersedia berhasil diperbarui.",
      });
    } else {
      // Add new waktu
      const newWaktu: WaktuTidakTersediaData = {
        id: Math.max(...waktuTidakTersediaData.map(w => w.id)) + 1,
        ...data
      };
      setWaktuTidakTersediaData([...waktuTidakTersediaData, newWaktu]);
      toast({
        title: "Berhasil",
        description: "Data waktu tidak tersedia berhasil ditambahkan.",
      });
    }
    setIsDialogOpen(false);
    form.reset();
  };

  return (
    <MainLayout title="Waktu Tidak Tersedia">
      <div className="container mx-auto">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="bg-white p-4 rounded-md shadow mb-6">
          <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
            <BellOff size={20} />
            Waktu Tidak Tersedia
          </h3>
          <p className="text-gray-600 mt-2">Halaman ini berisi daftar waktu dimana guru tidak tersedia untuk mengajar.</p>
        </div>

        <div className="bg-white p-4 rounded-md shadow">
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Cari waktu tidak tersedia..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-1" onClick={handleAddWaktu}>
                  <PlusCircle size={16} />
                  Tambah Waktu Tidak Tersedia
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{editingWaktu ? 'Edit Waktu Tidak Tersedia' : 'Tambah Waktu Tidak Tersedia'}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="guru"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Guru</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih guru" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {guruOptions.map((guru) => (
                                <SelectItem key={guru} value={guru}>
                                  {guru}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="hari"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hari</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih hari" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {hariOptions.map((hari) => (
                                <SelectItem key={hari} value={hari}>
                                  {hari}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="jam"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Jam</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih jam" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {jamOptions.map((jam) => (
                                <SelectItem key={jam} value={jam}>
                                  {jam}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="keterangan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Keterangan</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Masukkan keterangan" {...field} />
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
                        {editingWaktu ? 'Perbarui' : 'Tambah'}
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
                  <TableHead>Guru</TableHead>
                  <TableHead>Hari</TableHead>
                  <TableHead>Jam</TableHead>
                  <TableHead>Keterangan</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((wtt, index) => (
                    <TableRow key={wtt.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{wtt.guru}</TableCell>
                      <TableCell>{wtt.hari}</TableCell>
                      <TableCell>{wtt.jam}</TableCell>
                      <TableCell>{wtt.keterangan}</TableCell>
                      <TableCell className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditWaktu(wtt)}>
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
                              <AlertDialogTitle>Hapus Waktu Tidak Tersedia</AlertDialogTitle>
                              <AlertDialogDescription>
                                Apakah Anda yakin ingin menghapus data waktu tidak tersedia untuk "{wtt.guru}" pada {wtt.hari} {wtt.jam}? 
                                Tindakan ini tidak dapat dibatalkan.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteWaktu(wtt.id)}>
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
                      Tidak ada data waktu tidak tersedia yang ditemukan.
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

export default WaktuTidakTersedia;
