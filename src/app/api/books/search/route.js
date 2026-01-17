export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) return Response.json({ books: [] });

  const [dbooksRes, gutenRes] = await Promise.allSettled([
    fetch(`https://www.dbooks.org/api/search/${query}`).then(res => res.json()),
    fetch(`https://gutendex.com/books/?search=${query}`).then(res => res.json())
  ]);

  let combined = [];

  // 1. Proses dbooks (Buku IT/Modern)
  if (dbooksRes.status === 'fulfilled' && dbooksRes.value.books) {
    dbooksRes.value.books.forEach(b => {
      combined.push({
        id: b.id,
        title: b.title,
        authors: b.authors,
        image: b.image,
        downloadUrl: b.url, 
        source: 'dbooks',
        type: 'PDF/Modern'
      });
    });
  }

  // 2. Proses Gutendex (Buku Klasik/Public Domain)
  if (gutenRes.status === 'fulfilled' && gutenRes.value.results) {
    gutenRes.value.results.forEach(b => {
      // Cari format file yang tersedia (prioritaskan PDF, lalu EPUB)
      const directDownload = b.formats["application/pdf"] || 
                             b.formats["application/epub+zip"] || 
                             b.formats["text/html"];

      combined.push({
        id: b.id,
        title: b.title,
        authors: b.authors.map(a => a.name).join(", "),
        image: b.formats["image/jpeg"],
        downloadUrl: directDownload, // Link langsung ke file
        source: 'gutenberg',
        type: directDownload?.includes('.pdf') ? 'PDF' : 'EPUB'
      });
    });
  }

  return Response.json({ books: combined });
}