const AstronomyPage = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-8">Astronomy Events</h1>
      <div className="space-y-8">
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold">Perseid Meteor Shower</h2>
          <p className="mt-2">Date: August 12-13</p>
          <p className="text-sm text-gray-400">The Perseids are a prolific meteor shower associated with the comet Swift-Tuttle.</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold">Planetary Alignment</h2>
          <p className="mt-2">Date: September 8</p>
          <p className="text-sm text-gray-400">Jupiter, Saturn, and the Moon will form a triangle in the night sky.</p>
        </div>
      </div>
    </div>
  );
};

export default AstronomyPage;
