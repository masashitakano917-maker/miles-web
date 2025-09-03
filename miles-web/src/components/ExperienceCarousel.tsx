import React, { useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Clock, Users } from "lucide-react";

export type Experience = {
  id: string;
  title: string;
  location: string;
  duration: string;     // ex: "2.5 hours"
  groupSize: string;    // ex: "6–8 people"
  price: string;        // ex: "$45" / "JPY 8,000"
  image: string;
};

type Props = {
  /** セクション見出し */
  title: string;
  /** ナビの #アンカー から飛んでくるためのID（例: "explore", "tours"）*/
  sectionId: string;
  /** 表示する体験一覧 */
  items: Experience[];
  /** 詳細を見るクリック */
  onViewDetails: (exp: Experience) => void;
  /** 今すぐ予約クリック */
  onBookNow: (exp: Experience) => void;
};

const ExperienceCarousel: React.FC<Props> = ({
  title,
  sectionId,
  items,
  onViewDetails,
  onBookNow,
}) => {
  const [showAll, setShowAll] = useState(false);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const cardClass =
    "min-w-[300px] sm:min-w-[360px] snap-start bg-white rounded-2xl shadow-md overflow-hidden";
  const gridClass =
    "grid sm:grid-cols-2 lg:grid-cols-3 gap-6";

  const scrollByCards = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.9;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  const hasMany = useMemo(() => items.length > 2, [items.length]);

  return (
    <section id={sectionId} className="py-14">
      <div className="max-w-7xl mx-auto px-4">
        {/* タイトル＆操作 */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">{title}</h2>

          <div className="flex items-center gap-2">
            {hasMany && !showAll && (
              <>
                <button
                  type="button"
                  onClick={() => scrollByCards("left")}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollByCards("right")}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {hasMany && (
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                className="ml-2 text-sm font-semibold text-orange-600 hover:text-orange-700"
              >
                {showAll ? "表示を少なくする" : "すべて表示"}
              </button>
            )}
          </div>
        </div>

        {/* 一覧 */}
        {showAll ? (
          <div className={gridClass}>
            {items.map((exp) => (
              <Card
                key={exp.id}
                exp={exp}
                onViewDetails={() => onViewDetails(exp)}
                onBookNow={() => onBookNow(exp)}
                className=""
              />
            ))}
          </div>
        ) : (
          <div
            ref={scrollerRef}
            className="
              flex gap-6 overflow-x-auto snap-x snap-mandatory
              pb-2 -mx-4 px-4
              scroll-smooth
            "
          >
            {items.map((exp) => (
              <Card
                key={exp.id}
                exp={exp}
                onViewDetails={() => onViewDetails(exp)}
                onBookNow={() => onBookNow(exp)}
                className={cardClass}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const Card: React.FC<{
  exp: Experience;
  onViewDetails: () => void;
  onBookNow: () => void;
  className?: string;
}> = ({ exp, onViewDetails, onBookNow, className }) => {
  return (
    <div className={className}>
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={exp.image}
          alt={exp.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-white/95 text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow">
          {exp.price}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-gray-900 line-clamp-2">{exp.title}</h3>

        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 mt-2">
          <span className="inline-flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {exp.location}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {exp.duration}
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="w-4 h-4" />
            {exp.groupSize}
          </span>
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={onViewDetails}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-2 rounded-lg"
          >
            View Details
          </button>
          <button
            onClick={onBookNow}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg"
          >
            Book Now →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCarousel;
