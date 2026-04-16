import jsPDF from "jspdf";

export function generateKomitmenPDF(namaSekolah: string, penanggungJawab: string, signatureDataUrl: string) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  // Background and Header
  doc.setFillColor(11, 60, 93); // kominfo-navy
  doc.rect(0, 0, 210, 30, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("PROGRAM EKOSISTEM DIGITAL 2026", 105, 18, { align: "center" });

  // Title
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(22);
  doc.text("KONTRAK KOMITMEN BERSAMA", 105, 50, { align: "center" });
  
  // Body text
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(`Dengan ini, kami mewakili entitas satuan pendidikan:`, 20, 70);
  
  doc.setFont("helvetica", "bold");
  doc.text(`Nama Sekolah: ${namaSekolah}`, 20, 80);
  doc.text(`Penanggung Jawab: ${penanggungJawab}`, 20, 88);

  doc.setFont("helvetica", "normal");
  doc.text(`Menyatakan komitmen teguh untuk berpartisipasi dalam menjaga dan`, 20, 105);
  doc.text(`mengawasi integritas penggunaan gadget di lingkungan belajar dengan:`, 20, 112);

  // 5 Points
  doc.setFontSize(11);
  const points = [
    "1. Memastikan perangkat digital digunakan khusus untuk menunjang pendidikan.",
    "2. Menetapkan aturan tegas batasan waktu akses gawai di area sekolah.",
    "3. Mensosialisasikan bahaya cyberbullying & dampaknya pada kesehatan mental siswa.",
    "4. Memberikan ruang diskusi terbuka bagi siswa terkait literasi dan etika digital.",
    "5. Menghubungkan orang tua agar turut memantau pemakaian alat elektronik di rumah."
  ];

  let initialY = 125;
  points.forEach((pt) => {
    doc.text(pt, 20, initialY);
    initialY += 8; // spacing
  });

  // Footer & Signature
  doc.setFontSize(10);
  const today = new Date().toLocaleDateString("id-ID", { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(`Ditandatangani secara elektronik pada ${today}`, 105, 190, { align: "center" });
  
  // Embed Signature
  if (signatureDataUrl) {
    doc.addImage(signatureDataUrl, "PNG", 75, 200, 60, 30);
  }
  
  doc.setFont("helvetica", "bold");
  doc.text(`${penanggungJawab}`, 105, 235, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.text(`Perwakilan ${namaSekolah}`, 105, 240, { align: "center" });

  // Border (Optional decoration)
  doc.setDrawColor(30, 136, 229);
  doc.setLineWidth(1);
  doc.rect(10, 10, 190, 277);

  // Save the PDF
  doc.save(`Komitmen_Digital_${namaSekolah.replace(/\s+/g, '_')}.pdf`);
}
