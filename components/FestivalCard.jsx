import StarIcon from "@/components/icons/StarIcon";
import Link from "next/link";

export default function FestivalCard({ festival }) {
  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg overflow-hidden">
      <img
        src="/placeholder.svg"
        alt="Festival 1"
        width={300}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 md:p-6">
        <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-50">
          {festival.name}
        </h3>
        <div className="flex items-center space-x-2 mt-2">
          <StarIcon className="w-5 h-5 text-yellow-500" />
          <StarIcon className="w-5 h-5 text-yellow-500" />
          <StarIcon className="w-5 h-5 text-yellow-500" />
          <StarIcon className="w-5 h-5 text-yellow-500" />
          <StarIcon className="w-5 h-5 text-gray-400 dark:text-gray-600" />
          <span className="text-gray-600 dark:text-gray-400 text-sm">4.5</span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
          {festival.category.name}
        </p>
        <p className="text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
          {festival.city}
        </p>
        <div className="mt-4">
          <Link
            href={`/festival/${festival.id}`}
            className="inline-flex items-center justify-center px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-300 dark:focus:ring-offset-gray-950"
            prefetch={false}
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
