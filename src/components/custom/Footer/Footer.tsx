const Footer = () => {
  return (
    <footer className="bg-coffee text-cream py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 md:mb-0">
            <h2 className="text-center text-2xl font-bold md:text-left">
              ArtVis
            </h2>
            <p className="text-center text-sm md:text-left">Insight into Art</p>
          </div>
          <div className="text-center md:text-right">
            <p className="mb-2 text-balance text-sm">
              Made for the Information Visualization course (WS24/25) at TU Wien
            </p>
            <p className="mt-1 text-balance text-xs">
              by Dominik Kanjuh, Paul Nitzke and Georgios Papadopoulos
            </p>
          </div>
        </div>
        <div className="border-cream/20 mt-6 border-t pt-6 text-center">
          <p className="text-xs">
            &copy; 2024 ArtVis. All rights reserved by the authors.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
