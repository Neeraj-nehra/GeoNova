export async function getLandslideNews() {
  const API_KEY = process.env.92b46d120b3845a19566b5608dabf6ab; // Make sure this is set in Vercel env vars
  const url = `https://newsapi.org/v2/everything?q=landslide&sortBy=publishedAt&language=en&pageSize=9&apiKey=${API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`News API error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  // Map only the fields you need for your NewsArticleCard component
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
