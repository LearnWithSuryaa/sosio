"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Lightbulb, RotateCcw, ArrowRight } from "lucide-react";

const QUESTIONS = [
  {
    id: 1,
    text: "Saat ada notifikasi masuk saat belajar/bekerja, apa yang Anda lakukan?",
    options: [
      { text: "Langsung buka seketika, apapun itu.", score: 0 },
      { text: "Cek sekilas, kalau penting dibalas, kalau tidak nanti.", score: 1 },
      { text: "Abaikan sampai jam istirahat.", score: 2 }
    ]
  },
  {
    id: 2,
    text: "Hal terakhir yang Anda lakukan sebelum tidur?",
    options: [
      { text: "Scroll medsos/nonton video sampai tertidur.", score: 0 },
      { text: "Main HP sebentar lalu dicas jauh dari kasur.", score: 1 },
      { text: "Membaca buku atau ngobrol, tidak pakai HP sama sekali.", score: 2 }
    ]
  },
  {
    id: 3,
    text: "Pernahkah Anda merasa cemas saat HP Anda tertinggal di rumah?",
    options: [
      { text: "Sangat cemas, seperti kehilangan organ tubuh.", score: 0 },
      { text: "Sedikit cemas jika ada yang penting, tapi masih bisa ditolerir.", score: 1 },
      { text: "Biasa saja, sekalian detox layar.", score: 2 }
    ]
  },
  {
    id: 4,
    text: "Berapa jam Anda menghabiskan waktu di aplikasi non-produktif sehari?",
    options: [
      { text: "Lebih dari 5 jam.", score: 0 },
      { text: "Sekitar 2 - 4 jam.", score: 1 },
      { text: "Kurang dari 2 jam.", score: 2 }
    ]
  },
  {
    id: 5,
    text: "Pernahkah Anda menunda tugas penting hanya untuk bermain game/medsos?",
    options: [
      { text: "Sering sekali, ini masalah besar saya.", score: 0 },
      { text: "Kadang-kadang, tapi akhirnya tugas selesai juga.", score: 1 },
      { text: "Hampir tidak pernah, prioritas tetap dijaga.", score: 2 }
    ]
  }
];

export default function KuisPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<{ category: string; advice: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    if (newAnswers.length < QUESTIONS.length) {
      setAnswers(newAnswers);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishQuiz(newAnswers);
    }
  };

  const finishQuiz = async (finalAnswers: number[]) => {
    setAnswers(finalAnswers);
    setLoading(true);

    const totalScore = finalAnswers.reduce((a, b) => a + b, 0);
    
    let category = "";
    let advice = "";

    if (totalScore <= 3) {
      category = "Fase Waspada (Addicted)";
      advice = "Anda sering kehilangan kontrol atas waktu screen-time. Mulailah berlatih dengan mode 'Do Not Disturb' atau batasi aplikasi hiburan dengan timer di HP Anda.";
    } else if (totalScore <= 7) {
      category = "Sadar Namun Tergoda";
      advice = "Secara umum Anda tahu porsinya, namun masih sering goyah. Cobalah untuk menjauhkan HP saat jam belajar agar fokus tidak mudah buyar.";
    } else {
      category = "Disiplin & Terkendali";
      advice = "Luar biasa! Anda memiliki kontrol kuat terhadap dorongan digital. Pertahankan kebiasaan ini dan jadilah contoh bagi teman-teman di sekitar.";
    }

    setResult({ category, advice });

    try {
      await supabase.from("quiz_results").insert({
        answers: finalAnswers,
        result_category: category,
      });
    } catch (e) {
      console.warn("Could not save to DB, but showing local result", e);
    } finally {
      setLoading(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <div className="inline-flex p-3 rounded-2xl bg-blue-50 text-kominfo-blue mb-4">
          <Lightbulb className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-kominfo-navy mb-4">Refleksi Diri: Kebiasaan Gadget</h1>
        <p className="text-gray-600">
          Kenali seberapa besar pengaruh smartphone terhadap diri Anda. Kuis ini bukan tes, melainkan sarana evaluasi mandiri.
        </p>
      </div>

      <Card className="p-8">
        {result ? (
          <div className="text-center py-6">
            <h2 className="text-xl font-bold text-gray-500 mb-2">Hasil Evaluasi Profil Anda:</h2>
            <div className="text-4xl font-extrabold text-kominfo-blue mb-6 py-4 px-6 bg-blue-50 rounded-2xl inline-block">
              {result.category}
            </div>
            
            <p className="text-lg text-gray-700 max-w-lg mx-auto mb-10 leading-relaxed">
              &quot;{result.advice}&quot;
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <Button onClick={resetQuiz} variant="outline" className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4" /> Ulangi Refleksi
              </Button>
              <Button onClick={() => window.location.href='/survei'} className="flex items-center gap-2">
                Evaluasi Sekolah Anda di Peta
              </Button>
            </div>
          </div>
        ) : loading ? (
          <div className="py-20 text-center text-gray-500 animate-pulse font-medium text-lg">
            Menganalisis jawaban Anda...
          </div>
        ) : (
          <div>
            <div className="mb-8 flex items-center justify-between">
              <span className="text-sm font-bold text-kominfo-navy bg-blue-50 px-3 py-1 rounded-full">
                Pertanyaan {currentQuestion + 1} dari {QUESTIONS.length}
              </span>
              <div className="w-1/2 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-kominfo-blue h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion) / QUESTIONS.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-8 leading-snug">
              {QUESTIONS[currentQuestion].text}
            </h2>

            <div className="space-y-4">
              {QUESTIONS[currentQuestion].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(opt.score)}
                  className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-kominfo-blue hover:bg-blue-50 transition-colors flex justify-between items-center group"
                >
                  <span className="text-gray-700 font-medium">{opt.text}</span>
                  <ArrowRight className="w-5 h-5 text-kominfo-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
