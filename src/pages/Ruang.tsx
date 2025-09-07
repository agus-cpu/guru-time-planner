
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Breadcrumb from '@/components/ui/breadcrumb';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building2, PlusCircle, Search, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

interface RuangData {
  id: number;
  kode: string;
  nama: string;
  kapasitas: number;
  jenis: string;
}

interface RuangFormData {
  kode: string;
  nama: string;
  kapasitas: string;
  jenis: string;
}

const Ruang = () => {
  const { toast } = useToast();
  const breadcrumbItems = [
    { label: 'Beranda', href: '/' },
    { label: 'Ruang' }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRuang, setEditingRuang] = useState<RuangData | null>(null);

  // Sample data for Ruang with state management
  const [ruangData, setRuangData] = useState<RuangData[]>([
    { id: 1, kode: 'R001', nama: 'Ruang Kelas 1A', kapasitas: 35, jenis: 'Kelas' },
    { id: 2, kode: 'R002', nama: 'Ruang Kelas 1B', kapasitas: 35, jenis: 'Kelas' },
    { id: 3, kode: 'R003', nama: 'Ruang Kelas 2A', kapasitas: 35, jenis: 'Kelas' },
    { id: 4, kode: 'R004', nama: 'Ruang Kelas 2B', kapasitas: 30, jenis: 'Kelas' },
    { id: 5, kode: 'R005', nama: 'Ruang Kelas 3A', kapasitas: 25, jenis: 'Kelas' },
    { id: 6, kode: 'R006', nama: 'Ruang Kelas 3B', kapasitas: 25, jenis: 'Kelas' },
    { id: 7, kode: 'R007', nama: 'Ruang Kelas 4A', kapasitas: 35, jenis: 'Kelas' },
    { id: 8, kode: 'R008', nama: 'Ruang Kelas 4B', kapasitas: 25, jenis: 'Kelas' },
    { id: 9, kode: 'R009', nama: 'Ruang Kelas 5A', kapasitas: 30, jenis: 'Kelas' },
    { id: 10, kode: 'R010', nama: 'Ruang Kelas 5B', kapasitas: 25, jenis: 'Kelas' },
    { id: 11, kode: 'R011', nama: 'Ruang Kelas 6A', kapasitas: 35, jenis: 'Kelas' },
    { id: 12, kode: 'R012', nama: 'Ruang Kelas 6B', kapasitas: 30, jenis: 'Kelas' },
    { id: 13, kode: 'R006', nama: 'Ruang Perpustakaan', kapasitas: 50, jenis: 'Perpustakaan' },
  ]);

  const form = useForm<RuangFormData>({
    defaultValues: {
      kode: '',
      nama: '',
      kapasitas: '',
      jenis: '',
    },
  });

  // Filter data based on search term
  const filteredData = ruangData.filter(ruang =>
    ruang.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ruang.kode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setEditingRuang(null);
    form.reset({
      kode: '',
      nama: '',
      kapasitas: '',
      jenis: '',
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (ruang: RuangData) => {
    setEditingRuang(ruang);
    form.reset({
      kode: ruang.kode,
      nama: ruang.nama,
      kapasitas: ruang.kapasitas.toString(),
      jenis: ruang.jenis,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setRuangData(prev => prev.filter(ruang => ruang.id !== id));
    toast({
      title: "Berhasil",
      description: "Data ruang berhasil dihapus.",
    });
  };

  const onSubmit = (data: RuangFormData) => {
    const kapasitas = parseInt(data.kapasitas);
    
    if (editingRuang) {
      // Update existing ruang
      setRuangData(prev => prev.map(ruang => 
        ruang.id === editingRuang.id 
          ? { ...ruang, kode: data.kode, nama: data.nama, kapasitas, jenis: data.jenis }
          : ruang
      ));
      toast({
        title: "Berhasil",
        description: "Data ruang berhasil diperbarui.",
      });
    } else {
      // Add new ruang
      const newId = Math.max(...ruangData.map(r => r.id)) + 1;
      const newRuang: RuangData = {
        id: newId,
        kode: data.kode,
        nama: data.nama,
        kapasitas,
        jenis: data.jenis,
      };
      setRuangData(prev => [...prev, newRuang]);
      toast({
        title: "Berhasil",
        description: "Data ruang berhasil ditambahkan.",
      });
    }
    
    setIsDialogOpen(false);
    form.reset();
  };

  return (
    <MainLayout title="Ruang">
      <div className="container mx-auto">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="bg-white p-4 rounded-md shadow mb-6">
          <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
            <Building2 size={20} />
            Data Ruang
          </h3>
          <p className="text-gray-600 mt-2">Halaman ini berisi daftar ruangan yang digunakan untuk mengajar.</p>
        </div>

        <div className="bg-white p-4 rounded-md shadow">
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Cari ruang..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleAdd} className="flex items-center gap-1">
                  <PlusCircle size={16} />
                  Tambah Ruang
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>
                    {editingRuang ? 'Edit Ruang' : 'Tambah Ruang Baru'}
                  </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="kode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kode Ruang</FormLabel>
                          <FormControl>
                            <Input placeholder="Masukkan kode ruang" {...field} />
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
                          <FormLabel>Nama Ruang</FormLabel>
                          <FormControl>
                            <Input placeholder="Masukkan nama ruang" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="kapasitas"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kapasitas</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Masukkan kapasitas" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="jenis"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Jenis Ruang</FormLabel>
                          <FormControl>
                            <Input placeholder="Masukkan jenis ruang" {...field} />
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
                        {editingRuang ? 'Perbarui' : 'Tambah'}
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
                  <TableHead>Kapasitas</TableHead>
                  <TableHead>Jenis</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((ruang, index) => (
                    <TableRow key={ruang.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{ruang.kode}</TableCell>
                      <TableCell>{ruang.nama}</TableCell>
                      <TableCell>{ruang.kapasitas}</TableCell>
                      <TableCell>{ruang.jenis}</TableCell>
                      <TableCell className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEdit(ruang)}
                        >
                          <Edit size={14} className="mr-1" />
                          Edit
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              <Trash2 size={14} className="mr-1" />
                              Hapus
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
                              <AlertDialogDescription>
                                Apakah Anda yakin ingin menghapus ruang "{ruang.nama}"? 
                                Tindakan ini tidak dapat dibatalkan.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDelete(ruang.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
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
                      Tidak ada data ruang yang ditemukan.
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

export default Ruang;
