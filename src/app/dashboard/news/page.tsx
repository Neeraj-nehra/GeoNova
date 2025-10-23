export async function getLandslideNews() {
  // Ideally, use an environment variable here, e.g. process.env.NEWS_API_KEY
  const API_KEY = "92b46d120b3845a19566b5608dabf6ab"; 
  const url = `https://newsapi.org/v2/everything?q=landslide+uttarakhand&sortBy=publishedAt&language=en&pageSize=9&apiKey=${API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`News API error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  // Return only fields needed for your NewsArticleCard component
  return {
    articles: data.articles.map(({ title, description, url, urlToImage, publishedAt, source }) => ({
      title,
      description,
      url,
      image: urlToImage,
      publishedAt,
      source: source.name,
    })),
  };
}

