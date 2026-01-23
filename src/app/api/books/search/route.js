export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) return Response.json({ books: [] });

  const [dbooksRes, gutenRes,freeComBooks] = await Promise.allSettled([
    fetch(`https://www.dbooks.org/api/search/${query}`).then(res => res.json()),
    fetch(`https://gutendex.com/books/?search=${query}`).then(res => res.json()),
    fetch(`https://ebook-scraper.vercel.app/api/books/v1/search?q=${query}`).then(res => res.json())
  ]);

  let combined = [];

  
  if (dbooksRes.status === 'fulfilled' && dbooksRes.value.books) {
    dbooksRes.value.books.forEach(b => {
      combined.push({
        slug: b.id,
        title: b.title,
        authors: b.authors,
        image: b.image,
        downloadUrl: b.url, 
        source: 'dbooks',
        type: 'PDF/Modern'
      });
    });
  }

  if (gutenRes.status === 'fulfilled' && gutenRes.value.results) {
    gutenRes.value.results.forEach(b => {
      const directDownload = b.formats["application/pdf"] || 
                             b.formats["application/epub+zip"] || 
                             b.formats["text/html"];

      combined.push({
        slug: b.id,
        title: b.title,
        authors: b.authors.map(a => a.name).join(", "),
        image: b.formats["image/jpeg"],
        downloadUrl: directDownload, // Link langsung ke file
        source: 'gutenberg',
        type: directDownload?.includes('.pdf') ? 'PDF' : 'EPUB'
      });
    });
  }

    if(freeComBooks.status === 'fulfilled' && freeComBooks.value){
      freeComBooks.value.forEach(b => {
        combined.push({
          slug: b.slug,
          title: b.title,
          authors: null,
          image: b.image,
          downloadUrl: b.url, 
          source: 'freeCom',
          type: 'PDF/Modern'
        });
      });
    }
  return Response.json({ books: combined });
}