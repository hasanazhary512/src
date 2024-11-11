import React, { useState } from 'react';
import './TampilData.css';
import * as XLSX from 'xlsx';  // Perbaiki impor menjadi seperti ini
import { jsPDF } from 'jspdf';
import { Link } from 'react-router-dom'; // Menggunakan Link dari react-router-dom untuk navigasi

function TampilData({ onLogout }) {  // Menambahkan onLogout sebagai prop
    const [showEditForm, setShowEditForm] = useState(false);
    const [editData, setEditData] = useState({});
    const [dataPeserta, setDataPeserta] = useState([
        {
            nomor: '001',
            nama: 'John Doe',
            alamat: 'Jl. Contoh No.1',
            jenisKelamin: 'Laki-laki',
            kategori: 'Anak',
            vokasional: 'Teknologi Informasi',
            tanggalMasuk: '2024-01-01',
            tanggalSelesai: '2024-12-31'
        },
        {
            nomor: '002',
            nama: 'Jane Smith',
            alamat: 'Jl. Contoh No.2',
            jenisKelamin: 'Perempuan',
            kategori: 'Disabilitas',
            vokasional: 'Kerajinan Tangan',
            tanggalMasuk: '2024-02-01',
            tanggalSelesai: '2024-11-30'
        }
    ]);

    const handleEdit = (index) => {
        setEditData(dataPeserta[index]);
        setShowEditForm(true);
    };

    const handleSaveEdit = () => {
        setShowEditForm(false);
        alert('Data berhasil diperbarui');
    };

    const handleDelete = (index) => {
        const newData = dataPeserta.filter((_, i) => i !== index);
        setDataPeserta(newData);
        alert('Data berhasil dihapus');
    };

    const exportToExcel = () => {
        const wb = XLSX.utils.book_new();
        XLSX.utils.sheet_add_aoa(wb, [
            ["Nomor Register", "Nama Lengkap", "Alamat", "Jenis Kelamin", "Kategori", "Vokasional", "Tanggal Masuk", "Tanggal Selesai"],
            ...dataPeserta.map(row => [row.nomor, row.nama, row.alamat, row.jenisKelamin, row.kategori, row.vokasional, row.tanggalMasuk, row.tanggalSelesai])
        ]);
        XLSX.writeFile(wb, 'Data_Peserta_Vokasi.xlsx');
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Data Peserta Vokasi", 20, 10);
        doc.autoTable({
            head: [['Nomor', 'Nama', 'Alamat', 'Jenis Kelamin', 'Kategori', 'Vokasional', 'Tanggal Masuk', 'Tanggal Selesai']],
            body: dataPeserta.map(row => Object.values(row))
        });
        doc.save("Data_Peserta_Vokasi.pdf");
    };

    return (
        <div className="container">
            <div className="sidebar">
                <h1>Tampil Data</h1>
                <ul>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/input-data">Input Data</Link></li>
                    <li><Link to="/tampil-data" className="bold">Tampil Data</Link></li>
                </ul>
            </div>
            <div className="main-content">
                <div className="navbar">
                    <span>Admin</span>
                    <div className="dropdown-menu">
                        {/* Tombol Logout yang memanggil fungsi onLogout */}
                        <button onClick={onLogout}>Logout</button>
                    </div>
                </div>
                <div className="content">
                    <h2>Data Peserta Vokasi</h2>
                    <div className="export-container">
                        <button className="export-button" onClick={exportToExcel}>Excel</button>
                        <button className="export-button" onClick={exportToPDF}>PDF</button>
                    </div>
                    <table id="dataTable">
                        <thead>
                            <tr>
                                <th>Nomor Register</th>
                                <th>Nama Lengkap</th>
                                <th>Alamat</th>
                                <th>Jenis Kelamin</th>
                                <th>Kategori</th>
                                <th>Vokasional</th>
                                <th>Tanggal Masuk</th>
                                <th>Tanggal Selesai</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataPeserta.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.nomor}</td>
                                    <td>{item.nama}</td>
                                    <td>{item.alamat}</td>
                                    <td>{item.jenisKelamin}</td>
                                    <td>{item.kategori}</td>
                                    <td>{item.vokasional}</td>
                                    <td>{item.tanggalMasuk}</td>
                                    <td>{item.tanggalSelesai}</td>
                                    <td className="action-buttons">
                                        <button className="edit-button" onClick={() => handleEdit(index)}>Edit</button>
                                        <button className="delete-button" onClick={() => handleDelete(index)}>Hapus</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {showEditForm && (
                        <div className="overlay">
                            <div className="edit-form">
                                <h3>Edit Data Peserta</h3>
                                <input type="text" value={editData.nama} placeholder="Nama Lengkap" />
                                <button onClick={handleSaveEdit}>Simpan</button>
                                <button onClick={() => setShowEditForm(false)}>Batal</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TampilData;
