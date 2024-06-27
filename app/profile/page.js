"use client";
import { useEffect, useState } from "react";
import FestivalCard from "@/components/FestivalCard";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    <section className="w-full min-h-screen bg-gray-100 dark:bg-gray-800 py-12 md:py-20 lg:py-24">
      <div className="w-full px-4 md:px-6">
        <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            User Profile
          </h2>
          <div className="mt-6 grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="johndoe" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue="johndoe@example.com"
              />
            </div>
            <Button className="w-full">Save Changes</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
