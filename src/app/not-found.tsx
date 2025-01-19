function NotFoundPage() {
  return (
    <div className="h-screen bg-latte text-espresso font-serif flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-coffee mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-xl md:text-2xl text-espresso mb-8">
        Sorry, the page you are looking for does not exist.
      </p>
      <a href="/" className="text-lg text-coffee underline">
        Go back to the homepage
      </a>
    </div>
  );
}

export default NotFoundPage;
