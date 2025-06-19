const InfoSection = () => {
  const features = [
    {
      icon: "🔗",
      title: "Quick Save",
      description:
        "Easily save links from anywhere with our browser extension. Keep useful content just a click away.",
    },
    {
      icon: "🔍",
      title: "Powerful Search",
      description:
        "Find saved links quickly by searching through titles, content, and your own tags.",
    },
    {
      icon: "📱",
      title: "Sync Across Devices",
      description:
        "Access your saved links from desktop or mobile — your data stays with you wherever you go.",
    },
    {
      icon: "🎨",
      title: "Simple Organization",
      description:
        "Group links into collections and use tags to stay organized with a clean, visual interface.",
    },
    {
      icon: "🔒",
      title: "Privacy First",
      description:
        "Your data stays private. Everything is encrypted and we don’t share anything with third parties.",
    },
    {
      icon: "⚡",
      title: "Fast & Responsive",
      description:
        "Designed for speed with a lightweight interface that keeps things smooth and responsive.",
    },
  ];

  const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "2M+", label: "Links Saved" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" },
  ];

  return (
    <div className="min-h-screen   text-gray-800 dark:text-gray-200">
      <div className="max-w-7xl mx-auto px-5 py-20">
        {/* Main Info Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-gray-900 dark:text-white">
            Why Choose{" "}
            <span className="text-green-600 dark:text-green-500 font-bold">
              linkly.io
            </span>
            ?
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Experience the future of link management with our powerful,
            intuitive platform designed for creators, professionals, and teams
            who value organization and efficiency.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-2xl p-8 transition-all duration-300 hover:transform hover:-translate-y-2 hover:border-green-500/30 hover:bg-gray-50 dark:hover:bg-white/10 overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-2xl mb-6 mx-auto text-white">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold mb-4 text-center text-gray-900 dark:text-white">
                {feature.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20 bg-gray-100 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-3xl p-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-600 dark:text-green-500 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-700 dark:text-gray-400 uppercase tracking-wider text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
