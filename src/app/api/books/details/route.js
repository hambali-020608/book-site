export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const source = searchParams.get('source');

  if (!slug) return Response.json({ books: [] });

  if(source === 'dbooks'){
    const data = await fetch(`https://www.dbooks.org/api/book/${slug}`)
    const book = await data.json()
    return Response.json({ book });
  }
  
  

  // if(source === 'gutenberg'){
  //   const data = await fetch(`https://gutendex.com//books?ids=${slug}`)
  //   const book = await data.json()
  //   return Response.json({ book });
  // }

  if(source === 'freeCom'){
    const data = await fetch(`https://ebook-scraper.vercel.app/api/books/v1/detail?bookPath=${slug}`)
    const bookData = await data.json()
    const book = {
      title: bookData.info.title,
      authors: bookData.info.authors,
      image: bookData.info.image,
      publisher: bookData.info.publisher,
      year: bookData.info.year,
      pages: bookData.info.pages,
      description: bookData.info.description,
      downloadUrl: bookData.info.downloadUrl,
      source: bookData.info.source,
      type: bookData.info.type
    }
    


    return Response.json({ book });
  }
;
}