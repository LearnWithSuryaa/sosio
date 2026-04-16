export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-kominfo-navy font-semibold">
              Program Ekosistem Digital 2026
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Mendorong Pemanfaatan Gadget untuk Pendidikan Berkualitas.
            </p>
          </div>
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} Hak Cipta Dilindungi.
          </div>
        </div>
      </div>
    </footer>
  );
}
