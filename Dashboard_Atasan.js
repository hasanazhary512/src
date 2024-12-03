import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Dashboard.css';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

function Dashboard({ onLogout }) {
    const chartRef = useRef(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); // Untuk mendeteksi halaman aktif

    useEffect(() => {
        const disabilitasCount = 10;
        const anakCount = 5;
        const lansiaCount = 7;
        const rentanCount = 3;
        const totalCount = 25;

        const ctx = document.getElementById('dataChart').getContext('2d');
        chartRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Disabilitas', 'Anak', 'Lansia', 'Rentan', 'Total'],
                datasets: [
                    {
                        label: 'Data Kategori',
                        data: [disabilitasCount, anakCount, lansiaCount, rentanCount, totalCount],
                        backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b'],
                        borderColor: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b'],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    y: { beginAtZero: true },
                },
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    tooltip: { enabled: true },
                },
            },
        });

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, []);

    const handleLogout = () => {
        onLogout(); // Memanggil fungsi logout yang diterima dari props
        navigate('/'); // Navigasi ke halaman login setelah logout
    };

    // Fungsi untuk memeriksa apakah link aktif
    const getLinkClass = (path) => (location.pathname === path ? 'link bold' : 'link');

    return (
        <div className="container">
            <div className="sidebar">
                <h2>Dashboard</h2>
                <ul>
                    <li>
                        <Link to="/dashboard" className={getLinkClass('/dashboard')}>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/tampil-data-atasan"
                            className={getLinkClass('/tampil-data-atasan')}
                        >
                            Tampil Data
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/tampil-modul-atasan"
                            className={getLinkClass('/tampil-modul-atasan')}
                        >
                            Tampil Modul
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="main-content">
                <div
                    className="navbar"
                    onMouseEnter={() => setDropdownVisible(true)}
                    onMouseLeave={() => setDropdownVisible(false)}
                >
                    <span style={{ cursor: 'pointer' }}>Atasan</span>
                    {dropdownVisible && (
                        <div className="dropdown-menu">
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
                <div className="content">
                    <div className="statistics">
                        <div className="box">
                            Disabilitas <h1>{10}</h1>
                        </div>
                        <div className="box">
                            Anak <h1>{5}</h1>
                        </div>
                        <div className="box">
                            Lansia <h1>{7}</h1>
                        </div>
                        <div className="box">
                            Rentan <h1>{3}</h1>
                        </div>
                        <div className="box">
                            Total <h1>{25}</h1>
                        </div>
                    </div>
                    <div className="chart">
                        <canvas id="dataChart" width="400" height="200"></canvas>
                    </div>
                </div>
            </div>
            <footer>
                &copy; 2024 | Sistem Pelatihan Vokasi Terpadu - Surakarta
            </footer>
        </div>
    );
}

export default Dashboard;
