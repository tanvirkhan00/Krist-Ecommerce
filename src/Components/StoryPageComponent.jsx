import React from "react";

//images 
import Image3 from "../assets/Image3.png";

const StoryPageComponents = () => {
  return (
    
    <section className="py-16 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Our Story
        </h1>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <img
              src={Image3}
              alt="Our Story"
              className="w-full rounded-lg shadow-lg object-cover"
            />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              From Passion to Purpose
            </h2>
            <p className="text-gray-600 mb-4">
              At Krist E-commerce, our journey began with a simple idea — to
              bring quality products to people who value both style and
              functionality.
            </p>
            <p className="text-gray-600 mb-4">
              What started as a small dream quickly grew into a
              customer-first brand built on trust, innovation, and relentless
              dedication to excellence.
            </p>
            <p className="text-gray-600">
              We believe in making shopping meaningful — for you, your loved
              ones, and communities around the world.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-700">
            We’re more than a store — we’re a family. Thank you for being
            part of our story.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StoryPageComponents;
