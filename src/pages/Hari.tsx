
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Breadcrumb from '@/components/ui/breadcrumb';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Calendar, PlusCircle, Search, Edit, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';

interface HariData {
  id: number;
  kode: string;
  nama: string;
}

const Hari = () => {
  const breadcrumbItems = [
    { label: 'Beranda', href: '/' },
    { label: 'Hari' }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingHari, setEditingHari] = useState<HariData | null>(null);

  // Sample data for Hari
  const [hariData, setHariData] = useState<HariData[]>([
    { id: 1, kode: 'H1', nama: 'Senin' },
    { id: 2, kode: 'H2', nama: 'Selasa' },
    { id: 3, kode: 'H3', nama: 'Rabu' },
    { id: 4, kode: 'H4', nama: 'Kamis' },
    { id: 5, kode: 'H5', nama: 'Jumat' },
    { id: 6, kode: 'H6', nama: 'Sabtu' }
  ]);

  const form = useForm<Omit<HariData, 'id'>>({
    defaultValues: {
      kode: '',
      nama: ''
    }
  });

  // Filter data based on search term
  const filteredData = hariData.filter(hari =>
    hari.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hari.kode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddHari = () => {
    setEditingHari(null);
    form.reset({
      kode: '',
      nama: ''
    });
    setIsDialogOpen(true);
  };

  const handleEditHari = (hari: HariData) => {
    setEditingHari(hari);
    form.reset({
      kode: hari.kode,
      nama: hari.nama
    });
    setIsDialogOpen(true);
  };

  const handleDeleteHari = (id: number) => {
    setHariData(hariData.filter(hari => hari.id !== id));
    toast({
      title: "Berhasil",
      description: "Data hari berhasil dihapus.",
    });
  };

  const onSubmit = (data: Omit<HariData, 'id'>) => {
    if (editingHari) {
      // Update existing hari
      setHariData(hariData.map(hari => 
        hari.id === editingHari.id 
          ? { ...hari, ...data }
          : hari
      ));
      toast({
        title: "Berhasil",
        description: "Data hari berhasil diperbarui.",
      });
    } else {
      // Add new hari
      const newHari: HariData = {
        id: Math.max(...hariData.map(h => h.id)) + 1,
        ...data
      };
      setHariData([...hariData, newHari]);
      toast({
        title: "Berhasil",
        description: "Data hari berhasil ditambahkan.",
      });
    }
    setIsDialogOpen(false);
    form.reset();
  };

  return (
    <MainLayout title="Hari">
      <div className="container mx-auto">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="bg-white p-4 rounded-md shadow mb-6">
          <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
            <Calendar size={20} />
            Data Hari
          </h3>
          <p className="text-gray-600 mt-2">Halaman ini berisi daftar hari yang digunakan dalam penjadwalan.</p>
        </div>

        <div className="bg-white p-4 rounded-md shadow">
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Cari hari..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-1" onClick={handleAddHari}>
                  <PlusCircle size={16} />
                  Tambah Hari
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingHari ? 'Edit Hari' : 'Tambah Hari'}</DialogTitle>
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
                            <Input placeholder="Masukkan kode hari" {...field} />
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
                          <FormLabel>Nama Hari</FormLabel>
                          <FormControl>
                            <Input placeholder="Masukkan nama hari" {...field} />
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
                        {editingHari ? 'Perbarui' : 'Tambah'}
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
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((hari, index) => (
                    <TableRow key={hari.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{hari.kode}</TableCell>
                      <TableCell>{hari.nama}</TableCell>
                      <TableCell className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditHari(hari)}>
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
                              <AlertDialogTitle>Hapus Hari</AlertDialogTitle>
                              <AlertDialogDescription>
                                Apakah Anda yakin ingin menghapus hari "{hari.nama}"? 
                                Tindakan ini tidak dapat dibatalkan.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteHari(hari.id)}>
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
                    <TableCell colSpan={4} className="text-center py-4">
                      Tidak ada data hari yang ditemukan.
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

export default Hari;
