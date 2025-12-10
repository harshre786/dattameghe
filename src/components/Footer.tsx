const Footer = () => {
  return (
    <footer className="bg-transparent text-white p-4 mt-8">
      <div className="container mx-auto text-center text-sm">
        <p>&copy; {new Date().getFullYear()} AstroVision. All rights reserved.</p>
        <p className="mt-2">Data sourced from NASA, ESA, SpaceX, NOAA, and other public APIs.</p>
        <p>This project is for educational purposes only.</p>
      </div>
    </footer>
  );
};

export default Footer;
