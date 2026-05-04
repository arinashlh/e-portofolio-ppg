import React, { useState } from 'react';
import { BookOpen, User, Star, FileText, Award, ChevronRight, CheckCircle, Target, Image as ImageIcon, Sparkles } from 'lucide-react';

const customStyles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-up {
    animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .stagger-1 { animation-delay: 150ms; }
  .stagger-2 { animation-delay: 300ms; }
  .glass-card {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(12px);
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
`;

// ============================================================================
// HALAMAN ADMIN (DATA JSON) - SILAKAN EDIT DATA ANDA DI SINI
// ============================================================================
const DATA_PORTOFOLIO = {
  profil: {
    nama: "Nama Anda Disini", // Ganti dengan nama Anda
    bidangStudi: "PPG Informatika",
    asalDaerah: "Saya berasal dari daerah yang sedang berkembang pesat secara digital. Menariknya, walau teknologi mulai masuk ke berbagai aspek kehidupan di sini, masyarakatnya tetap menjaga kearifan lokal. Ini yang bikin saya sadar kalau teknologi itu harus diajarkan sesuai dengan konteks lingkungan siswanya.",
    inspirasi: "Jujur, awalnya saya cuma suka ngoding dan ngotak-ngatik komputer di kamar. Tapi sewaktu ada kesempatan ngajar dasar IT di sebuah sekolah binaan, ngeliat antusiasme anak-anak waktu program 'Hello World' mereka berhasil jalan itu rasanya luar biasa. Momen itu yang bikin saya mantap milih jalan jadi guru.",
    tujuan: "Lulus dari PPG ini, saya nggak cuma mau dapet gelar Gr. Saya mau jadi guru Informatika yang relevan—guru yang bisa bikin computational thinking itu asyik, gampang dipahami, dan nggak cuma sekadar ngafalin teori di buku cetak.",
    kutipan: '"Guru yang baik itu ibarat programmer yang sabar; mereka tahu gimana men-debug kebingungan siswanya baris demi baris sampai jadi sebuah pemahaman yang jalan tanpa error."',
    fotoProfil: "wmremove-transformed__1_-removebg-preview.png" // Foto profil berhijab tanpa background
  },
  modelGuru: {
    misi: [
      "Menciptakan suasana kelas atau lab yang aman buat trial & error (nggak takut salah ketik kode).",
      "Ngenalin tools kekinian (kayak VS Code atau Git) sejak dini biar siswa siap sama dunia kerja asli.",
      "Jadi temen diskusi buat siswa yang pengen eksplor bikin project IT mereka sendiri."
    ],
    kompetensi: "Fokus utama saya sekarang adalah ningkatin TPACK, terutama gimana caranya nyari analogi di dunia nyata untuk ngejelasin konsep jaringan atau algoritma yang abstrak ke anak-anak biar gampang dicerna.",
    karakter: "Terbuka sama feedback, nggak anti dikritik siswa kalau ngajarnya ngebosenin, dan selalu mau belajar hal baru karena dunia IT itu cepet banget updatenya.",
    fotoKegiatan: "WhatsApp Image 2026-04-23 at 17.55.54.jpeg" // Foto upacara/lapangan
  },
  artefak: [
    {
      id: 1,
      siklus: "Siklus 1",
      judul: "Modul Ajar & Praktik Pemrograman Dasar",
      jenis: "RPP dan Praktik Mengajar",
      konteks: "Waktu itu ngajar di Lab Komputer buat materi dasar algoritma. Mayoritas anak kelas X ini bener-bener blank soal koding dan belum pernah ngetik sintaks sama sekali.",
      tujuan: "Mengenalkan logika berpikir algoritmik (sekuensial) pelan-pelan tanpa bikin mereka langsung takut lihat layar hitam.",
      kelebihan: "Anak-anak lumayan excited karena langsung praktek. Pakai platform visual di awal ngebantu banget nurunin rasa tegang mereka.",
      kekurangan: "Waktu praktikumnya berasa kurang banget. Pas satu anak error kodenya, saya harus nyamperin satu-satu, jadi agak keteteran nge-handle satu lab sendirian.",
      kajianTeori: "Kondisi ini relate banget sama teorinya Vygotsky soal 'Scaffolding'. Di tahap awal ngenalin bahasa baru, pendampingan intens itu krusial banget sebelum mereka bisa dilepas mandiri.",
      foto: "WhatsApp Image 2026-04-23 at 17.56.30.jpeg" // Foto mengajar di Lab Komputer
    },
    {
      id: 2,
      siklus: "Siklus 2",
      judul: "Media Interaktif Jaringan Dasar",
      jenis: "Media Pembelajaran",
      konteks: "Materi topologi jaringan ini lumayan bikin ngantuk kalau cuma diceramahin. Jadi pembelajarannya di set di ruang kelas biasa tapi pakai proyektor & media simulasi interaktif.",
      tujuan: "Biar siswa bisa kebayang secara visual gimana sih data itu jalan-jalan dari satu komputer ke komputer lain di beda-beda topologi.",
      kelebihan: "Jauh lebih hidup kelasnya dibanding siklus 1. Ada beberapa siswa yang berani maju nyoba simulasinya langsung di depan temen-temennya.",
      kekurangan: "Persiapannya lumayan rempong karena harus mastiin koneksi kelas stabil. Sempat ada nge-lag dikit pas buka web simulasinya.",
      kajianTeori: "Ini membuktikan Teori Dual Coding (Paivio). Waktu anak-anak dengerin penjelasan saya (verbal) sambil lihat animasi data gerak (visual), mereka lebih cepet nangkep idenya.",
      foto: "WhatsApp Image 2026-04-21 at 09.09.26 (1).jpeg" // Foto mengajar di ruang kelas
    }
  ],
  penilaian: {
    deskripsi: "Di bagian ini ada rangkuman nilai dan obrolan reflektif bareng Guru Pamong (GP) dan Dosen Pembimbing Lapangan (DPL) setelah ngelewatin drama PPL 3 Siklus.",
    lampiran: [
      { nama: "Lampiran 7: Instrumen Penilaian Perangkat", status: "Done (Diulas GP & DPL)" },
      { nama: "Lampiran 8: Instrumen Penilaian Praktik Mengajar", status: "Done (Siklus 1, 2, 3)" }
    ]
  }
};
// ============================================================================
// AKHIR HALAMAN ADMIN
// ============================================================================

export default function App() {
  const [activeTab, setActiveTab] = useState('profil');

  const renderContent = () => {
    switch (activeTab) {
      case 'profil':
        return <ProfilSection />;
      case 'artefak':
        return <ArtefakSection />;
      case 'penilaian':
        return <PenilaianSection />;
      default:
        return <ProfilSection />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-slate-800 selection:bg-teal-100 selection:text-teal-900 relative">
      <style>{customStyles}</style>
      
      {/* Background Blobs (Dekorasi Abstrak - Nuansa Tosca & Ungu) */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-teal-200/40 rounded-full blur-3xl mix-blend-multiply"></div>
        <div className="absolute top-[20%] right-[-10%] w-[30rem] h-[30rem] bg-violet-200/30 rounded-full blur-3xl mix-blend-multiply"></div>
      </div>

      {/* Header / Navbar Glassmorphism */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-teal-100/50 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => setActiveTab('profil')}>
              <div className="bg-gradient-to-br from-teal-500 to-emerald-400 p-2 rounded-xl shadow-md shadow-teal-200/50 group-hover:scale-105 transition-transform duration-300">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-800 to-emerald-600 tracking-tight">Portofolio PPG</h1>
                <p className="text-xs font-medium text-slate-500">{DATA_PORTOFOLIO.profil.nama} • {DATA_PORTOFOLIO.profil.bidangStudi}</p>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-2 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/50">
              <NavButton icon={<User size={16} />} label="Profil Mahasiswa" id="profil" activeTab={activeTab} setActiveTab={setActiveTab} />
              <NavButton icon={<BookOpen size={16} />} label="Artefak PPL" id="artefak" activeTab={activeTab} setActiveTab={setActiveTab} />
              <NavButton icon={<Star size={16} />} label="Hasil & Refleksi" id="penilaian" activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
          </div>
          
          {/* Mobile Menu */}
          <div className="flex md:hidden overflow-x-auto py-3 space-x-2 text-sm border-t border-slate-100 hide-scrollbar">
             <NavButton icon={<User size={16} />} label="Profil" id="profil" activeTab={activeTab} setActiveTab={setActiveTab} />
             <NavButton icon={<BookOpen size={16} />} label="Artefak" id="artefak" activeTab={activeTab} setActiveTab={setActiveTab} />
             <NavButton icon={<Star size={16} />} label="Refleksi" id="penilaian" activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12 min-h-[80vh]">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 text-center mt-auto">
        <div className="max-w-6xl mx-auto px-4 flex flex-col items-center">
          <Sparkles className="w-6 h-6 text-teal-400 mb-4" />
          <p className="text-sm font-medium text-slate-500">© {new Date().getFullYear()} Jurnal & Portofolio {DATA_PORTOFOLIO.profil.bidangStudi}.</p>
          <p className="text-xs text-slate-400 mt-1">Dirancang oleh {DATA_PORTOFOLIO.profil.nama}.</p>
        </div>
      </footer>
    </div>
  );
}

// Komponen Navigasi Interaktif
const NavButton = ({ icon, label, id, activeTab, setActiveTab }) => (
  <button
    onClick={() => setActiveTab(id)}
    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 whitespace-nowrap text-sm font-semibold ${
      activeTab === id 
        ? 'bg-white text-teal-700 shadow-sm border border-slate-200/50' 
        : 'text-slate-500 hover:bg-white/50 hover:text-teal-600'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

// Halaman 1: Profil
const ProfilSection = () => {
  const { profil, modelGuru } = DATA_PORTOFOLIO;
  
  return (
    <div className="space-y-12">
      {/* Hero Profil */}
      <div className="bg-white rounded-[2rem] shadow-xl shadow-teal-100/30 border border-white overflow-hidden md:flex items-stretch animate-fade-in-up">
        <div className="md:w-5/12 bg-gradient-to-br from-teal-50 via-violet-50 to-white p-10 flex flex-col justify-center items-center relative overflow-hidden">
          {/* Lingkaran Dekoratif di belakang foto */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-300 via-transparent to-transparent"></div>
          
          <div className="relative w-56 h-56 rounded-full p-2 bg-white shadow-xl shadow-teal-200/50 group transition-transform duration-500 hover:-translate-y-2 hover:shadow-teal-300 z-10">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-teal-50 bg-teal-50/50 flex items-end justify-center">
              {/* Foto Profil */}
              <img src={profil.fotoProfil} alt="Foto Profil" className="w-[90%] h-[90%] object-cover object-top transition-transform duration-700 group-hover:scale-110" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-violet-500 to-purple-500 text-white p-3 rounded-full shadow-lg border-4 border-white animate-bounce">
              <Target className="w-5 h-5" />
            </div>
          </div>
        </div>
        
        <div className="md:w-7/12 p-8 md:p-12 glass-card">
          <div className="inline-flex items-center px-4 py-1.5 bg-teal-50 text-teal-700 rounded-full text-xs font-bold mb-6 tracking-wide shadow-sm border border-teal-100">
            <Sparkles className="w-3 h-3 mr-2 text-violet-500" /> CALON GURU PROFESIONAL
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-teal-700">
            Halo, kenalin saya {profil.nama}
          </h2>
          
          <div className="space-y-5 text-slate-600 leading-relaxed text-sm md:text-base">
            <div className="flex items-start group">
              <div className="p-2.5 bg-teal-50 text-xl rounded-xl mr-4 group-hover:bg-teal-100 transition-colors shadow-sm">📍</div>
              <p><strong className="text-slate-900 block mb-1">Cerita Asal Daerah</strong> {profil.asalDaerah}</p>
            </div>
            <div className="flex items-start group">
              <div className="p-2.5 bg-amber-50 text-xl rounded-xl mr-4 group-hover:bg-amber-100 transition-colors shadow-sm">💡</div>
              <p><strong className="text-slate-900 block mb-1">Awal Mula Terinspirasi</strong> {profil.inspirasi}</p>
            </div>
            <div className="flex items-start group">
              <div className="p-2.5 bg-violet-50 text-xl rounded-xl mr-4 group-hover:bg-violet-100 transition-colors shadow-sm">🎯</div>
              <p><strong className="text-slate-900 block mb-1">Tujuan Personal</strong> {profil.tujuan}</p>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-br from-slate-50 to-teal-50/40 border-l-4 border-teal-500 rounded-r-2xl relative">
            <div className="absolute top-2 left-4 text-5xl text-teal-200/70 font-serif opacity-40">"</div>
            <p className="italic text-slate-700 font-medium relative z-10 pl-5 pt-2">{profil.kutipan}</p>
          </div>
        </div>
      </div>

      {/* Model Guru */}
      <div className="grid md:grid-cols-2 gap-8 animate-fade-in-up stagger-1">
        <div className="bg-white rounded-[2rem] shadow-lg shadow-slate-200/40 border border-slate-100 p-8 md:p-10 hover:shadow-xl hover:shadow-teal-100/40 transition-shadow duration-500">
          <h3 className="text-2xl font-extrabold text-slate-900 mb-8 flex items-center">
            <div className="p-2 bg-violet-100 rounded-xl mr-4 text-violet-600">
              <Target className="w-6 h-6" />
            </div>
            Guru Seperti Apa Sih yang Saya Tuju?
          </h3>
          
          <div className="space-y-8">
            <div>
              <h4 className="font-bold text-slate-900 mb-4 flex items-center text-lg">
                <span className="w-8 h-px bg-teal-200 mr-3"></span> Misi & Rencana Jangka Pendek
              </h4>
              <ul className="space-y-3">
                {modelGuru.misi.map((item, idx) => (
                  <li key={idx} className="flex items-start bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-teal-200 transition-colors group">
                    <CheckCircle className="w-5 h-5 text-teal-500 mr-3 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="text-slate-700 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-5 rounded-2xl border border-teal-100/50 hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                <h4 className="font-bold text-teal-900 mb-2 flex items-center">
                  <BookOpen className="w-4 h-4 mr-2 text-teal-600" /> Target Kompetensi
                </h4>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {modelGuru.kompetensi}
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-5 rounded-2xl border border-violet-100/50 hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                <h4 className="font-bold text-violet-900 mb-2 flex items-center">
                  <User className="w-4 h-4 mr-2 text-violet-600" /> Vibe Karakter
                </h4>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {modelGuru.karakter}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Foto Kegiatan dengan efek Zoom In & Overlay */}
        <div className="rounded-[2rem] overflow-hidden shadow-lg shadow-slate-200/40 border border-slate-100 group h-full relative min-h-[400px]">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent z-10 transition-opacity duration-500"></div>
           <img 
              src={modelGuru.fotoKegiatan} 
              alt="Kegiatan Upacara / Siswa" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
            />
            <div className="absolute bottom-0 left-0 p-8 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-90 group-hover:opacity-100">
              <div className="inline-flex items-center px-3 py-1.5 bg-white/20 backdrop-blur-md text-white rounded-full text-xs font-semibold mb-3 border border-white/30">
                <ImageIcon className="w-3 h-3 mr-2" /> DOKUMENTASI LAPANGAN
              </div>
              <h4 className="text-2xl font-bold text-white mb-2 shadow-sm drop-shadow-md">Keterlibatan di Sekolah</h4>
              <p className="text-teal-100 text-sm font-medium drop-shadow-md">Bersosialisasi dan ngebangun *bonding* sama ekosistem sekolah.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

// Halaman 2: Artefak 
const ArtefakSection = () => {
  const { artefak } = DATA_PORTOFOLIO;
  
  return (
    <div className="space-y-12">
      <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
        <div className="inline-flex items-center justify-center p-3 bg-teal-100 rounded-2xl mb-6 text-teal-600 shadow-inner">
          <BookOpen className="w-8 h-8" />
        </div>
        <h2 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Kumpulan Artefak PPL</h2>
        <p className="text-lg text-slate-600 leading-relaxed">Ini adalah rangkuman perjalanan mengajar saya. Mulai dari nge-desain RPP, bikin media, sampai curhatan analisis ngajar selama PPL Terbimbing di kelas.</p>
      </div>

      <div className="space-y-12">
        {artefak.map((item, index) => (
          <div key={item.id} className={`bg-white rounded-[2rem] shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden md:flex animate-fade-in-up stagger-${(index % 2) + 1} group hover:shadow-xl hover:shadow-violet-100/40 transition-all duration-500`}>
            
            {/* Gambar Dokumentasi Mengajar */}
            <div className="md:w-5/12 relative overflow-hidden">
               <img src={item.foto} alt={item.judul} className="w-full h-full object-cover min-h-[350px] transition-transform duration-700 group-hover:scale-105" />
               
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-70"></div>
               
               <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold text-violet-700 shadow-lg border border-white/50 flex items-center">
                 <Star className="w-4 h-4 mr-2 text-amber-500" /> {item.siklus}
               </div>
               
               <div className="absolute bottom-6 left-6 right-6">
                  <div className="inline-block px-3 py-1 bg-teal-600/90 backdrop-blur-md rounded-md text-xs font-bold text-white uppercase tracking-widest mb-1">{item.jenis}</div>
               </div>
            </div>
            
            {/* Analisis Artefak */}
            <div className="md:w-7/12 p-8 md:p-10 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 leading-tight group-hover:text-teal-600 transition-colors">{item.judul}</h3>
              
              <div className="space-y-5">
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 transition-colors group-hover:bg-slate-100/50">
                  <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-violet-500" /> Cerita Konteks & Tujuan
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed mb-2"><span className="font-semibold text-slate-700">Konteks:</span> {item.konteks}</p>
                  <p className="text-sm text-slate-600 leading-relaxed"><span className="font-semibold text-slate-700">Goal:</span> {item.tujuan}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-5">
                   <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100 hover:bg-emerald-50 transition-colors">
                     <h4 className="text-sm font-bold text-emerald-800 mb-2 flex items-center">
                       <CheckCircle className="w-4 h-4 mr-2" /> Yang Berjalan Baik
                     </h4>
                     <p className="text-sm text-emerald-700 leading-relaxed">{item.kelebihan}</p>
                   </div>
                   <div className="bg-amber-50/50 rounded-2xl p-5 border border-amber-100 hover:bg-amber-50 transition-colors">
                     <h4 className="text-sm font-bold text-amber-800/90 mb-2 flex items-center">
                       <Target className="w-4 h-4 mr-2 text-amber-600" /> Yang Perlu Diperbaiki
                     </h4>
                     <p className="text-sm text-amber-700 leading-relaxed">{item.kekurangan}</p>
                   </div>
                </div>

                <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-5 border border-violet-100 mt-2">
                  <h4 className="text-sm font-bold text-violet-900 mb-2 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2 text-violet-600" /> Hubungannya sama Teori
                  </h4>
                  <p className="text-sm text-violet-800 leading-relaxed">{item.kajianTeori}</p>
                </div>
              </div>
              
              {/* Tombol Interaktif */}
              <div className="mt-8 flex flex-wrap gap-4">
                 <button className="text-sm bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md shadow-teal-200 hover:shadow-lg hover:shadow-teal-300 hover:-translate-y-0.5 transition-all active:scale-95 flex items-center">
                   <FileText className="w-4 h-4 mr-2" /> Buka Dokumen RPP
                 </button>
                 <button className="text-sm bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-semibold shadow-sm hover:shadow hover:-translate-y-0.5 transition-all active:scale-95 flex items-center">
                   <ImageIcon className="w-4 h-4 mr-2 text-slate-400" /> Play Video Ngajar
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Halaman 3: Penilaian
const PenilaianSection = () => {
  const { penilaian } = DATA_PORTOFOLIO;
  
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-teal-100/20 border border-slate-100 p-10 md:p-14 text-center relative overflow-hidden">
        {/* Dekorasi Latar Belakang */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-100/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-teal-50 to-emerald-50 text-teal-600 rounded-2xl mb-6 shadow-sm border border-teal-100">
            <Award className="w-12 h-12" />
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Feedback & Penilaian</h2>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">{penilaian.deskripsi}</p>
          
          <div className="space-y-5 text-left max-w-2xl mx-auto">
            {penilaian.lampiran.map((lamp, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white rounded-2xl border-2 border-slate-100 hover:border-violet-300 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer transform hover:-translate-y-1">
                <div className="flex items-center mb-4 sm:mb-0">
                   <div className="p-3 bg-violet-50 rounded-xl mr-5 group-hover:bg-violet-100 group-hover:scale-110 transition-all">
                     <FileText className="w-6 h-6 text-violet-600" />
                   </div>
                   <div>
                     <h4 className="font-bold text-slate-800 text-lg group-hover:text-violet-700 transition-colors">{lamp.nama}</h4>
                     <p className="text-sm font-medium text-slate-500 mt-1 flex items-center">
                       <CheckCircle className="w-4 h-4 mr-1.5 text-emerald-500" /> {lamp.status}
                     </p>
                   </div>
                </div>
                <button className="flex items-center justify-center w-full sm:w-auto text-sm font-bold text-teal-700 bg-teal-50 hover:bg-teal-600 hover:text-white py-2.5 px-6 rounded-xl transition-colors duration-300">
                  Lihat Berkas <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-gradient-to-br from-teal-50 to-violet-50/40 rounded-[2rem] border border-teal-100/80 text-left max-w-3xl mx-auto shadow-inner relative">
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-gradient-to-r from-teal-500 to-violet-500 text-white px-5 py-1.5 rounded-full text-xs font-bold shadow-lg">
              CATATAN DOSEN & PAMONG
            </div>
            <h3 className="text-xl font-bold text-teal-900 mb-4 flex items-center">
              <Star className="w-6 h-6 mr-3 text-amber-500 fill-current drop-shadow-sm" /> 
              Kesimpulan Refleksi Akhir
            </h3>
            <p className="text-base text-teal-900/80 leading-relaxed italic font-medium">
              "Mahasiswa menunjukkan progress yang riil dari siklus 1 ke siklus 3. Nggak cuma ngebawa materi dengan baik, tapi cara komunikasi sama siswa di lab juga makin santai dan interaktif. Media ajar yang dipakai juga sangat *up-to-date* sama kebiasaan anak sekarang."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};