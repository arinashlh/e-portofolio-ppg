import React, { useState } from 'react';
import { BookOpen, User, Star, FileText, Award, ChevronRight, CheckCircle, Target, Image as ImageIcon, Sparkles, BookMarked, Lightbulb, Menu, X, Mail, Instagram, Home, ChevronLeft } from 'lucide-react';

const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-up { animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .stagger-1 { animation-delay: 150ms; }
  .stagger-2 { animation-delay: 300ms; }
  .hide-scrollbar::-webkit-scrollbar { display: none; }
  * { font-family: 'Plus Jakarta Sans', sans-serif; }
  
  /* Animasi Dropdown Mobile */
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-slide-down { animation: slideDown 0.3s ease-out forwards; }

  /* Scrollbar Custom untuk Daftar Lampiran */
  .custom-scrollbar::-webkit-scrollbar { width: 6px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 8px; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 8px; }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
`;

// ============================================================================
// HALAMAN ADMIN (DATA JSON) - SILAKAN EDIT DATA ANDA DI SINI
// ============================================================================
const DATA_PORTOFOLIO = {
  profil: {
    nama: "Raudhatul Jannah",
    bidangStudi: "PPG Informatika",
    asalDaerah: "Saya berasal dari daerah yang sedang berkembang pesat secara digital. Menariknya, walau teknologi mulai masuk ke berbagai aspek kehidupan di sini, masyarakatnya tetap menjaga kearifan lokal. Ini yang bikin saya sadar kalau teknologi itu harus diajarkan sesuai dengan konteks lingkungan siswanya.",
    inspirasi: "Jujur, awalnya saya cuma suka ngoding dan ngotak-ngatik komputer di kamar. Tapi sewaktu ada kesempatan ngajar dasar IT di sebuah sekolah binaan, ngeliat antusiasme anak-anak waktu program 'Hello World' mereka berhasil jalan itu rasanya luar biasa. Momen itu yang bikin saya mantap milih jalan jadi guru.",
    tujuan: "Lulus dari PPG ini, saya nggak cuma mau dapet gelar Gr. Saya mau jadi guru Informatika yang relevan—guru yang bisa bikin computational thinking itu asyik, gampang dipahami, dan nggak cuma sekadar ngafalin teori di buku cetak.",
    kutipan: '"Guru yang baik itu ibarat programmer yang sabar; mereka tahu gimana men-debug kebingungan siswanya baris demi baris sampai jadi sebuah pemahaman yang jalan tanpa error."',
    // Foto Kolase (Ganti dengan path fotomu)
    images: [
      "/assets/foto1.jpg", // Foto Kiri
      "/assets/foto2.jpg", // Foto Tengah
      "/assets/foto3.jpg"  // Foto Kanan
    ]
  },
  modelGuru: {
    misi: [
      "Menciptakan suasana kelas atau lab yang aman buat trial & error (nggak takut salah ketik kode).",
      "Ngenalin tools kekinian (kayak VS Code atau Git) sejak dini biar siswa siap sama dunia kerja asli.",
      "Jadi temen diskusi buat siswa yang pengen eksplor bikin project IT mereka sendiri."
    ],
    kompetensi: "Fokus utama saya sekarang adalah ningkatin TPACK, terutama gimana caranya nyari analogi di dunia nyata untuk ngejelasin konsep jaringan atau algoritma yang abstrak ke anak-anak biar gampang dicerna.",
    karakter: "Terbuka sama feedback, nggak anti dikritik siswa kalau ngajarnya ngebosenin, dan selalu mau belajar hal baru karena dunia IT itu cepet banget updatenya.",
    fotoKegiatan: "/assets/foto-kegiatan.jpg"
  },
  artefak: [
    {
      id: 1,
      siklus: "Siklus 1",
      judul: "Modul Ajar & Praktik Pemrograman Dasar",
      jenis: "RPP dan Praktik Mengajar",
      konteks: "Waktu itu ngajar di Lab Komputer buat materi dasar algoritma. Mayoritas anak kelas X ini bener-bener blank soal koding dan belum pernah ngetik sintaks sama sekali.",
      tujuan: "Mengenalkan logika berpikir algoritmik (sekuensial) pelan-pelan tanpa bikin mereka langsung takut lihat layar hitam.",
      kendala: "Waktu praktikum terasa kurang. Ketika satu siswa error kodenya, saya harus nyamperin satu-satu, jadi agak keteteran nge-handle satu lab sendirian.",
      teori: "Kondisi ini relate banget sama teorinya Vygotsky soal 'Scaffolding'. Di tahap awal ngenalin bahasa baru, pendampingan intens itu krusial banget sebelum mereka bisa dilepas mandiri.",
      keberhasilan: "Anak-anak lumayan excited karena langsung praktek. Pakai platform visual di awal ngebantu banget nurunin rasa tegang mereka.",
      perubahan: "Untuk kelas yang siswanya banyak, saya akan merancang sistem tutor sebaya (peer tutoring) agar pendampingan lebih optimal.",
      foto: "/assets/foto-siklus1.jpg",
      // LINK G-DRIVE UNTUK TOMBOL
      rppUrl: "https://drive.google.com/...", 
      videoUrl: "https://youtube.com/..."
    },
    {
      id: 2,
      siklus: "Siklus 2",
      judul: "Media Interaktif Jaringan Dasar",
      jenis: "Media Pembelajaran",
      konteks: "Materi topologi jaringan ini lumayan bikin ngantuk kalau cuma diceramahin. Jadi pembelajaran di set di ruang kelas biasa tapi pakai proyektor & simulasi interaktif.",
      tujuan: "Biar siswa bisa kebayang secara visual gimana sih data itu jalan-jalan dari satu komputer ke komputer lain di beda-beda topologi.",
      kendala: "Persiapannya lumayan rempong karena harus mastiin koneksi kelas stabil. Sempat ada nge-lag dikit pas buka web simulasinya.",
      teori: "Ini membuktikan Teori Dual Coding (Paivio). Waktu anak-anak dengerin penjelasan saya (verbal) sambil lihat animasi data gerak (visual), mereka lebih cepet nangkep idenya.",
      keberhasilan: "Dinamika kelas jauh lebih interaktif. Ada beberapa siswa proaktif maju untuk nyoba simulasinya langsung di depan temen-temennya.",
      perubahan: "Sebagai mitigasi jaringan, saya akan siapkan repositori luring (offline) dari simulasi tersebut atau media video yang sudah di-download.",
      foto: "/assets/foto-siklus2.jpg",
      // LINK G-DRIVE UNTUK TOMBOL
      rppUrl: "https://drive.google.com/...", 
      videoUrl: "https://youtube.com/..."
    }
  ],
  penilaian: {
    deskripsi: "Bagian ini mendokumentasikan kompilasi hasil evaluasi, instrumen penilaian, serta catatan refleksi kolaboratif bersama Guru Pamong (GP) dan Dosen Pembimbing Lapangan (DPL) selama PPL.",
    lampiran: [
      { nama: "Lampiran 1: Laporan Hasil Observasi Lengkap (Format Lampiran 6)", status: "Telah Direviu", url: "#" },
      { nama: "Lampiran 2: Isian LK 1 – Orientasi & Observasi Manajemen Sekolah", status: "Selesai", url: "#" },
      { nama: "Lampiran 3: Isian LK 2 – Observasi Lingkungan Belajar", status: "Selesai", url: "#" },
      { nama: "Lampiran 4: Isian LK 3 – Refleksi Pembelajaran Praktik Asistensi", status: "Selesai", url: "#" },
      { nama: "Lampiran 5: Isian LK 4 – Perangkat dan Pelaksanaan Pembelajaran", status: "Selesai", url: "#" },
      { nama: "Lampiran 6: Lembar Observasi Karakteristik Peserta Didik", status: "Telah Diparaf", url: "#" },
      { nama: "Lampiran 7: Lembar Observasi Rencana Pelaksanaan Pembelajaran (RPP)", status: "Telah Diparaf", url: "#" },
      { nama: "Lampiran 8: Lembar Observasi Pelaksanaan Pembelajaran (Observer & Supervisor)", status: "Telah Diparaf", url: "#" },
      { nama: "Lampiran 9: Lembar Observasi Manajemen Sekolah & Lingkungan", status: "Telah Diparaf", url: "#" },
      { nama: "Lampiran 10: Jurnal Harian Mahasiswa PPL 1 (Verifikasi Per 5 Hari)", status: "Terverifikasi", url: "#" },
      { nama: "Lampiran 11: Format Penilaian Perangkat Pembelajaran oleh DPL dan GP", status: "Dinilai", url: "#" },
      { nama: "Lampiran 12: Format Penilaian Pelaksanaan Pembelajaran oleh DPL dan GP", status: "Dinilai", url: "#" },
      { nama: "Lampiran 13: Format Penilaian Kompetensi Personal dan Sosial", status: "Dinilai", url: "#" },
      { nama: "Lampiran 14: Dokumentasi Foto Kegiatan (Proses Mengajar, Diskusi, dll)", status: "Terlampir", url: "#" },
      { nama: "Lampiran 15: Jurnal Refleksi Akhir / Rekapitulasi Akhir", status: "Selesai", url: "#" }
    ],
    catatanAkhir: "Mahasiswa menunjukkan progres yang konkrit dari siklus 1 hingga siklus akhir. Penguasaan materi berbanding lurus dengan kemampuan manajemen laboratorium yang semakin interaktif dan komunikatif. Pemilihan media pembelajaran juga dinilai sangat relevan dengan kebutuhan generasi digital saat ini."
  },
  refleksiAkhir: {
    pembelajaran: "Selama menjalani PPL Terbimbing, saya mensintesis bahwa mengajar melampaui batas transfer pengetahuan; ia adalah seni menjembatani konsep teoretis dengan relevansi dunia nyata siswa. Saya menyadari bahwa orkestrasi di lab komputer menuntut presisi pedagogik yang berbeda dari kelas reguler.",
    tantangan: "Tantangan paling signifikan adalah mengelola disparitas literasi digital siswa dalam satu rombongan belajar. Solusi taktis yang saya terapkan adalah 'Differentiated Instruction': merancang pengayaan bagi kelompok mahir, seraya memberikan 'scaffolding' berlapis bagi yang di tahap dasar.",
    umpanBalik: "DPL merekomendasikan peningkatan intensitas teknik bertanya Sokratik yang memicu nalar analitis. Sementara itu, GP menyoroti urgensi pembagian fase praktikum yang lebih definitif (Eksplorasi, Demonstrasi, Evaluasi) guna efisiensi alokasi waktu."
  },
  filosofi: [
    "Saya meyakini bahwa setiap peserta didik adalah pemikir komputasional yang sedang mencari konteksnya. Filosofi pengajaran saya berpijak pada paradigma bahwa Informatika bukanlah entitas teknis semata, melainkan sebuah instrumen berpikir logis untuk memecahkan problematika dunia nyata.",
    "Dalam kerangka praktis, saya mengadopsi model Problem-Based Learning yang terinspirasi dari gagasan 'learning by doing' John Dewey. Setiap nomenklatur saya elaborasi ke dalam simulasi kasus keseharian. Hal ini berkorelasi dengan prinsip Relevansi, di mana motivasi akan tumbuh ketika materi beresonansi dengan kehidupan siswa.",
    "Pada akhirnya, saya memegang teguh pedoman bahwa asesmen sejatinya bersifat membebaskan, bukan membelenggu. Galat (error) pada baris kode adalah permulaan dari sebuah diskusi intelektual, bukan vonis akhir dari kompetensi."
  ]
};

const ALL_TABS = [
  { id: 'beranda',  label: 'Beranda',            shortLabel: 'Beranda',    icon: <Home size={18}/> },
  { id: 'profil',   label: 'Profil Utama',       shortLabel: 'Profil',     icon: <User size={18}/> },
  { id: 'artefak',  label: 'Artefak PPL',        shortLabel: 'Artefak',    icon: <BookOpen size={18}/> },
  { id: 'penilaian',label: 'Hasil Penilaian',    shortLabel: 'Penilaian',  icon: <Star size={18}/> },
  { id: 'model',    label: 'Model Guru',         shortLabel: 'Model Guru', icon: <Target size={18}/> },
  { id: 'refleksi', label: 'Refleksi Akhir',     shortLabel: 'Refleksi',   icon: <BookMarked size={18}/> },
  { id: 'filosofi', label: 'Filosofi Mengajar',  shortLabel: 'Filosofi',   icon: <Lightbulb size={18}/> },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('beranda');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 

  const currentTabInfo = ALL_TABS.find(t => t.id === activeTab);

  const handleTabChange = (id) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false); 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  // Kalkulasi Tab Sebelumnya & Selanjutnya untuk Tombol Bawah
  const currentIndex = ALL_TABS.findIndex(t => t.id === activeTab);
  const prevTab = ALL_TABS[(currentIndex - 1 + ALL_TABS.length) % ALL_TABS.length];
  const nextTab = ALL_TABS[(currentIndex + 1) % ALL_TABS.length];

  const renderContent = () => {
    if (activeTab === 'beranda')   return <BerandaSection setActiveTab={handleTabChange} />;
    if (activeTab === 'profil')    return <ProfilSection />;
    if (activeTab === 'artefak')   return <ArtefakSection />;
    if (activeTab === 'penilaian') return <PenilaianSection />;
    if (activeTab === 'model')     return <ModelGuruSection />;
    if (activeTab === 'refleksi')  return <RefleksiSection />;
    if (activeTab === 'filosofi')  return <FilosofiSection />;
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-800 selection:bg-teal-100 selection:text-teal-900 relative">
      <style>{customStyles}</style>

      {/* Dekorasi Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-teal-200/40 rounded-full blur-3xl mix-blend-multiply"></div>
        <div className="absolute top-[20%] right-[-10%] w-[30rem] h-[30rem] bg-violet-200/30 rounded-full blur-3xl mix-blend-multiply"></div>
      </div>

      {/* NAVBAR */}
      <nav className="bg-white/90 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-teal-100/50">
        <div className="max-w-7xl mx-auto px-4 xl:px-6">
          <div className="flex justify-between items-center py-3.5">
            
            {/* Kiri: Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleTabChange('beranda')}>
              <div className="bg-gradient-to-br from-teal-500 to-emerald-400 p-2.5 rounded-xl shadow-md shadow-teal-200/50">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-800 to-emerald-600 tracking-tight leading-none">
                  Portofolio PPG
                </h1>
                <p className="text-xs font-medium text-slate-500 mt-0.5 hidden sm:block">
                  {DATA_PORTOFOLIO.profil.nama} • {DATA_PORTOFOLIO.profil.bidangStudi}
                </p>
              </div>
            </div>

            {/* Kanan (Desktop): Navigasi Tab sejajar */}
            <div className="hidden lg:flex gap-1 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
              {ALL_TABS.map(t => (
                <button 
                  key={t.id} 
                  onClick={() => handleTabChange(t.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all duration-300 whitespace-nowrap text-xs xl:text-sm font-semibold ${
                    activeTab === t.id
                      ? 'bg-white text-teal-700 shadow-sm border border-slate-200/60'
                      : 'text-slate-500 hover:bg-white/60 hover:text-teal-600'
                  }`}
                >
                  {t.icon}
                  <span>{t.label}</span>
                </button>
              ))}
            </div>

            {/* Tombol Hamburger (Mobile) */}
            <div className="lg:hidden flex items-center gap-3">
              <span className="text-sm font-bold text-teal-700 bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-100/50">
                {currentTabInfo.shortLabel}
              </span>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl bg-slate-50 text-slate-600 border border-slate-200 hover:bg-teal-50 hover:text-teal-600 transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Dropdown Menu Mobile */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-xl animate-slide-down">
            <div className="flex flex-col p-4 gap-2 max-w-md mx-auto">
              {ALL_TABS.map(t => (
                <button 
                  key={t.id} 
                  onClick={() => handleTabChange(t.id)}
                  className={`flex items-center gap-3 px-5 py-3.5 rounded-xl transition-all w-full text-left font-semibold ${
                    activeTab === t.id
                      ? 'bg-teal-50 text-teal-700 border border-teal-100/50 shadow-sm'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-teal-600'
                  }`}
                >
                  <div className={`${activeTab === t.id ? 'text-teal-500' : 'text-slate-400'}`}>
                    {t.icon}
                  </div>
                  <span className="text-base">{t.label}</span>
                  {activeTab === t.id && <CheckCircle className="w-4 h-4 ml-auto text-teal-500" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* KONTEN UTAMA */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12 min-h-[80vh]">
        {renderContent()}

        {/* TOMBOL NAVIGASI BAWAH (Sembunyi di Beranda) */}
        {activeTab !== 'beranda' && (
          <div className="mt-16 pt-8 border-t border-slate-200/60 flex flex-col-reverse sm:flex-row justify-between items-center gap-4 animate-fade-in-up">
            <button 
              onClick={() => handleTabChange(prevTab.id)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-teal-600 transition-all font-semibold text-sm shadow-sm active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
              Kembali ke {prevTab.shortLabel}
            </button>
            
            <button 
              onClick={() => handleTabChange(nextTab.id)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white hover:from-teal-600 hover:to-emerald-600 transition-all font-bold text-sm shadow-md shadow-teal-200/50 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
            >
              Lanjut: {nextTab.label}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-8 text-center mt-auto">
        <div className="max-w-6xl mx-auto px-4 flex flex-col items-center">
          <Sparkles className="w-6 h-6 text-teal-400 mb-3" />
          <p className="text-sm font-medium text-slate-500">© {new Date().getFullYear()} E-Portfolio PPG Terbimbing</p>
          <p className="text-xs text-slate-400 mt-1">{DATA_PORTOFOLIO.profil.nama} • {DATA_PORTOFOLIO.profil.bidangStudi}</p>
        </div>
      </footer>
    </div>
  );
}

// ─── Beranda / Landing Page ──────────────────────────────────────────────────
const BerandaSection = ({ setActiveTab }) => {
  const { profil } = DATA_PORTOFOLIO;
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 animate-fade-in-up">
      <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-md text-teal-700 rounded-full text-xs md:text-sm font-bold mb-6 border border-teal-100 shadow-sm">
        <span className="text-amber-500 mr-2 text-base">👋</span> SELAMAT DATANG DI RUANG BELAJAR SAYA
      </div>
      
      <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6 max-w-4xl">
        Merekam Jejak, <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-violet-600">Menjadi Pendidik Profesional</span>
      </h1>
      
      <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-3xl leading-relaxed">
        Halo! Halaman ini adalah jurnal kecil tempat saya, <strong className="text-slate-800">{profil.nama}</strong>, mendokumentasikan proses belajar selama mengikuti PPG <strong>{profil.bidangStudi}</strong>. Di sini, Bapak/Ibu dapat melihat hasil rancangan pembelajaran, pengalaman mengajar, serta refleksi evaluasi saya.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <button 
          onClick={() => setActiveTab('profil')} 
          className="px-8 py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-teal-200/50 hover:-translate-y-1 transition-all flex items-center justify-center w-full sm:w-auto"
        >
          Mengenal Lebih Dekat <ChevronRight className="w-5 h-5 ml-2" />
        </button>
        <button 
          onClick={() => setActiveTab('artefak')} 
          className="px-8 py-3.5 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold shadow-sm hover:bg-slate-50 hover:-translate-y-1 transition-all flex items-center justify-center w-full sm:w-auto"
        >
          <BookOpen className="w-5 h-5 mr-2 text-slate-400" /> Lihat Karya PPL
        </button>
      </div>
    </div>
  );
};

// ─── Profil Kolase (Responsive dengan Persentase) ────────────────────────────
const ProfilSection = () => {
  const { profil } = DATA_PORTOFOLIO;
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="grid md:grid-cols-[1.5fr,1fr] gap-8 md:gap-12 p-6 md:p-10 rounded-3xl mb-12 bg-white/85 backdrop-blur-md shadow-xl border border-teal-100">
        
        {/* KOLASE KIRI (Menggunakan persentase lebar agar tidak pecah di HP) */}
        <div className="relative w-full h-80 md:h-[450px] flex items-center justify-center">
          <div className="absolute top-10 left-5 w-24 h-12 bg-red-400 rounded-full opacity-40 z-0 rotate-12 blur-md"></div>
          <div className="absolute top-10 right-2 w-24 h-12 bg-yellow-400 rounded-full opacity-40 z-0 -rotate-12 blur-md"></div>

          {/* Foto Kiri */}
          <img src={profil.images[0]} alt="Pose Kiri" className="absolute top-[20%] left-[5%] w-[40%] h-auto object-cover border-4 border-white shadow-2xl rotate-[-6deg] z-10 transition-transform duration-500 hover:rotate-0 hover:z-40 hover:scale-105" />
          {/* Foto Tengah */}
          <img src={profil.images[1]} alt="Pose Tengah" className="absolute top-[5%] left-[30%] w-[45%] h-auto object-cover border-4 border-white shadow-2xl z-20 transition-transform duration-500 hover:-translate-y-4 hover:z-40 hover:scale-105" />
          {/* Foto Kanan */}
          <img src={profil.images[2]} alt="Pose Kanan" className="absolute top-[30%] right-[5%] w-[38%] h-auto object-cover border-4 border-white shadow-2xl rotate-[6deg] z-30 transition-transform duration-500 hover:rotate-0 hover:z-40 hover:scale-105" />
        </div>

        {/* TEKS KANAN */}
        <div className="space-y-6 flex flex-col justify-center">
          <div>
            <span className="text-sm text-teal-600 font-bold tracking-wider">PROFIL MAHASISWA</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2 leading-tight">{profil.nama}</h1>
            <p className="text-xl text-teal-700 mt-2 font-semibold">{profil.bidangStudi}</p>
          </div>
          <div className="flex gap-x-3 mt-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl border border-purple-100"><Target className="w-6 h-6" /></div>
            <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl border border-teal-100"><Sparkles className="w-6 h-6" /></div>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 rounded-3xl bg-white shadow-lg border border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center">
              <Sparkles className="w-6 h-6 mr-2 text-violet-500" /> Cerita & Inspirasi
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base text-justify">{profil.asalDaerah}</p>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base text-justify">{profil.inspirasi}</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center">
              <Target className="w-6 h-6 mr-2 text-teal-500" /> Tujuan Personal
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base text-justify">{profil.tujuan}</p>
            <div className="mt-4 p-5 bg-gradient-to-br from-slate-50 to-teal-50/40 border-l-4 border-teal-500 rounded-r-xl">
              <p className="italic text-slate-700 font-medium text-sm md:text-base">"{profil.kutipan}"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Artefak ─────────────────────────────────────────────────────────────────
const ArtefakSection = () => {
  const { artefak } = DATA_PORTOFOLIO;
  return (
    <div className="space-y-12">
      <div className="text-center max-w-3xl mx-auto mb-10 animate-fade-in-up px-4">
        <div className="inline-flex items-center justify-center p-3 bg-teal-100 rounded-2xl mb-5 text-teal-600 shadow-inner">
          <BookOpen className="w-8 h-8" />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Kumpulan Artefak PPL</h2>
        <p className="text-base md:text-lg text-slate-600 leading-relaxed">Analisis mendalam produk pembelajaran—mengulik kendala, teori pedagogi pendukung, hingga proyeksi perbaikan.</p>
      </div>
      {artefak.map((item, index) => (
        <div key={item.id} className={`bg-white rounded-[2rem] shadow-lg border border-slate-100 overflow-hidden flex flex-col lg:flex-row animate-fade-in-up stagger-${(index%2)+1} group hover:shadow-xl transition-all duration-500`}>
          <div className="lg:w-5/12 relative overflow-hidden h-64 lg:h-auto">
            <img src={item.foto} alt={item.judul} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
            <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold text-violet-700 shadow-lg flex items-center">
              <Star className="w-4 h-4 mr-2 text-amber-500" />{item.siklus}
            </div>
            <div className="absolute bottom-5 left-5">
              <div className="px-3 py-1 bg-teal-600/90 backdrop-blur-md rounded-md text-xs font-bold text-white uppercase tracking-widest">{item.jenis}</div>
            </div>
          </div>
          <div className="lg:w-7/12 p-6 md:p-9 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors">{item.judul}</h3>
            <div className="bg-slate-50 p-4 rounded-xl mb-5 text-sm text-slate-600 leading-relaxed border border-slate-100">
              <p><strong className="text-slate-800">Konteks Observasi:</strong> {item.konteks}</p>
              <p className="mt-2"><strong className="text-slate-800">Tujuan Pedagogik:</strong> {item.tujuan}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-red-50/70 rounded-2xl p-4 border border-red-100">
                <h4 className="text-xs font-bold text-red-800 mb-2 flex items-center gap-1.5"><span className="w-4 h-4 bg-red-200 rounded-full flex items-center justify-center text-red-700 text-[10px] font-black">!</span> Temuan Kendala</h4>
                <p className="text-xs text-red-700 leading-relaxed text-justify">{item.kendala}</p>
              </div>
              <div className="bg-violet-50/70 rounded-2xl p-4 border border-violet-100">
                <h4 className="text-xs font-bold text-violet-800 mb-2 flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-violet-600" /> Kajian Teori</h4>
                <p className="text-xs text-violet-700 leading-relaxed text-justify">{item.teori}</p>
              </div>
              <div className="bg-emerald-50/70 rounded-2xl p-4 border border-emerald-100">
                <h4 className="text-xs font-bold text-emerald-800 mb-2 flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Analisis Keberhasilan</h4>
                <p className="text-xs text-emerald-700 leading-relaxed text-justify">{item.keberhasilan}</p>
              </div>
              <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-100">
                <h4 className="text-xs font-bold text-amber-800 mb-2 flex items-center gap-1.5"><Target className="w-3.5 h-3.5 text-amber-600" /> Proyeksi Adaptasi</h4>
                <p className="text-xs text-amber-700 leading-relaxed text-justify">{item.perubahan}</p>
              </div>
            </div>
            
            {/* Tombol Diubah menjadi Link (Arahkan ke GDrive) */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={item.rppUrl} target="_blank" rel="noopener noreferrer" className="text-sm bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md shadow-teal-200 hover:-translate-y-0.5 transition-all flex items-center w-full sm:w-auto justify-center">
                <FileText className="w-4 h-4 mr-2" /> Buka Dokumen RPP
              </a>
              <a href={item.videoUrl} target="_blank" rel="noopener noreferrer" className="text-sm bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-semibold shadow-sm hover:-translate-y-0.5 transition-all flex items-center w-full sm:w-auto justify-center">
                <ImageIcon className="w-4 h-4 mr-2 text-slate-400" /> Bukti Video Mengajar
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── Penilaian (Dengan 15 Lampiran Scrollable) ────────────────────────────────
const PenilaianSection = () => {
  const { penilaian } = DATA_PORTOFOLIO;
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up px-2">
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-teal-100/20 border border-slate-100 p-6 sm:p-10 md:p-14 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-100/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row gap-10">
          {/* Kolom Kiri: Judul */}
          <div className="lg:w-1/3">
            <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-teal-50 to-emerald-50 text-teal-600 rounded-2xl mb-5 border border-teal-100">
              <Award className="w-10 h-10" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Kompilasi Penilaian</h2>
            <p className="text-sm md:text-base text-slate-600 mb-8 leading-relaxed text-justify">{penilaian.deskripsi}</p>
            
            <div className="p-6 bg-gradient-to-br from-teal-50 to-violet-50/40 rounded-2xl border border-teal-100/80 shadow-inner hidden lg:block">
              <div className="bg-gradient-to-r from-teal-500 to-violet-500 text-white px-3 py-1 rounded-md text-[10px] font-bold shadow-md inline-block mb-3">
                CATATAN EVALUASI (DPL & GP)
              </div>
              <p className="text-sm text-teal-900/80 leading-relaxed italic font-medium text-justify">"{penilaian.catatanAkhir}"</p>
            </div>
          </div>

          {/* Kolom Kanan: 15 Lampiran Scrollable */}
          <div className="lg:w-2/3">
            <div className="bg-slate-50/50 border border-slate-100 rounded-3xl p-2 pb-0">
              <div className="px-4 py-3 flex items-center justify-between border-b border-slate-200/60 mb-2">
                <span className="font-bold text-slate-700">Daftar Kelengkapan Dokumen ({penilaian.lampiran.length})</span>
                <span className="text-xs font-medium text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-200">Scroll untuk melihat ▾</span>
              </div>
              
              {/* CONTAINER SCROLLABLE 450px */}
              <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-2 pb-4 custom-scrollbar">
                {penilaian.lampiran.map((lamp, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-white rounded-2xl border border-slate-200 hover:border-violet-300 shadow-sm hover:shadow transition-all duration-200 group">
                    <div className="flex items-center mb-3 sm:mb-0">
                      <div className="p-2.5 bg-violet-50 rounded-xl mr-3 group-hover:bg-violet-100 transition-all shrink-0">
                        <FileText className="w-4 h-4 text-violet-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-700 text-sm group-hover:text-violet-700 transition-colors leading-tight pr-2">{lamp.nama}</h4>
                        <p className="text-[11px] font-semibold text-emerald-600 mt-1 flex items-center">
                          <CheckCircle className="w-3 h-3 mr-1 shrink-0" />{lamp.status}
                        </p>
                      </div>
                    </div>
                    {/* Tombol Diubah Menjadi Link (Arahkan ke Google Drive Lampiran) */}
                    <a href={lamp.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-600 hover:text-white py-2 px-4 rounded-xl transition-colors duration-300 shrink-0">
                      Buka <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Teks Evaluasi (Khusus muncul di bawah saat mobile) */}
            <div className="p-6 mt-6 bg-gradient-to-br from-teal-50 to-violet-50/40 rounded-2xl border border-teal-100/80 shadow-inner lg:hidden">
              <div className="bg-gradient-to-r from-teal-500 to-violet-500 text-white px-3 py-1 rounded-md text-[10px] font-bold shadow-md inline-block mb-3">
                CATATAN EVALUASI (DPL & GP)
              </div>
              <p className="text-sm text-teal-900/80 leading-relaxed italic font-medium text-justify">"{penilaian.catatanAkhir}"</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// ─── Model Guru ───────────────────────────────────────────────────────────────
const ModelGuruSection = () => {
  const { modelGuru } = DATA_PORTOFOLIO;
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="text-center max-w-3xl mx-auto mb-10 px-4">
        <div className="inline-flex items-center justify-center p-3 bg-violet-100 rounded-2xl mb-5 text-violet-600 shadow-inner">
          <Target className="w-8 h-8" />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Model Guru yang Dituju</h2>
        <p className="text-base md:text-lg text-slate-600 leading-relaxed">Misi operasional, sasaran kompetensi, dan cetak biru karakter yang dibangun sebagai pilar pendidik abad 21.</p>
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-[2rem] shadow-lg border border-slate-100 p-6 md:p-8 hover:shadow-xl transition-shadow duration-500">
          <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-6 flex items-center">
            <div className="p-2 bg-teal-100 rounded-xl mr-3 text-teal-600"><Target className="w-5 h-5" /></div>
            Misi & Rencana Taktis
          </h3>
          <ul className="space-y-3 mb-6">
            {modelGuru.misi.map((item, idx) => (
              <li key={idx} className="flex items-start bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-teal-200 transition-colors group">
                <CheckCircle className="w-5 h-5 text-teal-500 mr-3 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="text-slate-700 text-sm leading-relaxed text-justify">{item}</span>
              </li>
            ))}
          </ul>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-5 rounded-2xl border border-teal-100/50 shadow-sm">
              <h4 className="font-bold text-teal-900 mb-2 text-sm flex items-center">
                <BookOpen className="w-4 h-4 mr-1.5 text-teal-600" /> Target Kompetensi
              </h4>
              <p className="text-slate-700 text-xs leading-relaxed text-justify">{modelGuru.kompetensi}</p>
            </div>
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-5 rounded-2xl border border-violet-100/50 shadow-sm">
              <h4 className="font-bold text-violet-900 mb-2 text-sm flex items-center">
                <User className="w-4 h-4 mr-1.5 text-violet-600" /> Profil Karakter
              </h4>
              <p className="text-slate-700 text-xs leading-relaxed text-justify">{modelGuru.karakter}</p>
            </div>
          </div>
        </div>
        <div className="rounded-[2rem] overflow-hidden shadow-lg border border-slate-100 group relative h-64 lg:h-auto min-h-[380px]">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent z-10"></div>
          <img src={modelGuru.fotoKegiatan} alt="Kegiatan Lapangan" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
          <div className="absolute bottom-0 left-0 p-5 md:p-7 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <div className="inline-flex items-center px-3 py-1.5 bg-white/20 backdrop-blur-md text-white rounded-full text-[10px] md:text-xs font-semibold mb-2 md:mb-3 border border-white/30">
              <ImageIcon className="w-3 h-3 mr-2" /> REKAMAN DOKUMENTASI
            </div>
            <h4 className="text-xl md:text-2xl font-bold text-white mb-1 drop-shadow-md">Keterlibatan di Ekosistem Sekolah</h4>
            <p className="text-teal-100 text-xs md:text-sm font-medium drop-shadow-md">Membangun sinergi melalui komunikasi antar-elemen pendidikan.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Refleksi Akhir ───────────────────────────────────────────────────────────
const RefleksiSection = () => {
  const { refleksiAkhir } = DATA_PORTOFOLIO;
  const items = [
    { label: "Sintesis Pengalaman Mengajar PPL", icon: "📖", bg: "bg-teal-50/60", border: "border-teal-100", titleColor: "text-teal-900", textColor: "text-teal-800", accentBorder: "border-l-teal-400", content: refleksiAkhir.pembelajaran },
    { label: "Manajemen Krisis & Solusi Taktis", icon: "⚡", bg: "bg-amber-50/60", border: "border-amber-100", titleColor: "text-amber-900", textColor: "text-amber-800", accentBorder: "border-l-amber-400", content: refleksiAkhir.tantangan },
    { label: "Evaluasi Konstruktif (DPL & Pamong)", icon: "💬", bg: "bg-violet-50/60", border: "border-violet-100", titleColor: "text-violet-900", textColor: "text-violet-800", accentBorder: "border-l-violet-400", content: refleksiAkhir.umpanBalik },
  ];
  return (
    <div className="space-y-10 animate-fade-in-up">
      <div className="text-center max-w-3xl mx-auto mb-10 px-4">
        <div className="inline-flex items-center justify-center p-3 bg-violet-100 rounded-2xl mb-5 text-violet-600 shadow-inner">
          <BookMarked className="w-8 h-8" />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Refleksi Kritis PPL</h2>
        <p className="text-base md:text-lg text-slate-600 leading-relaxed">Pemeriksaan mendalam atas trajektori pembelajaran—mengurai tantangan empiris menjadi rencana aksi yang terukur.</p>
      </div>
      <div className="space-y-5 max-w-4xl mx-auto px-2 md:px-0">
        {items.map((item, i) => (
          <div key={i} className={`bg-white rounded-[2rem] shadow-lg border border-slate-100 overflow-hidden flex hover:shadow-xl transition-all duration-500 group border-l-4 ${item.accentBorder}`}>
            <div className="p-6 md:p-9 flex-1">
              <div className={`inline-flex items-center gap-2 px-3 py-1 ${item.bg} ${item.border} border rounded-full text-[10px] md:text-xs font-bold mb-4 ${item.titleColor}`}>
                <span>{item.icon}</span> Aspek Analisis {i + 1}
              </div>
              <h3 className={`text-lg md:text-xl font-extrabold mb-3 ${item.titleColor}`}>{item.label}</h3>
              <p className={`text-sm md:text-base leading-relaxed text-justify ${item.textColor}`}>{item.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-teal-600 to-violet-600 rounded-[2rem] p-6 md:p-10 shadow-xl shadow-teal-200/50 mx-2 md:mx-0">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-white/20 rounded-xl shrink-0"><Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" /></div>
          <h3 className="text-lg md:text-xl font-extrabold text-white">Proyeksi PPL Mandiri</h3>
        </div>
        <p className="text-teal-50 text-sm md:text-base leading-relaxed font-medium text-justify">
          Berbekal evaluasi komprehensif dari fase terbimbing ini, saya berkomitmen melakukan kalibrasi pada tahap PPL Mandiri—khususnya pada presisi manajemen waktu praktikum, penerapan dialektika Sokratik dalam interaksi kelas, serta instrumentasi asesmen formatif yang lebih sistematis dan terstruktur.
        </p>
      </div>
    </div>
  );
};

// ─── Filosofi (Dengan perbaikan Style Responsive Text Tailwind) ───────────────
const FilosofiSection = () => {
  const { filosofi } = DATA_PORTOFOLIO;
  const labels = ["Konstruktivis & Empiris", "Problem-Based & Kontekstual", "Asesmen sebagai Dialog Edukatif"];
  return (
    <div className="space-y-10 animate-fade-in-up">
      <div className="text-center max-w-3xl mx-auto mb-10 px-4">
        <div className="inline-flex items-center justify-center p-3 bg-amber-100 rounded-2xl mb-5 text-amber-600 shadow-inner">
          <Lightbulb className="w-8 h-8" />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Filosofi Mengajar</h2>
        <p className="text-base md:text-lg text-slate-600 leading-relaxed">Fondasi teoretis dan keyakinan etis yang menjadi kompas navigasi dalam merancang setiap interaksi edukatif di ruang kelas.</p>
      </div>
      <div className="max-w-4xl mx-auto space-y-6 px-2 md:px-0">
        {filosofi.map((para, i) => (
          <div key={i} className="bg-white rounded-[2rem] shadow-lg border border-slate-100 overflow-hidden group hover:shadow-xl hover:shadow-violet-100/40 transition-all duration-500 flex flex-col sm:flex-row">
            
            {/* Bagian Angka - Menggunakan Tailwind CSS untuk responsif teks vertikal */}
            <div className="h-12 sm:h-auto sm:w-16 bg-gradient-to-r sm:bg-gradient-to-b from-violet-500 to-teal-500 flex items-center justify-center flex-shrink-0 sm:py-8">
              <span className="text-white font-extrabold text-xl sm:rotate-180 [writing-mode:horizontal-tb] sm:[writing-mode:vertical-rl] tracking-[0.1em]">
                {`0${i+1}`}
              </span>
            </div>
            
            <div className="p-6 md:p-9 flex-1 relative">
              <div className="inline-flex items-center px-3 py-1 bg-violet-50 text-violet-700 rounded-full text-[10px] md:text-xs font-bold mb-4 border border-violet-100">
                <Sparkles className="w-3 h-3 mr-1.5 shrink-0" />{labels[i]}
              </div>
              <div className="text-4xl md:text-5xl text-teal-100 font-serif leading-none mb-1 select-none absolute top-4 right-6 md:static">"</div>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed text-justify">{para}</p>
            </div>
          </div>
        ))}
        <div className="bg-gradient-to-br from-slate-50 to-teal-50 rounded-[2rem] border border-teal-100 p-6 md:p-8 text-center shadow-sm mx-2 md:mx-0">
          <div className="text-3xl md:text-4xl mb-3">🌱</div>
          <h3 className="text-lg md:text-xl font-extrabold text-slate-900 mb-2">Sebuah Paradigma yang Dinamis</h3>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-xl mx-auto text-justify sm:text-center">
            Filosofi ini bukanlah sebuah dogma statis, melainkan organisme pemikiran yang akan terus bermutasi—diperkaya oleh jam terbang lapangan, refleksi kritis berkelanjutan, dan diskursus aktif bersama ekosistem pendidikan.
          </p>
        </div>
      </div>
    </div>
  );
};