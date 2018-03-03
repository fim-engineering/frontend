import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';

export default class FAQ extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles} style={{maxWidth: 380, maxHeight: 400, margin: 'auto', padding:10, textAlign:'justify'}}>
        <p><strong>FAQ</strong></p>
        <p><h3>1. FIM itu apa?</h3><br />Gerakan Kaderisasi Kepemudaan, yang mencita-citakan Indonesia yang lebih baik: mandiri, berdaulat, adil dan makmur.<br />Berdiri sejak 2003 dengan model forum aktivis yang menyelenggarakan pelatihan kepemimpinan dan karakter. Sejak 2017, kami berupaya fokus pada apa yang menjadi ciri dan kekuatan utama jaringan FIM selama ini, yaitu kaderisasi kepemudaan.<br /> <br /><h3>2. FIM Regional itu apa?</h3><br />Setelah 5 tahun gerakan FIM, FIM mulai membangun model gerakan yang berbasis regional agar visi pemberdayaan dimulai tidak hanya dari Jakarta. Sejak 2017, para penggerak regional disebut kader next gen. Program regional berbasis pada aktivitas pemberdayaan masyarakat di daerah masing-masing.</p>
        <p><h3>3. Kader Next Gen itu siapa, tugasnya apa?</h3><br />Pemuda/i berusia 18-25 tahun, yang siap minimal selama 1 tahun kedepan fokus membangun aktivitas di FIM regional masing-masing. Para kader next gen, akan diberikan pelatihan dan penguatan nilai-nilai FIM pada pelatihan wilayah yang tersebar di 5 daerah di Indonesia selama 3-4 hari, pada rentang bulan Juni-Juli 2018.</p>
        <p><h3>4. Apa itu pelatihan wilayah?</h3><br />Aktivitas yang bertujuan untuk meningkatkan kapasitas dan persiapan kader next gen mulai dari softskill, internalisasi nilai-nilai FIM dan perumusan kegiatan regional.</p>
        <p><h3>5. Model pelatihan wilayahnya seperti apa?</h3><br />Bootcamp training (pelatihan intensif) selama 3-4 hari di akhir pekan, yang akan diikuti oleh 100-150 peserta dari regional di sekitar lokasi pelatihan</p>
        <p><h3>6. Regional mana saja yang membuka pendaftaran kader next gen untuk diikutkan ke pelatihan wilayah FIM ?</h3></p>
        <p>Ambon<br />Balikpapan<br />Banda Aceh *<br />Bandar Lampung<br />Bandung<br />Banjarbaru<br />Banjarmasin *<br />Batam<br />Bekasi<br />Bengkulu<br />Bogor<br />Bukittinggi<br />Ciamis *<br />Cilegon-Serang Pandeglang-Lebak *<br />Cirebon *<br />Denpasar *<br />Depok<br />Gorontalo<br />Jakarta<br />Jambi<br />Jayapura<br />Jember<br />Jogja<br />Kaltara *<br />Kendari<br />Kupang *<br />Labuan Bajo *<br />Lhokseumawe *<br />Madura *<br />Majene<br />Makassar<br />Malang<br />Maluku Utara *<br />Manado<br />Mataram<br />Maumere *<br />Padang<br />Palangkaraya<br />Palembang<br />Palu<br />Pangkal Pinang<br />Papua Barat *<br />Pekanbaru<br />Pontianak *<br />Purwokerto *<br />Rote *<br />Samarinda<br />Semarang<br />Sidoarjo<br />Solo Raya<br />Sumba *<br />Sumedang *<br />Sumut<br />Surabaya<br />Tangerang Raya<br />* = Regional Baru</p>
        <p><h3>7. Bagaimana dengan Pelatihan Nasional?</h3><br />Pelatihan Nasional FIM rencananya tetap akan dilangsungkan akhir tahun 2018. Komposisinya akan terdiri dari 70% kader next gen terbaik yang dikirim dari regional masing-masing, yang sudah mengikuti pelatihan wilayah dan menunjukkan performa yang baik di FIM regional. 30% peserta pelatihan nasional akan didapat dari pendaftaran baru untuk pemuda-pemudi Indonesia yang sudah memiliki karya yang dikenal oleh masyarakat dengan tujuan salah satunya membangun jejaring strategis antara pemuda-pemudi di Indonesia.</p>
        <p><h3>8. Bagaimana model kontribusi kader next gen di FIM Regional pasca pelatihan wilayah yang diharapkan oleh FIM?</h3><br />Bisa aktif dan memprioritaskan FIM sebagai organisasi utama selama 1 tahun kedepan. Keaktifan akan dievaluasi berkala oleh pengurus FIM regional. <br /><strong>Benefit sebagai kader next gen FIM aktif seperti pemberian rekomendasi beasiswa/konferensi internasional/pekerjaan, kepengurusan FIM Pusat, dan lainnya baru akan bisa diberikan setelah masa aktif 1 tahun terpenuhi</strong></p>
        <p><h3>9. Bagaimana dasar saya sebagai calon next gen untuk menentukan regional pilihan saya?</h3><br />Silahkan refleksikan selama 1 tahun kedepan, kamu akan banyak beraktivitas untuk FIM di daerah mana</p>
        <p><h3>10. Bolehkah memilih regional X, tapi saya bisa pilih lokasi pelatihan wilayah yang berbeda dengan regional pilihan saya?</h3><br />Tidak bisa. Setiap regional sudah ditentukan akan turut serta sebagai penyelenggara pelatihan wilayah tertentu. Jadi pilihan regionalmu akan berkonsekuensi dengan pilihan tempat pelatihan wilayah.</p>
        <p><h3>11. Bagaimana pembagian lokasi pelatihan wilayah berdasarkan FIM regionalnya </h3><br />Pelatwil 1 : seluruh FIM regional dari sumatera<br />Pelatwil 2 : seluruh FIM regional dari Jabodetabek dan Kalimantan<br />Pelatwil 3 : seluruh FIM regional dari Banten, Jawa Barat (diluar Jabodetabek), Jawa Tengah dan Yogyakarta<br />Pelatwil 4 : seluruh FIM regional dari Jawa Timur, Bali, dan Nusa Tenggara<br />Pelatwil 5 : seluruh FIM regional dari Sulawesi, Maluku dan Papua</p>
      </div>
    );
  }
}
