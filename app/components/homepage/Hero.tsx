export default function Hero() {
  return (
    <div className="flex flex-col items-center z-10 text-center px-4 mt-16 w-full">
      <h1 className="text-pretty text-5xl font-extrabold text-primary mb-6 md:mb-8">
        Discover and Share Your Creative Portfolio
      </h1>

      <p className="text-pretty text-xl text-muted-foreground mb-10 max-w-3xl">
        PortfolioShare is a platform that allows you to showcase your work, receive valuable feedback, and connect with a
        vibrant community of creatives. Its a space to grow, learn, and share ideas with like-minded individuals and take your
        creative journey to the next level.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 text-white">
        <div className="bg-secondary p-6 rounded-lg shadow-xl text-center">
          <h3 className="text-4xl font-semibold">100+</h3>
          <p className="mt-2">Creators Sharing Work</p>
        </div>
        <div className="bg-secondary p-6 rounded-lg shadow-xl text-center">
          <h3 className="text-4xl font-semibold">500+</h3>
          <p className="mt-2">Feedbacks Given</p>
        </div>
        <div className="bg-secondary p-6 rounded-lg shadow-xl text-center">
          <h3 className="text-4xl font-semibold">50+</h3>
          <p className="mt-2">Creative Projects</p>
        </div>
      </div>
    </div>
  );
}
