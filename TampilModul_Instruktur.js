import React, { useState } from 'react';
import './TampilModul_Instruktur.css'; // Menggunakan CSS dari TampilModul_Instruktur.css
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import { Link } from 'react-router-dom';

function TampilModul_Instruktur({ onLogout }) {
    const [showEditForm, setShowEditForm] = useState(false);
    const [editData, setEditData] = useState({});
    const [dataModul, setDataModul] = useState([
        {
            namaProgram: 'Program A',
            judulUnitKode: 'Unit 1 - Kode 001',
            elemenKompetensi: 'Kompetensi A',
            kriteriaUnjukKerja: 'Kriteria A',
            teoriPraktek: 'Teori dan Praktek A'
        },
        {
            namaProgram: 'Program B',
            judulUnitKode: 'Unit 2 - Kode 002',
            elemenKompetensi: 'Kompetensi B',
            kriteriaUnjukKerja: 'Kriteria B',
            teoriPraktek: 'Teori dan Praktek B'
        }
    ]);

    const handleEdit = (index) => {
        setEditData(dataModul[index]);
        setShowEditForm(true);
    };

    const handleSaveEdit = () => {
        setShowEditForm(false);
        alert('Data berhasil diperbarui');
    };

    const handleDelete = (index) => {
        const newData = dataModul.filter((_, i) => i !== index);
        setDataModul(newData);
        alert('Data berhasil dihapus');
    };

    const exportToExcel = () => {
        const wb = XLSX.utils.book_new();
        XLSX.utils.sheet_add_aoa(wb, [
            ["Nama Program", "Judul Unit dan Kode", "Elemen Kompetensi", "Kriteria Unjuk Kerja", "Teori dan Praktek"],
            ...dataModul.map(row => [row.namaProgram, row.judulUnitKode, row.elemenKompetensi, row.kriteriaUnjukKerja, row.teoriPraktek])
        ]);
        XLSX.writeFile(wb, 'Data_Modul.xlsx');
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Data Modul", 20, 10);
        doc.autoTable({
            head: [['Nama Program', 'Judul Unit dan Kode', 'Elemen Kompetensi', 'Kriteria Unjuk Kerja', 'Teori dan Praktek']],
            body: dataModul.map(row => Object.values(row))
        });
        doc.save("Data_Modul.pdf");
    };

    return (
        <div className="container">
            <div className="sidebar">
                <h1>Tampil Modul</h1>
                <ul>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/input">Input Modul</Link></li>
                    <li><Link to="/tampil-data" className="bold">Tampil Modul</Link></li>
                </ul>
            </div>
            <div className="main-content">
                <div className="navbar">
                    <span>Instruktur</span>
                    <div className="dropdown-menu">
                        <button onClick={onLogout}>Logout</button>
                    </div>
                </div>
                <div className="content">
                    <h2>Data Modul</h2>
                    <div className="export-container">
                        <button className="export-button" onClick={exportToExcel}>Excel</button>
                        <button className="export-button" onClick={exportToPDF}>PDF</button>
                    </div>
                    <table id="dataTable">
                        <thead>
                            <tr>
                                <th>Nama Program</th>
                                <th>Judul Unit dan Kode</th>
                                <th>Elemen Kompetensi</th>
                                <th>Kriteria Unjuk Kerja</th>
                                <th>Teori dan Praktek</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataModul.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.namaProgram}</td>
                                    <td>{item.judulUnitKode}</td>
                                    <td>{item.elemenKompetensi}</td>
                                    <td>{item.kriteriaUnjukKerja}</td>
                                    <td>{item.teoriPraktek}</td>
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
                                <h3>Edit Data Modul</h3>
                                <input type="text" value={editData.namaProgram} placeholder="Nama Program" />
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

export default TampilModul_Instruktur;
