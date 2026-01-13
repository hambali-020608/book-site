"use client"
import { useState,useEffect } from "react"
export default function Latest(){
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch("https://www.dbooks.org/api/recent")
            .then((res) => res.json())
            .then((data) => {
                setBooks(data)
                setLoading(false)
            })
            .catch((err) => {
                setError(err)
                setLoading(false)
            })
    }, [])


    return (
        <div>
            <h1 className="text-5xl font-bold text-[#FFBF00] text-center mt-10">Latest Books</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {books.books.map((book) => (
                      <div className="card bg-base-100 w-[200px] h-auto card-xs  shadow-xl">
  <figure className="px-10 pt-10">
    <img
      src={book.image}
      alt={book.title}
      className="rounded-xl h-56" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{book.title}</h2>
    <p>{book.subtitle}</p>
    <p className="text-xs italic">By {book.authors}</p>
    <div className="card-actions">
      <button className="btn btn-warning">Read Books</button>
    </div>
  </div>
</div>
                    ))}
                </div>
            )}

        </div>
    )
}