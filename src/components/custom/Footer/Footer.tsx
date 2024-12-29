const Footer = () => {
  return (
    <footer className="bg-coffee text-cream py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-center md:text-left">
              ArtVis
            </h2>
            <p className="text-sm text-center md:text-left">Insight into Art</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm mb-2 text-balance">
              Made for the Information Visualization course (WS24/25) at TU Wien
            </p>
            <p className="text-xs mt-1 text-balance">
              by Dominik Kanjuh, Paul Nitzke and Georgios Papadopoulos
            </p>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-cream/20 text-center">
          <p className="text-xs">
            &copy; 2024 ArtVis. All rights reserved by the authors.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
