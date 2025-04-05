import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Title from '@/components/Title';

const Videos = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Title title="Videos" />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Videos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example Video 1 */}
          <div className="shadow-lg rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">Example Video 1</h3>
              <p className="text-gray-600">Description of the video goes here.</p>
            </div>
          </div>

          {/* Example Video 2 */}
          <div className="shadow-lg rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">Example Video 2</h3>
              <p className="text-gray-600">Description of the video goes here.</p>
            </div>
          </div>

          {/* Example Video 3 */}
          <div className="shadow-lg rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">Example Video 3</h3>
              <p className="text-gray-600">Description of the video goes here.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Videos;
