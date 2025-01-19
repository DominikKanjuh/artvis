function NotFoundPage() {
  return (
    <div className="bg-latte text-espresso flex h-screen flex-col items-center justify-center text-center font-serif">
      <h1 className="text-coffee mb-4 text-4xl font-bold md:text-6xl">
        404 - Page Not Found
      </h1>
      <p className="text-espresso mb-8 text-xl md:text-2xl">
        Sorry, the page you are looking for does not exist.
      </p>
      <a href="/" className="text-coffee text-lg underline">
        Go back to the homepage
      </a>
    </div>
  );
}

export default NotFoundPage;
