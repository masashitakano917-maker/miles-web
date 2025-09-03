import React, { useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Experience = {
  id: string;
  title: string;
  location: string;
  duration: string;     // "3 hours" など
  group: string;        // "4-6 people" など
  price: string;        // "JPY 8,000" など
  image: string;        // 画像URL
};

type Props = {
  title: string;
  items: Experience[];
  onView: (exp: Experience) => void;
  onBook: (exp: Experience) => void;
  initialVisible?: number; // デフォ2。カルーセル表示時の同時表示枚数
};

export default function ExperienceCarousel({
  title,
  items,
  onView,
  onBook,
  initialVisible = 2,
}: Props) {
  const [showAll, setShowAll] = useState(false);

  // 「2枚だけ見せる」時は “窓” をスライドさせる
  const [start, setStart] = useState(0);
  const visible = useMemo(() => {
    if (items.length === 0) return [];
    const out: Experience[] = [];
    for (let i = 0; i < Math.min(initialVisible, items.length); i++) {
      out.push(items[(start + i) % items.length]);
    }
    return out;
  }, [items, start, initialVisible]);

  // スワイプ（モバイル）対応
  const touchX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) {
      // 左へスワイプ → 次へ
      if (dx < 0) next();
      else prev();
    }
    touchX.current = null;
  };

  const prev = () => setStart((s) => (s - 1 + items.length) % items.length);
  const next = () => setStart((s) => (s + 1) % items.length);

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          {items.length > initialVisible && (
            <button
              onClick={() => setShowAll((v) => !v)}
              className="text-orange-600 hover:text-orange-700 font-semibold"
            >
              {showAll ? "閉じる" : "すべて表示"}
            </button>
          )}
        </div>

        {/* すべて表示（グリッド） */}
        {showAll ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((exp) => (
              <Card key={exp.id} exp={exp} onView={onView} onBook={onBook} />
            ))}
          </div>
        ) : (
          // 2枚だけ表示（横スワイプ/左右ボタンで入れ替え）
          <div
            className="relative"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* カード2枚 */}
            <div className="grid gap-6 sm:grid-cols-2">
              {visible.map((exp) => (
                <Card key={`${exp.id}-${start}`} exp={exp} onView={onView} onBook={onBook} />
              ))}
            </div>

            {/* 左右ナビ（PC用） */}
            {items.length > initialVisible && (
              <>
                <button
                  onClick={prev}
                  className="hidden sm:flex absolute -left-3 top-1/2 -translate-y-1/2 bg-white shadow-lg border rounded-full p-2 hover:bg-gray-50"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={next}
                  className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 bg-white shadow-lg border rounded-full p-2 hover:bg-gray-50"
                  aria-label="Next"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function Card({
  exp,
  onView,
  onBook,
}: {
  exp: Experience;
  onView: (e: Experience) => void;
  onBook: (e: Experience) => void;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="relative">
        <img
          src={exp.image}
          alt={exp.title}
          className="h-56 w-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-white/90 text-gray-900 text-sm font-semibold px-3 py-1 rounded-full shadow">
          {exp.price}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {exp.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {exp.location} ・ {exp.duration} ・ {exp.group}
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => onView(exp)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            View Details
          </button>
          <button
            onClick={() => onBook(exp)}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Book Now →
          </button>
        </div>
      </div>
    </div>
  );
}
