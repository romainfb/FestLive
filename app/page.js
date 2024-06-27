"use client";
import { useEffect, useState } from "react";
import FestivalCard from "@/components/FestivalCard";

export default function Home() {
  const [festivals, setFestivals] = useState([]);

  useEffect(() => {
    getFestivals().then((festivals) => {
      setFestivals(festivals.data);
    });
  }, []);

  async function getFestivals(limit, offset, category_id, search) {
    const response = await fetch("/api/v1/festivals");
    return await response.json();
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="w-full min-h-screen bg-gray-100 dark:bg-gray-800">
        <div className="w-full px-4 md:px-6 py-12 md:py-20 lg:py-24">
          <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
              Discover the Best Festivals
            </h1>
            <p className="max-w-3xl text-lg md:text-xl text-gray-600 dark:text-gray-400">
              Explore our curated list of the top-rated festivals happening
              around the world.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-10 md:mt-12 lg:mt-16">
            {festivals.map((festival) => (
              <FestivalCard key={festival.id} festival={festival} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
