import React from "react";
import {
  ShieldCheck,
  HandCoins,
  BadgeCheck,
  Smile,
} from "lucide-react";

const AboutMiles = () => {
  const scrollToExperiences = () => {
    const el = document.getElementById("experiences");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

    return (
    <section id="about" className="py-20 bg-gradient-to-r from-blue-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About <span className="text-orange-500">Miles</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We’re just getting started. Miles connects travelers with passionate locals
            for experiences that feel human—stories shared over a walk, a meal,
            or an afternoon in someone’s neighborhood.
          </p>
        </div>

        {/* Two-column: copy + image */}
        <div className="grid md:grid-cols-2 gap-10 items-start mb-12">
          {/* Copy block */}
          <div className="bg-white/70 backdrop-blur rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              What we believe
            </h3>
            <ul className="space-y-3 text-slate-700">
              <li>
                <span className="font-semibold">Connection:</span>{" "}
                real people &gt; checklists.
              </li>
              <li>
                <span className="font-semibold">Experience:</span>{" "}
                slow moments beat crowded must-sees.
              </li>
              <li>
                <span className="font-semibold">Memory:</span>{" "}
                trips fade, shared moments stay.
              </li>
            </ul>

            <h3 className="mt-8 text-xl font-semibold text-slate-900 mb-2">
              How we’re starting
            </h3>
            <p className="text-slate-700">
              Small and curated. A handful of hosts, a few cities, and a lot of care.
              We’re building with our early community and improving every week.
            </p>
          </div>

          {/* Visual */}
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Locals and travelers sharing a moment"
              className="rounded-2xl shadow-2xl w-full h-96 object-cover"
            />
            <div className="absolute -z-10 -bottom-6 -left-6 w-40 h-40 bg-orange-100 rounded-3xl blur-2xl opacity-70"></div>
          </div>
        </div>

        {/* Promise cards */}
        <h3 className="text-xl font-semibold text-slate-900 mb-4">
          Our promise
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5 text-orange-600" />
            </div>
            <p className="font-medium text-slate-900">Safety first</p>
            <p className="text-sm text-slate-600 mt-1">
              Clear guidelines and trusted hosts.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center mb-3">
              <HandCoins className="w-5 h-5 text-orange-600" />
            </div>
            <p className="font-medium text-slate-900">Fair pay for hosts</p>
            <p className="text-sm text-slate-600 mt-1">
              Earnings that value time and care.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center mb-3">
              <BadgeCheck className="w-5 h-5 text-orange-600" />
            </div>
            <p className="font-medium text-slate-900">Transparent pricing</p>
            <p className="text-sm text-slate-600 mt-1">
              No hidden fees, no surprises.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center mb-3">
              <Smile className="w-5 h-5 text-orange-600" />
            </div>
            <p className="font-medium text-slate-900">Friendly support</p>
            <p className="text-sm text-slate-600 mt-1">
              Real help from real people.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToExperiences}
            className="px-6 py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
          >
            Explore experiences
          </button>
          <a
            href="#contact"
            className="px-6 py-3 rounded-xl border border-slate-300 text-slate-800 font-semibold hover:bg-slate-50 transition"
          >
            Apply to host
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutMiles;
