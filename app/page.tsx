"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";

const categories = ["science", "sports", "technology", "health", "business", "entertainment"];

// Static Articles
const articlesData = {
  science: [
    { title: "Science Breakthrough 1", description: "Custom science news image", url: "#", urlToImage: "https://jmss.vic.edu.au/wp-content/uploads/2021/02/unnamed.jpg" },
    { title: "Science Breakthrough 2", description: "Custom science news image", url: "#", urlToImage: "http://www.climate.rocksea.org/images/climate/sst_rainfall_hindu_news_june2014.jpg" },
  ],
  sports: [
    { title: "Harikrishna & Arjun Erigaisi Shine", description: "Chess stars in action", url: "#", urlToImage: "https://static.toiimg.com/thumb/msid-125611160,imgsize-83282,width-400,resizemode-4/pentala-harikrishna-arjun-erigaisi-r-praggnanandhaa-and-vidit-gujrathi.jpg" },
  ],
  technology: [
    { title: "Technology Article", description: "Custom technology image", url: "#", urlToImage: "https://tse2.mm.bing.net/th/id/OIP.vGwxqYwobiOFnsB4SzeIpQHaJo?pid=Api&P=0&h=180" },
  ],
  health: [
    { title: "Health Article", description: "Custom health image", url: "#", urlToImage: "https://i.pinimg.com/originals/94/89/a7/9489a7d37d411058a367387a148eeadb.jpg" },
  ],
  business: [
    { title: "Business Article", description: "Custom business image", url: "#", urlToImage: "https://innovation.media/wp-content/uploads/2016/10/Screen-Shot-2016-10-23-at-8.16.00-PM.png" },
  ],
  entertainment: [
    { title: "Entertainment Article", description: "Custom entertainment image", url: "#", urlToImage: "https://tse2.mm.bing.net/th/id/OIP.YyjSx5zfHDjZCYpPZF36wwAAAA?pid=Api&P=0&h=180" },
  ],
};

// SEO Component
const SEO = ({ title, description, image, url }) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    {image && <meta property="og:image" content={image} />}
    <meta property="og:url" content={url || "https://yournewsapp.com"} />
    <meta name="twitter:card" content={image ? "summary_large_image" : "summary"} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    {image && <meta name="twitter:image" content={image} />}
  </Head>
);

// JSON-LD Structured Data
const ArticleStructuredData = ({ article }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: article.title,
        image: [article.urlToImage],
        datePublished: new Date().toISOString(),
        author: { "@type": "Person", name: "NewsApp" },
        publisher: {
          "@type": "Organization",
          name: "NewsApp",
          logo: { "@type": "ImageObject", url: "https://yournewsapp.com/logo.png" },
        },
        description: article.description,
      }),
    }}
  />
);

// News Card
const NewsCard = ({ article, toggleBookmark, isBookmarked }) => (
  <div className="relative flex flex-col gap-3 cursor-pointer bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition p-2 rounded shadow">
    <div className="absolute top-2 right-2 z-10">
      <button onClick={(e) => { e.stopPropagation(); toggleBookmark(article); }} className="text-xl">
        {isBookmarked ? "⭐" : "✰"}
      </button>
    </div>
    <div className="relative w-full h-40 rounded overflow-hidden">
      <Image src={article.urlToImage} alt={article.title} fill className="object-cover" unoptimized />
    </div>
    <h2 className="text-lg sm:text-xl font-bold leading-tight line-clamp-2 hover:text-red-700 dark:text-white">{article.title}</h2>
    <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base line-clamp-3">{article.description}</p>
  </div>
);

// Main Page
const Page = () => {
  const [category, setCategory] = useState("science");
  const [news, setNews] = useState([]);
  const [trending, setTrending] = useState([]);
  const [dark, setDark] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    setNews(articlesData[category]);
    const trendingArticles = Object.values(articlesData).flat().slice(0, 3);
    setTrending(trendingArticles);
  }, [category]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => setNews([...articlesData[category]]), 30000);
    return () => clearInterval(interval);
  }, [autoRefresh, category]);

  const toggleBookmark = (article) => {
    const exists = bookmarks.find(b => b.title === article.title);
    if (exists) setBookmarks(bookmarks.filter(b => b.title !== article.title));
    else setBookmarks([...bookmarks, article]);
  };

  return (
    <div className={`${dark ? "dark" : ""} min-h-screen`}>
      {/* SEO for homepage */}
      <SEO
        title="News App — Latest Updates from India"
        description="Stay updated with the latest news in science, sports, technology, health, business, and entertainment from India."
      />

      {/* Header */}
      <header className="bg-red-700 text-white p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold">NEWS APP 🇮🇳</h1>
        <div className="flex flex-wrap gap-2 sm:gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 rounded font-semibold text-sm sm:text-base ${category === cat ? "bg-white text-red-700" : "bg-gray-200 text-black"}`}
            >
              {cat}
            </button>
          ))}
          <button onClick={() => setDark(!dark)} className="px-3 py-1 rounded font-semibold bg-gray-200 dark:bg-gray-700 text-black dark:text-white">
            {dark ? "Light Mode" : "Dark Mode"}
          </button>
          <button onClick={() => setAutoRefresh(!autoRefresh)} className={`px-3 py-1 rounded font-semibold ${autoRefresh ? "bg-green-500 text-white" : "bg-gray-200 text-black"}`}>
            🔄 Auto Refresh
          </button>
          <button onClick={() => setCategory("bookmarks")} className="px-3 py-1 rounded font-semibold bg-yellow-400 text-black">
            ⭐ Bookmarks ({bookmarks.length})
          </button>
        </div>
      </header>

      {/* Trending */}
      <section className="bg-black text-white p-4 overflow-x-auto whitespace-nowrap flex gap-4 mb-6">
        {trending.map((t, i) => (
          <span key={i} className="flex-none px-3 py-1 bg-red-600 rounded text-sm sm:text-base">{t.title}</span>
        ))}
      </section>

      {/* News Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {(category === "bookmarks" ? bookmarks : news).map((article, idx) => (
          <div key={idx} onClick={() => setSelectedArticle(article)}>
            <NewsCard
              article={article}
              toggleBookmark={toggleBookmark}
              isBookmarked={bookmarks.some(b => b.title === article.title)}
            />
          </div>
        ))}
      </main>

      {/* Article Popup */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded w-full max-w-3xl overflow-y-auto max-h-[90vh]">
            {/* SEO for selected article */}
            <SEO
              title={selectedArticle.title}
              description={selectedArticle.description}
              image={selectedArticle.urlToImage}
              url={selectedArticle.url}
            />
            <ArticleStructuredData article={selectedArticle} />
            <button className="float-right text-xl" onClick={() => setSelectedArticle(null)}>✖</button>
            <h2 className="text-3xl font-bold mb-3 dark:text-white">{selectedArticle.title}</h2>
            {selectedArticle.urlToImage && (
              <Image src={selectedArticle.urlToImage} width={900} height={500} className="rounded mb-4" alt="" unoptimized />
            )}
            <p className="text-lg leading-relaxed dark:text-gray-300 mb-3">{selectedArticle.description}</p>
            <div className="flex gap-4 my-4">
              <a className="px-4 py-2 bg-green-600 text-white rounded" target="_blank" href={`https://wa.me/?text=${selectedArticle.url}`}>Share on WhatsApp</a>
              <a className="px-4 py-2 bg-blue-500 text-white rounded" target="_blank" href={`https://twitter.com/intent/tweet?text=${selectedArticle.url}`}>Share on Twitter</a>
            </div>
            <a href={selectedArticle.url} target="_blank" className="px-4 py-2 bg-red-700 text-white rounded">Open Original Source</a>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center py-6 bg-white dark:bg-gray-900 shadow-inner text-gray-600 dark:text-gray-300 font-semibold">
        © 2025 NewsApp | Built with ❤️ in India 🇮🇳
      </footer>
    </div>
  );
};

export default Page;
