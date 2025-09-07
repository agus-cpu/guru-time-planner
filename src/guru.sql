-- Database: guru_time_planner

-- 1. Tabel guru
CREATE TABLE guru (
    id_guru INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    nip VARCHAR(50) UNIQUE,
    email VARCHAR(100) UNIQUE,
    no_hp VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabel mata_pelajaran
CREATE TABLE mata_pelajaran (
    id_mapel INT AUTO_INCREMENT PRIMARY KEY,
    nama_mapel VARCHAR(100) NOT NULL,
    kode_mapel VARCHAR(20) UNIQUE
);

-- 3. Tabel kelas
CREATE TABLE kelas (
    id_kelas INT AUTO_INCREMENT PRIMARY KEY,
    nama_kelas VARCHAR(50) NOT NULL,
    tingkat INT NOT NULL
);

-- 4. Tabel jadwal
CREATE TABLE jadwal (
    id_jadwal INT AUTO_INCREMENT PRIMARY KEY,
    id_guru INT NOT NULL,
    id_mapel INT NOT NULL,
    id_kelas INT NOT NULL,
    hari ENUM('Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'),
    jam_mulai TIME NOT NULL,
    jam_selesai TIME NOT NULL,
    FOREIGN KEY (id_guru) REFERENCES guru(id_guru) ON DELETE CASCADE,
    FOREIGN KEY (id_mapel) REFERENCES mata_pelajaran(id_mapel) ON DELETE CASCADE,
    FOREIGN KEY (id_kelas) REFERENCES kelas(id_kelas) ON DELETE CASCADE
);

-- 5. Tabel pengguna (opsional untuk login)
CREATE TABLE pengguna (
    id_pengguna INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin','guru') DEFAULT 'guru',
    id_guru INT,
    FOREIGN KEY (id_guru) REFERENCES guru(id_guru) ON DELETE SET NULL
);
