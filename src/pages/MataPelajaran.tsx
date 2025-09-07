
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Breadcrumb from '@/components/ui/breadcrumb';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { BookOpen, PlusCircle, Search, Edit, Trash2 } from 'lucide-react';

const MataPelajaran = () => {
  const breadcrumbItems = [
    { label: 'Beranda', href: '/' },
    { label: 'Mata Pelajaran' }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [mataPelajaranData, setMataPelajaranData] = useState([
    { id: 1, kode: 'MP001', nama: 'Matematika', kelas: 'X', semester: 'Ganjil', jumlah_jam: 4 },
    { id: 2, kode: 'MP002', nama: 'Bahasa Indonesia', kelas: 'X', semester: 'Ganjil', jumlah_jam: 4 },
    { id: 3, kode: 'MP003', nama: 'Bahasa Inggris', kelas: 'X', semester: 'Ganjil', jumlah_jam: 3 },
    { id: 4, kode: 'MP004', nama: 'Agama', kelas: 'X', semester: 'Ganjil', jumlah_jam: 3 },
    { id: 5, kode: 'MP005', nama: 'Seni Budaya', kelas: 'X', semester: 'Ganjil', jumlah_jam: 3 },
    { id: 6, kode: 'MP006', nama: 'Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)', kelas: 'X', semester: 'Ganjil', jumlah_jam: 4 },
    { id: 7, kode: 'MP007', nama: 'PPKN', kelas: 'X', semester: 'Ganjil', jumlah_jam: 3 },
    { id: 8, kode: 'MP008', nama: 'IPA', kelas: 'X', semester: 'Ganjil', jumlah_jam: 4 },
    { id: 9, kode: 'MP009', nama: 'IPS', kelas: 'X', semester: 'Ganjil', jumlah_jam: 3 },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingMataPelajaran, setEditingMataPelajaran] = useState(null);
  const [deletingMataPelajaran, setDeletingMataPelajaran] = useState(null);
  const { toast } = useToast();

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  // Filter data based on search term
  const filteredData = mataPelajaranData.filter(mp =>
    mp.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mp.kode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setEditingMataPelajaran(null);
    reset();
    setIsDialogOpen(true);
  };

  const handleEdit = (mataPelajaran) => {
    setEditingMataPelajaran(mataPelajaran);
    setValue('kode', mataPelajaran.kode);
    setValue('nama', mataPelajaran.nama);
    setValue('kelas', mataPelajaran.kelas);
    setValue('semester', mataPelajaran.semester);
    setValue('jumlah_jam', mataPelajaran.jumlah_jam);
    setIsDialogOpen(true);
  };

  const handleDelete = (mataPelajaran) => {
    setDeletingMataPelajaran(mataPelajaran);
    setIsDeleteDialogOpen(true);
  };

  const onSubmit = (data) => {
    if (editingMataPelajaran) {
      setMataPelajaranData(prev => prev.map(mp => 
        mp.id === editingMataPelajaran.id ? { ...mp, ...data, jumlah_jam: parseInt(data.jumlah_jam) } : mp
      ));
      toast({
        title: "Sukses",
        description: "Data mata pelajaran berhasil diperbarui",
      });
    } else {
      const newMataPelajaran = {
        id: Math.max(...mataPelajaranData.map(mp => mp.id)) + 1,
        ...data,
        jumlah_jam: parseInt(data.jumlah_jam)
      };
      setMataPelajaranData(prev => [...prev, newMataPelajaran]);
      toast({
        title: "Sukses",
        description: "Mata pelajaran baru berhasil ditambahkan",
      });
    }
    setIsDialogOpen(false);
    reset();
  };

  const confirmDelete = () => {
    setMataPelajaranData(prev => prev.filter(mp => mp.id !== deletingMataPelajaran.id));
    toast({
      title: "Sukses",
      description: "Data mata pelajaran berhasil dihapus",
    });
    setIsDeleteDialogOpen(false);
    setDeletingMataPelajaran(null);
  };

  return (
    <MainLayout title="Mata Pelajaran">
      <div className="container mx-auto">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="bg-white p-4 rounded-md shadow mb-6">
          <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
            <BookOpen size={20} />
            Data Mata Pelajaran
          </h3>
          <p className="text-gray-600 mt-2">Halaman ini berisi daftar mata pelajaran yang diajarkan.</p>
        </div>

        <div className="bg-white p-4 rounded-md shadow">
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Cari mata pelajaran..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleAdd} className="flex items-center gap-1">
              <PlusCircle size={16} />
              Tambah Mata Pelajaran
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Kode</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Kelas</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead>Jumlah Jam</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((mp, index) => (
                    <TableRow key={mp.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{mp.kode}</TableCell>
                      <TableCell>{mp.nama}</TableCell>
                      <TableCell>{mp.kelas}</TableCell>
                      <TableCell>{mp.semester}</TableCell>
                      <TableCell>{mp.jumlah_jam}</TableCell>
                       <TableCell className="flex gap-2">
                         <Button 
                           variant="outline" 
                           size="sm" 
                           onClick={() => handleEdit(mp)}
                           className="flex items-center gap-1"
                         >
                           <Edit size={14} />
                           Edit
                         </Button>
                         <Button 
                           variant="destructive" 
                           size="sm"
                           onClick={() => handleDelete(mp)}
                           className="flex items-center gap-1"
                         >
                           <Trash2 size={14} />
                           Hapus
                         </Button>
                       </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      Tidak ada mata pelajaran yang ditemukan.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingMataPelajaran ? 'Edit Mata Pelajaran' : 'Tambah Mata Pelajaran'}
              </DialogTitle>
              <DialogDescription>
                {editingMataPelajaran ? 'Edit data mata pelajaran' : 'Tambah mata pelajaran baru ke dalam sistem'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="kode">Kode Mata Pelajaran</Label>
                <Input
                  id="kode"
                  {...register("kode", { required: "Kode mata pelajaran harus diisi" })}
                  placeholder="Masukkan kode mata pelajaran"
                />
                {errors.kode && <p className="text-sm text-red-500">{String(errors.kode.message)}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="nama">Nama Mata Pelajaran</Label>
                <Input
                  id="nama"
                  {...register("nama", { required: "Nama mata pelajaran harus diisi" })}
                  placeholder="Masukkan nama mata pelajaran"
                />
                {errors.nama && <p className="text-sm text-red-500">{String(errors.nama.message)}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="kelas">Kelas</Label>
                <Select onValueChange={(value) => setValue("kelas", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kelas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="X">X</SelectItem>
                    <SelectItem value="XI">XI</SelectItem>
                    <SelectItem value="XII">XII</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="semester">Semester</Label>
                <Select onValueChange={(value) => setValue("semester", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ganjil">Ganjil</SelectItem>
                    <SelectItem value="Genap">Genap</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="jumlah_jam">Jumlah Jam</Label>
                <Input
                  id="jumlah_jam"
                  type="number"
                  {...register("jumlah_jam", { required: "Jumlah jam harus diisi", min: 1 })}
                  placeholder="Masukkan jumlah jam"
                />
                {errors.jumlah_jam && <p className="text-sm text-red-500">{String(errors.jumlah_jam.message)}</p>}
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Batal
                </Button>
                <Button type="submit">
                  {editingMataPelajaran ? 'Simpan Perubahan' : 'Tambah Mata Pelajaran'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus mata pelajaran "{deletingMataPelajaran?.nama}"? 
                Tindakan ini tidak dapat dibatalkan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
                Hapus
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </MainLayout>
  );
};

export default MataPelajaran;
