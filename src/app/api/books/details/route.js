export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const source = searchParams.get('source');

  if (!slug) return Response.json({ books: [] });

  if(source === 'dbooks'){
    const data = await fetch(`https://www.dbooks.org/api/book/${slug}`)
    const bookData = await data.json()
    const book = {
      title: bookData.title,
      authors: bookData.authors,
      subtitle: bookData.subtitle,
      image: bookData.image,
      publisher: bookData.publisher,
      year: bookData.year,
      pages: bookData.pages,
      description: bookData.description,
      url: bookData.download,
      source: "dbooks",
      // type: bookData.type
    }


    return Response.json({ book });
  }

  if(source === 'gutenberg'){
    const data = await fetch(`https://gutendex.com//books?ids=${slug}`)
    // console.log(data)
    const bookData = await data.json()
    // console.log("formats",bookData.results[0].formats['image/jpeg'])
    const book = {
      title: bookData.results[0].title,
      authors: bookData.results[0].authors[0].name,
      subtitle: bookData.results[0].subtitle,
      image: bookData.results[0].formats['image/jpeg'],
      publisher: bookData.results[0].publisher,
      year: bookData.results[0].year,
      description: bookData.results[0].summaries[0],
      // pages: bookData.pages,
      url: bookData.results[0].formats['application/pdf'] || bookData.results[0].formats['text/html']||bookData.results[0].formats['application/epub+zip'] ,
      source: "gutenberg",
      // type: bookData.type
    }

    return Response.json({ book });
  }

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
      url: bookData.downloadLinks,
      source: "freeCom",
      type: bookData.info.type
    }
  

    return Response.json({ book });
  }
;
}