"use client";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StarIcon from "@/components/icons/StarIcon";
import { useParams } from "next/navigation";
import { FestivalDetailSkeleton } from "@/components/SkeletonFestivalDetail";

export default function FestivalDetail() {
  const [festival, setFestival] = useState(null);
  const [loading, setLoading] = useState(true);
  const [randomImage, setRandomImage] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    setRandomImage(randomIntFromInterval());
  }, []);

  function randomIntFromInterval(min, max) {
    min = 1;
    max = 9;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  useEffect(() => {
    getFestival().then((festival) => {
      setFestival(festival.data);
      if (festival.data) {
        setLoading(false);
      }
    });
  }, []);

  async function getFestival() {
    const response = await fetch(`/api/v1/festivals/${id}`);
    return await response.json();
  }

  if (loading) {
    return <FestivalDetailSkeleton />;
  }

  return (
    <section className="w-full min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="w-full px-4 md:px-6 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={`/images/image${randomImage}.webp`}
              alt="Festival Image"
              width={600}
              height={400}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50">
                {festival.name}
              </h1>
              <div className="flex items-center space-x-2 mt-2">
                <StarIcon className="w-5 h-5 text-yellow-500" />
                <StarIcon className="w-5 h-5 text-yellow-500" />
                <StarIcon className="w-5 h-5 text-yellow-500" />
                <StarIcon className="w-5 h-5 text-yellow-500" />
                <StarIcon className="w-5 h-5 text-gray-400 dark:text-gray-600" />
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  4.5
                </span>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
                {festival.city}, {festival.country}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Coachella is an annual music and arts festival held in Indio,
                California. It is one of the most popular and well-known
                festivals in the world, featuring a diverse lineup of musical
                acts, art installations, and more.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
                Category
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {festival.category?.name}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
                Subcategory
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {festival.subcategory?.name}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12 md:mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            Reviews
          </h2>
          <div className="grid gap-6 mt-6">
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-4 md:p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                    John Doe
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <StarIcon className="w-5 h-5 text-yellow-500" />
                    <StarIcon className="w-5 h-5 text-yellow-500" />
                    <StarIcon className="w-5 h-5 text-yellow-500" />
                    <StarIcon className="w-5 h-5 text-yellow-500" />
                    <StarIcon className="w-5 h-5 text-gray-400 dark:text-gray-600" />
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      4.5
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                Coachella is an amazing festival! The lineup is always top-notch
                and the atmosphere is electric. Definitely a must-attend event
                for any music lover.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-4 md:p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                    Jane Smith
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <StarIcon className="w-5 h-5 text-yellow-500" />
                    <StarIcon className="w-5 h-5 text-yellow-500" />
                    <StarIcon className="w-5 h-5 text-yellow-500" />
                    <StarIcon className="w-5 h-5 text-yellow-500" />
                    <StarIcon className="w-5 h-5 text-yellow-500" />
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      5.0
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                I've been to Coachella multiple times and it just keeps getting
                better. The production value is incredible, and the variety of
                music and art is truly unparalleled.
              </p>
            </div>
          </div>
          <div className="mt-8 bg-white dark:bg-gray-950 rounded-lg shadow-lg p-4 md:p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
              Leave a Review
            </h3>
            <form className="mt-4 grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="rating">Rating</Label>
                <Select id="rating" defaultValue="4">
                  <SelectTrigger>
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 star</SelectItem>
                    <SelectItem value="2">2 stars</SelectItem>
                    <SelectItem value="3">3 stars</SelectItem>
                    <SelectItem value="4">4 stars</SelectItem>
                    <SelectItem value="5">5 stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="comment">Comment</Label>
                <Textarea id="comment" placeholder="Share your thoughts..." />
              </div>
              <Button type="submit">Submit Review</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
