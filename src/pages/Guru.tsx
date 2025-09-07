
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
import { PlusCircle, Search, Users, Edit, Trash2 } from 'lucide-react';

const Guru = () => {
  const breadcrumbItems = [
    { label: 'Beranda', href: '/' },
    { label: 'Guru' }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [guruData, setGuruData] = useState([
    { id: 1, kode: 'G001', nama: 'Budi Santoso, S.Pd', jenis_kelamin: 'L', alamat: 'Jl. Pahlawan No. 123', no_telepon: '081234567890' },
    { id: 2, kode: 'G002', nama: 'Siti Nurhaliza, M.Pd', jenis_kelamin: 'P', alamat: 'Jl. Merdeka No. 45', no_telepon: '082345678901' },
    { id: 3, kode: 'G003', nama: 'Ahmad Dahlan, S.Pd', jenis_kelamin: 'L', alamat: 'Jl. Sudirman No. 78', no_telepon: '083456789012' },
    { id: 4, kode: 'G004', nama: 'Ratna Sari, S.Pd', jenis_kelamin: 'P', alamat: 'Jl. Pemuda No. 32', no_telepon: '084567890123' },
    { id: 5, kode: 'G005', nama: 'Hendra Wijaya, M.Pd', jenis_kelamin: 'L', alamat: 'Jl. Ahmad Yani No. 56', no_telepon: '085678901234' },
    { id: 6, kode: 'G006', nama: 'Amrul Maulana, S.Pd', jenis_kelamin: 'L', alamat: 'Jl. Ahmad Kandang No. 123', no_telepon: '081234567888' },
    { id: 7, kode: 'G007', nama: 'Mauliani, M.Pd', jenis_kelamin: 'P', alamat: 'Jl. Merdeka No. 40', no_telepon: '082345678900' },
    { id: 8, kode: 'G008', nama: 'Dahlan Saputra, S.Pd', jenis_kelamin: 'L', alamat: 'Jl. Sudirman No. 70', no_telepon: '083456789022' },
    { id: 9, kode: 'G009', nama: 'Rahul Pratama, S.Pd', jenis_kelamin: 'P', alamat: 'Jl. Kandang No. 01', no_telepon: '084567890124' },
    { id: 10, kode: 'G010', nama: 'Wijayatullah, M.Pd', jenis_kelamin: 'L', alamat: 'Jl. Ahmad Kandang No. 56', no_telepon: '085678900000' },
    { id: 11, kode: 'G011', nama: 'Ahmad Sabrianto, S.Pd', jenis_kelamin: 'L', alamat: 'Jl. Hagu Barat No. 12', no_telepon: '081234567777' },
    { id: 12, kode: 'G012', nama: 'Julahiha, M.Pd', jenis_kelamin: 'P', alamat: 'Jl. Kodim No. 45', no_telepon: '082345678909' },
    { id: 13, kode: 'G013', nama: 'Abdullah, S.Pd', jenis_kelamin: 'L', alamat: 'Jl. Lancang Garam No. 78', no_telepon: '083456789098' },
    { id: 14, kode: 'G014', nama: 'Ayuliani, S.Pd', jenis_kelamin: 'P', alamat: 'Jl. Perwira No. 39', no_telepon: '084567890121' },
    { id: 15, kode: 'G015', nama: 'Irwansyah, M.Pd', jenis_kelamin: 'L', alamat: 'Jl. Ahmad Yani No. 55', no_telepon: '085678901333' },
    { id: 16, kode: 'G016', nama: 'Abdul Saputra, S.Pd', jenis_kelamin: 'L', alamat: 'Jl. Pahlawan No. 122', no_telepon: '081234567800' },
    { id: 17, kode: 'G017', nama: 'Siti Ratnawati, M.Pd', jenis_kelamin: 'P', alamat: 'Jl. Kandang No. 45', no_telepon: '082345678932' },
    { id: 18, kode: 'G018', nama: 'Dahri, S.Pd', jenis_kelamin: 'L', alamat: 'Jl. Hagu  No. 79', no_telepon: '0834567890087' },
    { id: 19, kode: 'G019', nama: 'Dahliani, S.Pd', jenis_kelamin: 'P', alamat: 'Jl. Cunda No. 11', no_telepon: '084567890321' },
    { id: 20, kode: 'G020', nama: 'Nasir Hayatullah, M.Pd', jenis_kelamin: 'L', alamat: 'Jl. Ahmad Kandang No. 50', no_telepon: '085678901897' },


  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingGuru, setEditingGuru] = useState(null);
  const [deletingGuru, setDeletingGuru] = useState(null);
  const { toast } = useToast();

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  // Filter data based on search term
  const filteredData = guruData.filter(guru =>
    guru.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guru.kode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setEditingGuru(null);
    reset();
    setIsDialogOpen(true);
  };

  const handleEdit = (guru) => {
    setEditingGuru(guru);
    setValue('kode', guru.kode);
    setValue('nama', guru.nama);
    setValue('jenis_kelamin', guru.jenis_kelamin);
    setValue('alamat', guru.alamat);
    setValue('no_telepon', guru.no_telepon);
    setIsDialogOpen(true);
  };

  const handleDelete = (guru) => {
    setDeletingGuru(guru);
    setIsDeleteDialogOpen(true);
  };

  const onSubmit = (data) => {
    if (editingGuru) {
      setGuruData(prev => prev.map(guru => 
        guru.id === editingGuru.id ? { ...guru, ...data } : guru
      ));
      toast({
        title: "Sukses",
        description: "Data guru berhasil diperbarui",
      });
    } else {
      const newGuru = {
        id: Math.max(...guruData.map(g => g.id)) + 1,
        ...data
      };
      setGuruData(prev => [...prev, newGuru]);
      toast({
        title: "Sukses",
        description: "Guru baru berhasil ditambahkan",
      });
    }
    setIsDialogOpen(false);
    reset();
  };

  const confirmDelete = () => {
    setGuruData(prev => prev.filter(guru => guru.id !== deletingGuru.id));
    toast({
      title: "Sukses",
      description: "Data guru berhasil dihapus",
    });
    setIsDeleteDialogOpen(false);
    setDeletingGuru(null);
  };

  return (
    <MainLayout title="Guru">
      <div className="container mx-auto">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="bg-white p-4 rounded-md shadow mb-6">
          <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
            <Users size={20} />
            Data Guru
          </h3>
          <p className="text-gray-600 mt-2">Halaman ini berisi daftar data guru yang mengajar.</p>
        </div>

        <div className="bg-white p-4 rounded-md shadow">
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Cari guru..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleAdd} className="flex items-center gap-1">
              <PlusCircle size={16} />
              Tambah Guru
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Kode</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Jenis Kelamin</TableHead>
                  <TableHead>Alamat</TableHead>
                  <TableHead>No. Telepon</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((guru, index) => (
                    <TableRow key={guru.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{guru.kode}</TableCell>
                      <TableCell>{guru.nama}</TableCell>
                      <TableCell>{guru.jenis_kelamin}</TableCell>
                      <TableCell>{guru.alamat}</TableCell>
                      <TableCell>{guru.no_telepon}</TableCell>
                      <TableCell className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEdit(guru)}
                          className="flex items-center gap-1"
                        >
                          <Edit size={14} />
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDelete(guru)}
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
                      Tidak ada data guru yang ditemukan.
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
                {editingGuru ? 'Edit Guru' : 'Tambah Guru'}
              </DialogTitle>
              <DialogDescription>
                {editingGuru ? 'Edit data guru' : 'Tambah guru baru ke dalam sistem'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="kode">Kode Guru</Label>
                <Input
                  id="kode"
                  {...register("kode", { required: "Kode guru harus diisi" })}
                  placeholder="Masukkan kode guru"
                />
                {errors.kode && <p className="text-sm text-red-500">{String(errors.kode.message)}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="nama">Nama Guru</Label>
                <Input
                  id="nama"
                  {...register("nama", { required: "Nama guru harus diisi" })}
                  placeholder="Masukkan nama guru"
                />
                {errors.nama && <p className="text-sm text-red-500">{String(errors.nama.message)}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="jenis_kelamin">Jenis Kelamin</Label>
                <Select onValueChange={(value) => setValue("jenis_kelamin", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis kelamin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="L">Laki-laki</SelectItem>
                    <SelectItem value="P">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="alamat">Alamat</Label>
                <Input
                  id="alamat"
                  {...register("alamat", { required: "Alamat harus diisi" })}
                  placeholder="Masukkan alamat"
                />
                {errors.alamat && <p className="text-sm text-red-500">{String(errors.alamat.message)}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="no_telepon">No. Telepon</Label>
                <Input
                  id="no_telepon"
                  {...register("no_telepon", { required: "No. telepon harus diisi" })}
                  placeholder="Masukkan no. telepon"
                />
                {errors.no_telepon && <p className="text-sm text-red-500">{String(errors.no_telepon.message)}</p>}
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Batal
                </Button>
                <Button type="submit">
                  {editingGuru ? 'Simpan Perubahan' : 'Tambah Guru'}
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
                Apakah Anda yakin ingin menghapus guru "{deletingGuru?.nama}"? 
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

export default Guru;
