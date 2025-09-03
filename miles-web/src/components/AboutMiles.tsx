// src/components/AboutMiles.tsx
import React from "react";
import { ShieldCheck, Wallet, BadgeCheck, HeartHandshake } from "lucide-react";

const AboutMiles: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          About Miles
        </h2>

        {/* Lead copy */}
        <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-8">
          We’re just getting started. Miles connects travelers with passionate
          locals for experiences that feel human—stories shared over a walk, a
          meal, or an afternoon in someone’s neighborhood.
        </p>

        {/* What we believe */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          What we believe:
        </h3>
        <ul className="space-y-2 text-gray-800 mb-10">
          <li>• <strong>Connection:</strong> real people &gt; checklists.</li>
          <li>• <strong>Experience:</strong> slow moments beat crowded must-sees.</li>
          <li>• <strong>Memory:</strong> trips fade, shared moments stay.</li>
        </ul>

        {/* How we're starting */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          How we’re starting
        </h3>
        <p className="text-gray-800 leading-relaxed mb-10">
          Small and curated. A handful of hosts, a few cities, and a lot of care.
          We’re building with our early community and improving every week.
        </p>

        {/* Our promise */}
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Our promise</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="p-6 rounded-xl border bg-gray-50">
            <ShieldCheck className="w-6 h-6 text-orange-500 mb-2" />
            <p className="text-gray-800 font-medium">Safety first</p>
          </div>
          <div className="p-6 rounded-xl border bg-gray-50">
            <Wallet className="w-6 h-6 text-orange-500 mb-2" />
            <p className="text-gray-800 font-medium">Fair pay for hosts</p>
          </div>
          <div className="p-6 rounded-xl border bg-gray-50">
            <BadgeCheck className="w-6 h-6 text-orange-500 mb-2" />
            <p className="text-gray-800 font-medium">Transparent pricing</p>
          </div>
          <div className="p-6 rounded-xl border bg-gray-50">
            <HeartHandshake className="w-6 h-6 text-orange-500 mb-2" />
            <p className="text-gray-800 font-medium">Friendly support</p>
          </div>
        </div>

        {/* Be part of the beginning */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Be part of the beginning
        </h3>
        <p className="text-gray-800 leading-relaxed mb-6">
          Join our founding travelers or apply to host. Let’s make better trips—together.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
          >
            Join the founding travelers
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-orange-400 text-orange-600 font-semibold bg-white hover:bg-orange-50 transition"
          >
            Apply to host
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutMiles;
