import jsPDF from "jspdf";

export function generateKomitmenPDF(
  namaSekolah: string,
  penanggungJawab: string,
  signatureDataUrl: string,
) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // --- BRAND COLORS ---
  const primaryColor = { r: 31, g: 41, b: 55 }; // Slate 800 (Dark)
  const accentColor = { r: 249, g: 115, b: 22 }; // Orange 500
  const lightGray = { r: 243, g: 244, b: 246 }; // Gray 100

  // --- PAGE BORDERS ---
  doc.setDrawColor(primaryColor.r, primaryColor.g, primaryColor.b);
  doc.setLineWidth(0.5);
  doc.rect(12, 12, 186, 273); // Outer border
  doc.setDrawColor(accentColor.r, accentColor.g, accentColor.b);
  doc.setLineWidth(1.5);
  doc.rect(14, 14, 182, 269); // Inner thick border

  // --- HEADER SECTION ---
  doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("KONTRAK KOMITMEN BERSAMA", 105, 35, {
    align: "center",
    renderingMode: "fill",
  });

  doc.setTextColor(accentColor.r, accentColor.g, accentColor.b);
  doc.setFontSize(12);
  doc.text("PROGRAM EKOSISTEM DIGITAL PENDIDIKAN", 105, 43, {
    align: "center",
  });

  // Separator Line
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.line(30, 50, 180, 50);

  // --- IDENTITAS SECTION ---
  doc.setTextColor(50, 50, 50);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(
    "Dengan rahmat Tuhan Yang Maha Esa, yang bertanda tangan di bawah ini:",
    24,
    65,
  );

  // Box for details
  doc.setFillColor(lightGray.r, lightGray.g, lightGray.b);
  doc.rect(24, 70, 162, 25, "F");

  doc.setFont("helvetica", "bold");
  doc.text("Nama Instansi/Sekolah", 28, 79);
  doc.text(":", 75, 79);
  doc.text(namaSekolah.toUpperCase(), 78, 79);

  doc.text("Nama Penanggung Jawab", 28, 88);
  doc.text(":", 75, 88);
  doc.text(penanggungJawab.toUpperCase(), 78, 88);

  // --- KLAUSUL KOMITMEN ---
  doc.setFont("helvetica", "normal");
  doc.text(
    "Menyatakan dengan sungguh-sungguh dan penuh kesadaran untuk berpartisipasi aktif",
    24,
    108,
  );
  doc.text(
    "dalam menjaga serta mengawasi integritas penggunaan gawai di lingkungan pendidikan",
    24,
    114,
  );
  doc.text("melalui 5 (lima) pilar komitmen berikut:", 24, 120);

  const points = [
    "1.  Memastikan perangkat digital digunakan khusus untuk menunjang pendidikan.",
    "2.  Menetapkan aturan tegas batasan waktu akses gawai di area sekolah.",
    "3.  Mensosialisasikan bahaya cyberbullying & dampaknya pada kesehatan mental.",
    "4.  Memberikan ruang diskusi terbuka bagi siswa terkait literasi dan etika digital.",
    "5.  Melibatkan orang tua agar turut memantau pemakaian alat elektronik anak di rumah.",
  ];

  let yPos = 132;
  doc.setFont("helvetica", "bold");
  points.forEach((pt) => {
    // Split text if it's too long (though these fit A4 easily)
    doc.text(pt, 28, yPos);
    yPos += 10;
  });

  // --- PENUTUP ---
  doc.setFont("helvetica", "normal");
  doc.text(
    "Demikian komitmen ini disepakati untuk dijadikan pedoman bersama demi terciptanya",
    24,
    yPos + 10,
  );
  doc.text(
    "generasi digital yang cerdas, bijak, dan berkarakter.",
    24,
    yPos + 16,
  );

  // --- FOOTER & SIGNATURE ---
  const today = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const sigY = yPos + 35;

  doc.text(`Ditetapkan secara elektronik pada tanggal: ${today}`, 105, sigY, {
    align: "center",
  });
  doc.text("Mengesahkan,", 105, sigY + 8, { align: "center" });

  // Embed Signature
  if (signatureDataUrl) {
    // Center the signature. Assuming sig is roughly 60x30
    doc.addImage(signatureDataUrl, "PNG", 75, sigY + 12, 60, 30);
  } else {
    doc.text("( Tanda Tangan Digital )", 105, sigY + 25, { align: "center" });
  }

  doc.setFont("helvetica", "bold");
  doc.text(penanggungJawab.toUpperCase(), 105, sigY + 50, { align: "center" });

  doc.setDrawColor(primaryColor.r, primaryColor.g, primaryColor.b);
  doc.setLineWidth(0.5);
  // Underline name
  const nameWidth = doc.getTextWidth(penanggungJawab.toUpperCase());
  doc.line(105 - nameWidth / 2, sigY + 51, 105 + nameWidth / 2, sigY + 51);

  doc.setFont("helvetica", "normal");
  doc.text(`Perwakilan ${namaSekolah}`, 105, sigY + 56, { align: "center" });

  // Footer with larger spacing
  const footerY = sigY + 72; // jarak lebih longgar dari "Perwakilan ..."

  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(
    "Dokumen ini disahkan secara digital melalui sistem GESAMEGA.",
    105,
    footerY,
    { align: "center" },
  );

  doc.text(
    `ID Referensi: GSMG-${Date.now().toString().slice(-6)}`,
    105,
    footerY + 4,
    { align: "center" },
  );

  // Save the PDF
  doc.save(`Kontrak_Komitmen_${namaSekolah.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`);
}

// ---------- PIAGAM APRESIASI ----------
export async function generatePiagamPDF(namaSekolah: string): Promise<void> {
  // Template image
  const imgUrl = "/assets/Piagam-GESAMEGA.jpg";

  const toBase64 = (url: string): Promise<string> =>
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
        return res.blob();
      })
      .then(
        (blob) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => reject(new Error("FileReader error"));
            reader.readAsDataURL(blob);
          }),
      );

  const imgBase64 = await toBase64(imgUrl);

  // A4 landscape
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const W = 297;
  const H = 210;

  // Full-page template background
  doc.addImage(imgBase64, "JPEG", 0, 0, W, H);

  // =========================
  // SCHOOL NAME
  // =========================
  const sekolah = namaSekolah.toUpperCase();
  const words = sekolah.trim().split(/\s+/);
  const isMultiLine = words.length > 3;

  const firstLine = words.slice(0, 3).join(" ");
  const secondLine = words.slice(3).join(" ");

  doc.setFont("times", "bold");
  doc.setTextColor(31, 41, 55); // slate-800

  // Posisi hasil kalibrasi dari preview:
  // single line lebih bawah
  // multi line sedikit lebih atas
  const schoolY = isMultiLine ? H * 0.65 : H * 0.68;

  if (isMultiLine) {
    // font lebih besar agar proporsional
    doc.setFontSize(30);

    // Baris pertama
    doc.text(firstLine, W / 2, schoolY, {
      align: "center",
    });

    // Baris kedua
    doc.text(secondLine, W / 2, schoolY + 11, {
      align: "center",
    });
  } else {
    // Single line lebih besar
    doc.setFontSize(28);

    doc.text(sekolah, W / 2, schoolY, {
      align: "center",
    });
  }

  // =========================
  // DATE
  // =========================
  const today = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
  });

  doc.setFont("times", "bold");
  doc.setFontSize(10);
  doc.setTextColor(70, 70, 70);

  // Posisi hasil kalibrasi agar sesuai garis titik-titik
  doc.text(today.toUpperCase(), W * 0.5, H * 0.795, {
    align: "center",
  });

  // Save PDF
  doc.save(`Piagam_GESAMEGA_${namaSekolah.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`);
}
