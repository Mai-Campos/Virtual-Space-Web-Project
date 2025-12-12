function Footer() {
  return (
    <footer className="w-full border-t border-solid border-white/10">
      <div className="px-4 sm:px-10 md:px-20 lg:px-40">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 text-white/80">
          <p className="text-sm">
            {" "}
            &copy; 2026 Digital Space. Todos los derechos reservados.
          </p>
          <p className="text-sm">
            {" "}
            Desarrollado por <strong>Maikol Campos</strong>.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
