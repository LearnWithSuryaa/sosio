"use client";

import { Share2, Mail, MessageCircle, Link as LinkIcon } from "lucide-react";

export default function ShareButtons({ title }: { title: string }) {
  const handleShare = async (platform: string) => {
    const url = window.location.href;
    switch(platform) {
      case 'share':
        if (navigator.share) {
          navigator.share({ title, url }).catch(console.error);
        } else {
          navigator.clipboard.writeText(url);
          alert("Link disalin ke clipboard!");
        }
        break;
      case 'mail':
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
        break;
      case 'wa':
        window.open(`https://wa.me/?text=${encodeURIComponent(title + " " + url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert("Link disalin ke clipboard!");
        break;
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button onClick={() => handleShare('share')} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors">
        <Share2 className="w-4 h-4" />
      </button>
      <button onClick={() => handleShare('mail')} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors">
        <Mail className="w-4 h-4" />
      </button>
      <button onClick={() => handleShare('wa')} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors">
        <MessageCircle className="w-4 h-4" />
      </button>
      <button onClick={() => handleShare('copy')} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors">
        <LinkIcon className="w-4 h-4" />
      </button>
    </div>
  );
}
