// Bobot & batas (disesuaikan dari contoh di soal; cek lagi dengan Lab 1)
const BOBOT = { tugas: 0.3, uts: 0.3, uas: 0.4 };
const BATAS_LULUS = 55;

function hitungNilaiAkhir(tugas, uts, uas) {
  const hasil = tugas * BOBOT.tugas + uts * BOBOT.uts + uas * BOBOT.uas;
  return Math.round(hasil * 100) / 100;
}

function tentukanGrade(nilai) {
  if (nilai >= 85) return "A";
  if (nilai >= 70) return "B";
  if (nilai >= 55) return "C";
  if (nilai >= 40) return "D";
  return "E";
}

function buatRekap(daftar) {
  return daftar.map((m) => {
    const nilaiAkhir = hitungNilaiAkhir(m.tugas, m.uts, m.uas);
    return {
      ...m,
      nilaiAkhir,
      grade: tentukanGrade(nilaiAkhir),
      lulus: nilaiAkhir >= BATAS_LULUS,
    };
  });
}

function hitungRataRata(rekap) {
  if (rekap.length === 0) return 0;
  const total = rekap.reduce((jumlah, m) => jumlah + m.nilaiAkhir, 0);
  return Math.round((total / rekap.length) * 100) / 100;
}

function cariTertinggi(rekap) {
  if (rekap.length === 0) return null;
  return rekap.reduce((maks, m) => (m.nilaiAkhir > maks.nilaiAkhir ? m : maks));
}

function hitungDistribusiGrade(rekap) {
  const distribusi = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  for (const m of rekap) distribusi[m.grade]++;
  return distribusi;
}

function cariMahasiswa(rekap, kataKunci) {
  const kunci = kataKunci.trim().toLowerCase();
  if (kunci === "") return rekap;
  return rekap.filter((m) => m.nama.toLowerCase().includes(kunci));
}

// ---- Sudah jadi: validasi input mahasiswa baru ----
function validasiMahasiswa(input) {
  const errors = [];
  if (typeof input.nim !== "string" || !/^\d{7}$/.test(input.nim)) {
    errors.push("NIM harus 7 digit angka");
  }
  if (typeof input.nama !== "string" || input.nama.trim().length < 3) {
    errors.push("Nama minimal 3 karakter");
  }
  for (const kolom of ["tugas", "uts", "uas"]) {
    const n = input[kolom];
    if (typeof n !== "number" || !Number.isFinite(n) || n < 0 || n > 100) {
      errors.push(`Nilai ${kolom} harus angka 0-100`);
    }
  }
  return errors;
}
