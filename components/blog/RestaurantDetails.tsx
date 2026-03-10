import RatingStars from "@/components/ui/RatingStars";

interface RestaurantInfo {
  name: string;
  neighborhood?: string;
  address?: string;
  website?: string;
  priceRange?: string;
  rating?: number;
  cuisine?: string;
  instagramHandle?: string;
  googleMapsUrl?: string;
}

export default function RestaurantDetails({
  info,
}: {
  info: RestaurantInfo;
}) {
  return (
    <div className="bg-bubblegum/5 rounded-2xl p-6 mb-8">
      <h3 className="font-heading text-xl mb-1">{info.name}</h3>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        {info.cuisine && (
          <span className="text-sm text-evergreen/60">{info.cuisine}</span>
        )}
        {info.priceRange && (
          <span className="text-sm font-semibold text-emerald">
            {info.priceRange}
          </span>
        )}
        {info.rating != null && <RatingStars rating={info.rating} />}
      </div>

      <div className="space-y-1 text-sm text-evergreen/70">
        {info.neighborhood && <p>{info.neighborhood}</p>}
        {info.address && <p>{info.address}</p>}
      </div>

      <div className="flex flex-wrap gap-4 mt-4 text-sm">
        {info.googleMapsUrl && (
          <a
            href={info.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald hover:text-emerald/80 font-medium"
          >
            View on Maps
          </a>
        )}
        {info.website && (
          <a
            href={info.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald hover:text-emerald/80 font-medium"
          >
            Website
          </a>
        )}
        {info.instagramHandle && (
          <a
            href={`https://instagram.com/${info.instagramHandle.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald hover:text-emerald/80 font-medium"
          >
            {info.instagramHandle}
          </a>
        )}
      </div>
    </div>
  );
}
