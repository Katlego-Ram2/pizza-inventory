import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF3E0] via-[#FFE0B2] to-[#FFCC80] dark:from-black dark:via-zinc-900 dark:to-zinc-800 px-6 py-16">

      <main className="max-w-4xl w-full bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-white/40 dark:border-white/10">

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold tracking-tight text-black dark:text-white drop-shadow-sm">
            🍕 <span className="bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent">Pizza Inventory</span>
          </h1>

          <p className="mt-4 text-lg text-zinc-700 dark:text-zinc-300 max-w-xl mx-auto leading-relaxed">
            A modern inventory tool built to help pizza shops track stock, prevent shortages,
            and manage items effortlessly.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 gap-8 mb-14">
          {[
            {
              title: "📦 Real-Time Inventory",
              text: "Monitor all ingredients live with smart stock visibility.",
            },
            {
              title: "➕ Add / Edit Items",
              text: "Easily add new items, update quantities, or adjust stock.",
            },
            {
              title: "⚠️ Low Stock Alerts",
              text: "Get warnings when items drop below reorder levels.",
            },
            {
              title: "🧾 Audit History",
              text: "Track every stock change with timestamps and users.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="bg-white/60 dark:bg-white/5 backdrop-blur-xl p-6 rounded-2xl shadow-md border border-white/40 dark:border-white/10 hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold text-orange-700 dark:text-orange-300 mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {f.text}
              </p>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <Link
            href="/sign-in"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-600 to-yellow-500 hover:opacity-90 text-white font-semibold text-lg shadow-lg transition"
          >
            Sign In
          </Link>

          <Link
            href="/sign-up"
            className="px-8 py-4 rounded-full border-2 border-orange-600 text-orange-700 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-white/10 font-semibold text-lg transition"
          >
            Create Account
          </Link>
        </div>

        <p className="text-center mt-10 text-sm text-zinc-600 dark:text-zinc-400">
          Crafted with ❤️ by <span className="font-semibold">Katlego Rampedi</span>
        </p>
      </main>
    </div>
  );
}
