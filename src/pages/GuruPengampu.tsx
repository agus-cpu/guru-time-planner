
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
import { PlusCircle, Search, UserCheck, Edit, Trash2 } from 'lucide-react';

const GuruPengampu = () => {
  const breadcrumbItems = [
    { label: 'Beranda', href: '/' },
    { label: 'Guru Pengampu' }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [guruPengampuData, setGuruPengampuData] = useState([
    { id: 1, guru: 'Budi Santoso, S.Pd', mata_pelajaran: 'Matematika', kelas: 'X-A', semester: 'Ganjil', tahun_ajaran: '2023/2024' },
    { id: 2, guru: 'Siti Nurhaliza, M.Pd', mata_pelajaran: 'Bahasa Indonesia', kelas: 'X-B', semester: 'Ganjil', tahun_ajaran: '2023/2024' },
    { id: 3, guru: 'Ahmad Dahlan, S.Pd', mata_pelajaran: 'Bahasa Inggris', kelas: 'X-A', semester: 'Ganjil', tahun_ajaran: '2023/2024' },
    { id: 4, guru: 'Ratna Sari, S.Pd', mata_pelajaran: 'Fisika', kelas: 'X-C', semester: 'Ganjil', tahun_ajaran: '2023/2024' },
    { id: 5, guru: 'Hendra Wijaya, M.Pd', mata_pelajaran: 'Kimia', kelas: 'X-B', semester: 'Ganjil', tahun_ajaran: '2023/2024' },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingGuruPengampu, setEditingGuruPengampu] = useState(null);
  const [deletingGuruPengampu, setDeletingGuruPengampu] = useState(null);
  const { toast } = useToast();

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  // Filter data based on search term
  const filteredData = guruPengampuData.filter(gp =>
    gp.guru.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gp.mata_pelajaran.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gp.kelas.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sample options for dropdowns
  const guruOptions = [
    'Budi Santoso, S.Pd',
    'Siti Nurhaliza, M.Pd',
    'Ahmad Dahlan, S.Pd',
    'Ratna Sari, S.Pd',
    'Hendra Wijaya, M.Pd'
  ];

  const mataPelajaranOptions = [
    'Matematika',
    'Bahasa Indonesia',
    'Bahasa Inggris',
    'Seni Budaya',
    'PPKN',
    'Olahraga'
  ];

  const kelasOptions = [
    'X-A', 'X-B', 'X-C',
    'XI-A', 'XI-B', 'XI-C',
    'XII-A', 'XII-B', 'XII-C'
  ];

  const handleAdd = () => {
    setEditingGuruPengampu(null);
    reset();
    setIsDialogOpen(true);
  };

  const handleEdit = (guruPengampu) => {
    setEditingGuruPengampu(guruPengampu);
    setValue('guru', guruPengampu.guru);
    setValue('mata_pelajaran', guruPengampu.mata_pelajaran);
    setValue('kelas', guruPengampu.kelas);
    setValue('semester', guruPengampu.semester);
    setValue('tahun_ajaran', guruPengampu.tahun_ajaran);
    setIsDialogOpen(true);
  };

  const handleDelete = (guruPengampu) => {
    setDeletingGuruPengampu(guruPengampu);
    setIsDeleteDialogOpen(true);
  };

  const onSubmit = (data) => {
    if (editingGuruPengampu) {
      setGuruPengampuData(prev => prev.map(gp => 
        gp.id === editingGuruPengampu.id ? { ...gp, ...data } : gp
      ));
      toast({
        title: "Sukses",
        description: "Data guru pengampu berhasil diperbarui",
      });
    } else {
      const newGuruPengampu = {
        id: Math.max(...guruPengampuData.map(gp => gp.id)) + 1,
        ...data
      };
      setGuruPengampuData(prev => [...prev, newGuruPengampu]);
      toast({
        title: "Sukses",
        description: "Guru pengampu baru berhasil ditambahkan",
      });
    }
    setIsDialogOpen(false);
    reset();
  };

  const confirmDelete = () => {
    setGuruPengampuData(prev => prev.filter(gp => gp.id !== deletingGuruPengampu.id));
    toast({
      title: "Sukses",
      description: "Data guru pengampu berhasil dihapus",
    });
    setIsDeleteDialogOpen(false);
    setDeletingGuruPengampu(null);
  };

  return (
    <MainLayout title="Guru Pengampu">
      <div className="container mx-auto">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="bg-white p-4 rounded-md shadow mb-6">
          <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
            <UserCheck size={20} />
            Data Guru Pengampu
          </h3>
          <p className="text-gray-600 mt-2">Halaman ini berisi daftar guru pengampu mata pelajaran.</p>
        </div>

        <div className="bg-white p-4 rounded-md shadow">
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Cari guru pengampu..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleAdd} className="flex items-center gap-1">
              <PlusCircle size={16} />
              Tambah Guru Pengampu
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Guru</TableHead>
                  <TableHead>Mata Pelajaran</TableHead>
                  <TableHead>Kelas</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead>Tahun Ajaran</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((gp, index) => (
                    <TableRow key={gp.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{gp.guru}</TableCell>
                      <TableCell>{gp.mata_pelajaran}</TableCell>
                      <TableCell>{gp.kelas}</TableCell>
                      <TableCell>{gp.semester}</TableCell>
                      <TableCell>{gp.tahun_ajaran}</TableCell>
                      <TableCell className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEdit(gp)}
                          className="flex items-center gap-1"
                        >
                          <Edit size={14} />
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDelete(gp)}
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
                      Tidak ada data guru pengampu yang ditemukan.
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
                {editingGuruPengampu ? 'Edit Guru Pengampu' : 'Tambah Guru Pengampu'}
              </DialogTitle>
              <DialogDescription>
                {editingGuruPengampu ? 'Edit data guru pengampu' : 'Tambah guru pengampu baru ke dalam sistem'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="guru">Guru</Label>
                <Select onValueChange={(value) => setValue("guru", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih guru" />
                  </SelectTrigger>
                  <SelectContent>
                    {guruOptions.map((guru) => (
                      <SelectItem key={guru} value={guru}>{guru}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="mata_pelajaran">Mata Pelajaran</Label>
                <Select onValueChange={(value) => setValue("mata_pelajaran", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih mata pelajaran" />
                  </SelectTrigger>
                  <SelectContent>
                    {mataPelajaranOptions.map((mp) => (
                      <SelectItem key={mp} value={mp}>{mp}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="kelas">Kelas</Label>
                <Select onValueChange={(value) => setValue("kelas", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kelas" />
                  </SelectTrigger>
                  <SelectContent>
                    {kelasOptions.map((kelas) => (
                      <SelectItem key={kelas} value={kelas}>{kelas}</SelectItem>
                    ))}
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
                <Label htmlFor="tahun_ajaran">Tahun Ajaran</Label>
                <Input
                  id="tahun_ajaran"
                  {...register("tahun_ajaran", { required: "Tahun ajaran harus diisi" })}
                  placeholder="Contoh: 2023/2024"
                />
                {errors.tahun_ajaran && <p className="text-sm text-red-500">{String(errors.tahun_ajaran.message)}</p>}
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Batal
                </Button>
                <Button type="submit">
                  {editingGuruPengampu ? 'Simpan Perubahan' : 'Tambah Guru Pengampu'}
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
                Apakah Anda yakin ingin menghapus guru pengampu "{deletingGuruPengampu?.guru} - {deletingGuruPengampu?.mata_pelajaran}"? 
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

export default GuruPengampu;
