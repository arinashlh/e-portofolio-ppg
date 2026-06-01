import React, { useState } from 'react';
import { BookOpen, User, Star, FileText, Award, ChevronRight, CheckCircle, Target, Image as ImageIcon, Sparkles, BookMarked, Lightbulb } from 'lucide-react';

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
`;

const DATA_PORTOFOLIO = {
  profil: {
    nama: "Nama Anda Disini",
    bidangStudi: "PPG Informatika",
    asalDaerah: "Saya berasal dari daerah yang sedang berkembang pesat secara digital. Menariknya, walau teknologi mulai masuk ke berbagai aspek kehidupan di sini, masyarakatnya tetap menjaga kearifan lokal. Ini yang bikin saya sadar kalau teknologi itu harus diajarkan sesuai dengan konteks lingkungan siswanya.",
    inspirasi: "Jujur, awalnya saya cuma suka ngoding dan ngotak-ngatik komputer di kamar. Tapi sewaktu ada kesempatan ngajar dasar IT di sebuah sekolah binaan, ngeliat antusiasme anak-anak waktu program 'Hello World' mereka berhasil jalan itu rasanya luar biasa. Momen itu yang bikin saya mantap milih jalan jadi guru.",
    tujuan: "Lulus dari PPG ini, saya nggak cuma mau dapet gelar Gr. Saya mau jadi guru Informatika yang relevan—guru yang bisa bikin computational thinking itu asyik, gampang dipahami, dan nggak cuma sekadar ngafalin teori di buku cetak.",
    kutipan: '"Guru yang baik itu ibarat programmer yang sabar; mereka tahu gimana men-debug kebingungan siswanya baris demi baris sampai jadi sebuah pemahaman yang jalan tanpa error."',
    fotoProfil: "wmremove-transformed__1_-removebg-preview.png"
  },
  modelGuru: {
    misi: [
      "Menciptakan suasana kelas atau lab yang aman buat trial & error (nggak takut salah ketik kode).",
      "Ngenalin tools kekinian (kayak VS Code atau Git) sejak dini biar siswa siap sama dunia kerja asli.",
      "Jadi temen diskusi buat siswa yang pengen eksplor bikin project IT mereka sendiri."
    ],
    kompetensi: "Fokus utama saya sekarang adalah ningkatin TPACK, terutama gimana caranya nyari analogi di dunia nyata untuk ngejelasin konsep jaringan atau algoritma yang abstrak ke anak-anak biar gampang dicerna.",
    karakter: "Terbuka sama feedback, nggak anti dikritik siswa kalau ngajarnya ngebosenin, dan selalu mau belajar hal baru karena dunia IT itu cepet banget updatenya.",
    fotoKegiatan: "WhatsApp Image 2026-04-23 at 17.55.54.jpeg"
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
      teori: "Kondisi ini relate banget sama teorinya Vygotsky soal Scaffolding. Di tahap awal ngenalin bahasa baru, pendampingan intens itu krusial banget sebelum mereka bisa dilepas mandiri.",
      keberhasilan: "Anak-anak lumayan excited karena langsung praktek. Pakai platform visual di awal ngebantu banget nurunin rasa tegang mereka terhadap koding.",
      perubahan: "Jika kelas memiliki lebih banyak siswa, saya akan membagi mereka menjadi kelompok kecil dengan tutor sebaya agar pendampingan lebih efektif dan merata.",
      foto: "WhatsApp Image 2026-04-23 at 17.56.30.jpeg"
    },
    {
      id: 2,
      siklus: "Siklus 2",
      judul: "Media Interaktif Jaringan Dasar",
      jenis: "Media Pembelajaran",
      konteks: "Materi topologi jaringan ini lumayan bikin ngantuk kalau cuma diceramahin. Jadi pembelajaran di-set di ruang kelas biasa tapi pakai proyektor & media simulasi interaktif.",
      tujuan: "Biar siswa bisa kebayang secara visual gimana sih data itu jalan-jalan dari satu komputer ke komputer lain di beda-beda topologi.",
      kendala: "Persiapannya lumayan rempong karena harus mastiin koneksi kelas stabil. Sempat ada nge-lag dikit pas buka web simulasinya.",
      teori: "Ini membuktikan Teori Dual Coding (Paivio). Waktu anak-anak dengerin penjelasan saya (verbal) sambil lihat animasi data gerak (visual), mereka lebih cepet nangkep idenya.",
      keberhasilan: "Jauh lebih hidup kelasnya dibanding siklus 1. Ada beberapa siswa yang berani maju nyoba simulasinya langsung di depan temen-temennya.",
      perubahan: "Untuk kelas tanpa internet stabil, saya akan menyiapkan versi offline dari simulasi atau menggunakan video yang diunduh terlebih dahulu.",
      foto: "WhatsApp Image 2026-04-21 at 09.09.26 (1).jpeg"
    }
  ],
  penilaian: {
    deskripsi: "Di bagian ini ada rangkuman nilai dan obrolan reflektif bareng Guru Pamong (GP) dan Dosen Pembimbing Lapangan (DPL) setelah ngelewatin drama PPL 3 Siklus.",
    lampiran: [
      { nama: "Lampiran 7: Instrumen Penilaian Perangkat", status: "Done (Diulas GP & DPL)" },
      { nama: "Lampiran 8: Instrumen Penilaian Praktik Mengajar", status: "Done (Siklus 1, 2, 3)" }
    ],
    catatanAkhir: "Mahasiswa menunjukkan progress yang riil dari siklus 1 ke siklus 3. Nggak cuma ngebawa materi dengan baik, tapi cara komunikasi sama siswa di lab juga makin santai dan interaktif. Media ajar yang dipakai juga sangat up-to-date sama kebiasaan anak sekarang."
  },
  refleksiAkhir: {
    pembelajaran: "Selama PPL Terbimbing, saya mempelajari bahwa mengajar bukan sekadar menyampaikan konten, melainkan seni membangun koneksi antara konsep abstrak dan pengalaman nyata siswa. Saya belajar bahwa manajemen kelas di laboratorium komputer sangat berbeda dengan kelas reguler—dibutuhkan perencanaan yang lebih detail terkait alur aktivitas praktikum. Saya juga semakin memahami pentingnya asesmen formatif sebagai alat diagnosis, bukan hanya alat evaluasi.",
    tantangan: "Tantangan terbesar adalah ketika menghadapi heterogenitas kemampuan siswa yang sangat beragam dalam satu kelas. Beberapa siswa sudah fasih dengan pemrograman dasar, sementara yang lain belum pernah menyentuh kode sama sekali. Solusi yang saya terapkan adalah pendekatan differentiated instruction: memberikan tantangan ekstra bagi yang sudah maju, sambil memberikan scaffolding bertingkat bagi yang masih membutuhkan bimbingan.",
    umpanBalik: "DPL menyarankan agar saya lebih banyak menggunakan teknik questioning yang mendorong siswa berpikir kritis, bukan hanya menjawab dengan ya/tidak. GP memberikan masukan agar manajemen waktu praktikum lebih terstruktur dengan pembagian fase yang jelas: eksplorasi, demonstrasi, dan evaluasi."
  },
  filosofi: [
    "Saya percaya bahwa setiap siswa adalah pemikir komputasional yang belum menemukan konteksnya. Filosofi mengajar saya berakar pada keyakinan bahwa Informatika bukan sekadar mata pelajaran teknis, melainkan cara berpikir—sebuah lens yang membantu manusia memahami dan menyelesaikan masalah dunia nyata. Mengacu pada teori konstruktivisme Piaget, saya meyakini bahwa pengetahuan dibangun secara aktif oleh siswa melalui pengalaman langsung, bukan diterima secara pasif dari guru.",
    "Dalam praktiknya, saya mengadopsi pendekatan Problem-Based Learning yang terinspirasi dari pemikiran John Dewey tentang learning by doing. Setiap topik—dari algoritma hingga jaringan komputer—saya kemas dalam konteks masalah nyata yang dekat dengan kehidupan siswa. Hal ini sejalan dengan teori Relevansi dalam model ARCS Keller, yang menyatakan bahwa motivasi belajar meningkat ketika siswa melihat keterkaitan antara materi dan kehidupan mereka sendiri.",
    "Akhirnya, saya berpegang teguh pada prinsip bahwa penilaian seharusnya membebaskan, bukan membelenggu. Terinspirasi dari konsep Assessment for Learning (AfL), saya memandang umpan balik sebagai dialog yang berkelanjutan antara guru dan siswa. Kesalahan dalam kode adalah titik awal diskusi, bukan akhir dari penilaian. Saya ingin membentuk siswa yang memiliki growth mindset—yang percaya bahwa kemampuan dapat dilatih melalui kerja keras dan refleksi yang konsisten."
  ]
};

const ALL_TABS = [
  { id: 'profil',   label: 'Profil',          shortLabel: 'Profil',     icon: <User size={15}/> },
  { id: 'artefak',  label: 'Artefak PPL',      shortLabel: 'Artefak',    icon: <BookOpen size={15}/> },
  { id: 'penilaian',label: 'Penilaian',        shortLabel: 'Penilaian',  icon: <Star size={15}/> },
  { id: 'model',    label: 'Model Guru',       shortLabel: 'Model Guru', icon: <Target size={15}/> },
  { id: 'refleksi', label: 'Refleksi Akhir',   shortLabel: 'Refleksi',   icon: <BookMarked size={15}/> },
  { id: 'filosofi', label: 'Filosofi Mengajar',shortLabel: 'Filosofi',   icon: <Lightbulb size={15}/> },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('profil');
  const current = ALL_TABS.find(t => t.id === activeTab);

  const renderContent = () => {
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

      {/* Background Blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-teal-200/40 rounded-full blur-3xl mix-blend-multiply"></div>
        <div className="absolute top-[20%] right-[-10%] w-[30rem] h-[30rem] bg-violet-200/30 rounded-full blur-3xl mix-blend-multiply"></div>
        <div className="absolute bottom-[10%] left-[20%] w-80 h-80 bg-emerald-100/30 rounded-full blur-3xl mix-blend-multiply"></div>
      </div>

      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-teal-100/50">
        <div className="max-w-6xl mx-auto px-4">
          {/* Top bar: logo only */}
          <div className="flex items-center py-3.5 gap-3">
            <div className="bg-gradient-to-br from-teal-500 to-emerald-400 p-2 rounded-xl shadow-md shadow-teal-200/50">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-800 to-emerald-600 tracking-tight leading-none">Portofolio PPG</h1>
              <p className="text-xs font-medium text-slate-500 mt-0.5">{DATA_PORTOFOLIO.profil.nama} • {DATA_PORTOFOLIO.profil.bidangStudi}</p>
            </div>
          </div>

          {/* Menu tabs */}
          <div className="flex overflow-x-auto hide-scrollbar border-t border-slate-100 gap-1 py-1.5">
            {ALL_TABS.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all duration-300 whitespace-nowrap text-sm font-semibold relative ${
                  activeTab === t.id
                    ? 'bg-white text-teal-700 shadow-sm border border-slate-200/60'
                    : 'text-slate-500 hover:bg-white/60 hover:text-teal-600'
                }`}>
                {t.icon}
                <span className="hidden sm:inline">{t.label}</span>
                <span className="sm:hidden">{t.shortLabel}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12 min-h-[80vh]">
        {renderContent()}
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

// ─── Profil ─────────────────────────────────────────────────────────────────
const ProfilSection = () => {
  const { profil } = DATA_PORTOFOLIO;
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="bg-white rounded-[2rem] shadow-xl shadow-teal-100/30 border border-white overflow-hidden md:flex items-stretch">
        <div className="md:w-5/12 bg-gradient-to-br from-teal-50 via-violet-50 to-white p-10 flex flex-col justify-center items-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-300 via-transparent to-transparent"></div>
          <div className="relative w-52 h-52 rounded-full p-2 bg-white shadow-xl shadow-teal-200/50 group transition-transform duration-500 hover:-translate-y-2 z-10">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-teal-50 bg-teal-50/50 flex items-end justify-center">
              <img src={profil.fotoProfil} alt="Foto Profil" className="w-[90%] h-[90%] object-cover object-top transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-violet-500 to-purple-500 text-white p-3 rounded-full shadow-lg border-4 border-white animate-bounce">
              <Target className="w-5 h-5" />
            </div>
          </div>
        </div>
        <div className="md:w-7/12 p-8 md:p-12 bg-white/85 backdrop-blur-md">
          <div className="inline-flex items-center px-4 py-1.5 bg-teal-50 text-teal-700 rounded-full text-xs font-bold mb-5 border border-teal-100">
            <Sparkles className="w-3 h-3 mr-2 text-violet-500" /> CALON GURU PROFESIONAL
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-teal-700">
            Halo, kenalin saya {profil.nama}
          </h2>
          <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
            <div className="flex items-start group">
              <div className="p-2.5 bg-teal-50 text-xl rounded-xl mr-4 group-hover:bg-teal-100 transition-colors shadow-sm">📍</div>
              <p><strong className="text-slate-900 block mb-0.5">Cerita Asal Daerah</strong>{profil.asalDaerah}</p>
            </div>
            <div className="flex items-start group">
              <div className="p-2.5 bg-amber-50 text-xl rounded-xl mr-4 group-hover:bg-amber-100 transition-colors shadow-sm">💡</div>
              <p><strong className="text-slate-900 block mb-0.5">Awal Mula Terinspirasi</strong>{profil.inspirasi}</p>
            </div>
            <div className="flex items-start group">
              <div className="p-2.5 bg-violet-50 text-xl rounded-xl mr-4 group-hover:bg-violet-100 transition-colors shadow-sm">🎯</div>
              <p><strong className="text-slate-900 block mb-0.5">Tujuan Personal</strong>{profil.tujuan}</p>
            </div>
          </div>
          <div className="mt-7 p-5 bg-gradient-to-br from-slate-50 to-teal-50/40 border-l-4 border-teal-500 rounded-r-2xl relative">
            <div className="absolute top-2 left-4 text-5xl text-teal-200/70 font-serif opacity-40">"</div>
            <p className="italic text-slate-700 font-medium relative z-10 pl-5 pt-1 text-sm">{profil.kutipan}</p>
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
      <div className="text-center max-w-3xl mx-auto mb-10 animate-fade-in-up">
        <div className="inline-flex items-center justify-center p-3 bg-teal-100 rounded-2xl mb-5 text-teal-600 shadow-inner">
          <BookOpen className="w-8 h-8" />
        </div>
        <h2 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Kumpulan Artefak PPL</h2>
        <p className="text-lg text-slate-600 leading-relaxed">Analisis produk pembelajaran dari setiap siklus—kendala, kajian teori, faktor keberhasilan, hingga adaptasi untuk situasi kelas berbeda.</p>
      </div>
      {artefak.map((item, index) => (
        <div key={item.id} className={`bg-white rounded-[2rem] shadow-lg border border-slate-100 overflow-hidden md:flex animate-fade-in-up stagger-${(index%2)+1} group hover:shadow-xl hover:shadow-violet-100/40 transition-all duration-500`}>
          <div className="md:w-5/12 relative overflow-hidden">
            <img src={item.foto} alt={item.judul} className="w-full h-full object-cover min-h-[320px] transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
            <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold text-violet-700 shadow-lg flex items-center">
              <Star className="w-4 h-4 mr-2 text-amber-500" />{item.siklus}
            </div>
            <div className="absolute bottom-5 left-5">
              <div className="px-3 py-1 bg-teal-600/90 backdrop-blur-md rounded-md text-xs font-bold text-white uppercase tracking-widest">{item.jenis}</div>
            </div>
          </div>
          <div className="md:w-7/12 p-7 md:p-9 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">{item.judul}</h3>
            <p className="text-sm text-slate-500 mb-5 leading-relaxed">
              <span className="font-semibold text-slate-600">Konteks:</span> {item.konteks} <span className="font-semibold text-slate-600 ml-1">Tujuan:</span> {item.tujuan}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-red-50/70 rounded-2xl p-4 border border-red-100">
                <h4 className="text-xs font-bold text-red-800 mb-2 flex items-center gap-1.5">
                  <span className="w-4 h-4 bg-red-200 rounded-full flex items-center justify-center text-red-700 text-[10px] font-black">!</span> Kendala
                </h4>
                <p className="text-xs text-red-700 leading-relaxed">{item.kendala}</p>
              </div>
              <div className="bg-violet-50/70 rounded-2xl p-4 border border-violet-100">
                <h4 className="text-xs font-bold text-violet-800 mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-violet-600" /> Teori Pedagogi
                </h4>
                <p className="text-xs text-violet-700 leading-relaxed">{item.teori}</p>
              </div>
              <div className="bg-emerald-50/70 rounded-2xl p-4 border border-emerald-100">
                <h4 className="text-xs font-bold text-emerald-800 mb-2 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Faktor Keberhasilan
                </h4>
                <p className="text-xs text-emerald-700 leading-relaxed">{item.keberhasilan}</p>
              </div>
              <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-100">
                <h4 className="text-xs font-bold text-amber-800 mb-2 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-amber-600" /> Adaptasi Kelas Lain
                </h4>
                <p className="text-xs text-amber-700 leading-relaxed">{item.perubahan}</p>
              </div>
            </div>
            <div className="mt-5 flex gap-3">
              <button className="text-sm bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md shadow-teal-200 hover:-translate-y-0.5 transition-all flex items-center">
                <FileText className="w-4 h-4 mr-2" /> Buka RPP
              </button>
              <button className="text-sm bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-semibold shadow-sm hover:-translate-y-0.5 transition-all flex items-center">
                <ImageIcon className="w-4 h-4 mr-2 text-slate-400" /> Video Ngajar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── Penilaian ───────────────────────────────────────────────────────────────
const PenilaianSection = () => {
  const { penilaian } = DATA_PORTOFOLIO;
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-teal-100/20 border border-slate-100 p-10 md:p-14 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-100/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-teal-50 to-emerald-50 text-teal-600 rounded-2xl mb-5 border border-teal-100">
            <Award className="w-10 h-10" />
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Feedback & Penilaian</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl">{penilaian.deskripsi}</p>
          <div className="space-y-4 max-w-2xl">
            {penilaian.lampiran.map((lamp, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-white rounded-2xl border-2 border-slate-100 hover:border-violet-300 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer hover:-translate-y-1">
                <div className="flex items-center mb-4 sm:mb-0">
                  <div className="p-3 bg-violet-50 rounded-xl mr-4 group-hover:bg-violet-100 group-hover:scale-110 transition-all">
                    <FileText className="w-5 h-5 text-violet-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 group-hover:text-violet-700 transition-colors">{lamp.nama}</h4>
                    <p className="text-sm font-medium text-slate-500 mt-0.5 flex items-center">
                      <CheckCircle className="w-3.5 h-3.5 mr-1 text-emerald-500" />{lamp.status}
                    </p>
                  </div>
                </div>
                <button className="flex items-center justify-center w-full sm:w-auto text-sm font-bold text-teal-700 bg-teal-50 hover:bg-teal-600 hover:text-white py-2 px-5 rounded-xl transition-colors duration-300">
                  Lihat Berkas <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-8 p-7 bg-gradient-to-br from-teal-50 to-violet-50/40 rounded-[2rem] border border-teal-100/80 max-w-3xl relative shadow-inner">
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-gradient-to-r from-teal-500 to-violet-500 text-white px-5 py-1.5 rounded-full text-xs font-bold shadow-lg">
              CATATAN DOSEN & PAMONG
            </div>
            <h3 className="text-lg font-bold text-teal-900 mb-3 flex items-center">
              <Star className="w-5 h-5 mr-2 text-amber-500 fill-current" /> Kesimpulan Refleksi Akhir
            </h3>
            <p className="text-base text-teal-900/80 leading-relaxed italic font-medium">"{penilaian.catatanAkhir}"</p>
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
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-violet-100 rounded-2xl mb-5 text-violet-600 shadow-inner">
          <Target className="w-8 h-8" />
        </div>
        <h2 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Model Guru yang Dituju</h2>
        <p className="text-lg text-slate-600 leading-relaxed">Misi, kompetensi, dan karakter yang ingin dibangun sebagai fondasi menuju guru profesional.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-[2rem] shadow-lg border border-slate-100 p-8 hover:shadow-xl hover:shadow-teal-100/40 transition-shadow duration-500">
          <h3 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center">
            <div className="p-2 bg-teal-100 rounded-xl mr-3 text-teal-600"><Target className="w-5 h-5" /></div>
            Misi & Rencana Jangka Pendek
          </h3>
          <ul className="space-y-3 mb-6">
            {modelGuru.misi.map((item, idx) => (
              <li key={idx} className="flex items-start bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-teal-200 transition-colors group">
                <CheckCircle className="w-5 h-5 text-teal-500 mr-3 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="text-slate-700 text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-4 rounded-2xl border border-teal-100/50 hover:-translate-y-1 transition-transform shadow-sm">
              <h4 className="font-bold text-teal-900 mb-2 text-sm flex items-center">
                <BookOpen className="w-4 h-4 mr-1.5 text-teal-600" /> Target Kompetensi
              </h4>
              <p className="text-slate-700 text-xs leading-relaxed">{modelGuru.kompetensi}</p>
            </div>
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-4 rounded-2xl border border-violet-100/50 hover:-translate-y-1 transition-transform shadow-sm">
              <h4 className="font-bold text-violet-900 mb-2 text-sm flex items-center">
                <User className="w-4 h-4 mr-1.5 text-violet-600" /> Vibe Karakter
              </h4>
              <p className="text-slate-700 text-xs leading-relaxed">{modelGuru.karakter}</p>
            </div>
          </div>
        </div>
        <div className="rounded-[2rem] overflow-hidden shadow-lg border border-slate-100 group relative min-h-[380px]">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent z-10"></div>
          <img src={modelGuru.fotoKegiatan} alt="Kegiatan Lapangan" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
          <div className="absolute bottom-0 left-0 p-7 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <div className="inline-flex items-center px-3 py-1.5 bg-white/20 backdrop-blur-md text-white rounded-full text-xs font-semibold mb-3 border border-white/30">
              <ImageIcon className="w-3 h-3 mr-2" /> DOKUMENTASI LAPANGAN
            </div>
            <h4 className="text-2xl font-bold text-white mb-1 drop-shadow-md">Keterlibatan di Sekolah</h4>
            <p className="text-teal-100 text-sm font-medium drop-shadow-md">Membangun bonding dengan ekosistem sekolah.</p>
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
    { label: "Apa yang Dipelajari Selama PPL Terbimbing", icon: "📖", bg: "bg-teal-50/60", border: "border-teal-100", titleColor: "text-teal-900", textColor: "text-teal-800", accentBorder: "border-l-teal-400", content: refleksiAkhir.pembelajaran },
    { label: "Pengalaman Menantang & Solusinya", icon: "⚡", bg: "bg-amber-50/60", border: "border-amber-100", titleColor: "text-amber-900", textColor: "text-amber-800", accentBorder: "border-l-amber-400", content: refleksiAkhir.tantangan },
    { label: "Umpan Balik & Saran Konstruktif GP & DPL", icon: "💬", bg: "bg-violet-50/60", border: "border-violet-100", titleColor: "text-violet-900", textColor: "text-violet-800", accentBorder: "border-l-violet-400", content: refleksiAkhir.umpanBalik },
  ];
  return (
    <div className="space-y-10 animate-fade-in-up">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-violet-100 rounded-2xl mb-5 text-violet-600 shadow-inner">
          <BookMarked className="w-8 h-8" />
        </div>
        <h2 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Refleksi Akhir PPL Terbimbing</h2>
        <p className="text-lg text-slate-600 leading-relaxed">Analisis mendalam atas perjalanan dari awal hingga akhir PPL—pembelajaran, tantangan, dan arah perbaikan ke depan.</p>
      </div>
      <div className="space-y-5 max-w-4xl mx-auto">
        {items.map((item, i) => (
          <div key={i} className={`bg-white rounded-[2rem] shadow-lg border border-slate-100 overflow-hidden flex hover:shadow-xl transition-all duration-500 group border-l-4 ${item.accentBorder}`}>
            <div className="p-7 md:p-9 flex-1">
              <div className={`inline-flex items-center gap-2 px-3 py-1 ${item.bg} ${item.border} border rounded-full text-xs font-bold mb-4 ${item.titleColor}`}>
                <span>{item.icon}</span> Aspek {i + 1}
              </div>
              <h3 className={`text-xl font-extrabold mb-3 ${item.titleColor}`}>{item.label}</h3>
              <p className={`text-base leading-relaxed ${item.textColor}`}>{item.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-teal-600 to-violet-600 rounded-[2rem] p-8 md:p-10 shadow-xl shadow-teal-200/50">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 bg-white/20 rounded-xl"><Sparkles className="w-6 h-6 text-white" /></div>
          <h3 className="text-xl font-extrabold text-white">Arah Menuju PPL Mandiri</h3>
        </div>
        <p className="text-teal-50 text-base leading-relaxed font-medium">
          Berbekal refleksi dari ketiga siklus ini, saya berkomitmen untuk membawa perbaikan nyata ke tahap PPL Mandiri—khususnya dalam manajemen waktu praktikum, teknik questioning yang lebih Sokratik, dan pemanfaatan asesmen formatif secara lebih sistematis.
        </p>
      </div>
    </div>
  );
};

// ─── Filosofi ─────────────────────────────────────────────────────────────────
const FilosofiSection = () => {
  const { filosofi } = DATA_PORTOFOLIO;
  const labels = ["Konstruktivis & Kontekstual", "Problem-Based & Relevan", "Asesmen sebagai Dialog"];
  return (
    <div className="space-y-10 animate-fade-in-up">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-amber-100 rounded-2xl mb-5 text-amber-600 shadow-inner">
          <Lightbulb className="w-8 h-8" />
        </div>
        <h2 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Filosofi Mengajar</h2>
        <p className="text-lg text-slate-600 leading-relaxed">Prinsip, keyakinan, dan nilai yang mendasari praktik pengajaran—menjadi ideologi selama perjalanan menjadi guru profesional.</p>
      </div>
      <div className="max-w-4xl mx-auto space-y-6">
        {filosofi.map((para, i) => (
          <div key={i} className="bg-white rounded-[2rem] shadow-lg border border-slate-100 overflow-hidden group hover:shadow-xl hover:shadow-violet-100/40 transition-all duration-500 md:flex">
            <div className="md:w-14 bg-gradient-to-b from-violet-500 to-teal-500 flex items-center justify-center flex-shrink-0 py-8">
              <span className="text-white font-extrabold text-xl" style={{ writingMode:'vertical-rl', transform:'rotate(180deg)', letterSpacing:'0.1em' }}>{`0${i+1}`}</span>
            </div>
            <div className="p-7 md:p-9 flex-1">
              <div className="inline-flex items-center px-3 py-1 bg-violet-50 text-violet-700 rounded-full text-xs font-bold mb-4 border border-violet-100">
                <Sparkles className="w-3 h-3 mr-1.5" />{labels[i]}
              </div>
              <div className="text-5xl text-teal-100 font-serif leading-none mb-1 select-none">"</div>
              <p className="text-slate-700 text-base leading-relaxed">{para}</p>
            </div>
          </div>
        ))}
        <div className="bg-gradient-to-br from-slate-50 to-teal-50 rounded-[2rem] border border-teal-100 p-8 text-center shadow-sm">
          <div className="text-4xl mb-3">🌱</div>
          <h3 className="text-xl font-extrabold text-slate-900 mb-2">Filosofi ini Terus Berkembang</h3>
          <p className="text-slate-600 text-base leading-relaxed max-w-xl mx-auto">
            Filosofi ini bukan dokumen yang statis. Ia akan terus berkembang seiring pengalaman, refleksi, dan dialog dengan siswa, rekan guru, serta literatur pendidikan yang terus dipelajari.
          </p>
        </div>
      </div>
    </div>
  );
};