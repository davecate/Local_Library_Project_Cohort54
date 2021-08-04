function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  const borrowedBooks = books.filter((book) => book.borrows[0].returned === false);
  return borrowedBooks.length;
}

function getMostCommonGenres(books) {
  const mostCommonGenres = books.reduce((commonGenres, book) => {
    let genre = book.genre
    if (commonGenres.includes(genre) === false) {
      commonGenres.push({name: `${genre}`, count: 0})
    }
    for (commonGenre of commonGenres) {
      let name = commonGenre.name
      if (name.includes(genre) === true) {commonGenre.count ++}
    }
    commonGenres.sort((commonGenreA, commonGenreB) => commonGenreB.count - commonGenreA.count)
    return (commonGenres.slice(0, 5))
  }, [])
  return (mostCommonGenres)
}

function getMostPopularBooks(books) {
  const mostPopularBooks = books.reduce((popularBooks, book) => {
    let name = book.title
    let count = book.borrows.length
    if (popularBooks.includes(name) === false) {
      popularBooks.push({name: `${name}`, count: count})
    }
    popularBooks.sort((popularBookA, popularBookB) => popularBookB.count - popularBookA.count)
    return (popularBooks.slice(0, 5))
  }, [])
  return (mostPopularBooks)
}

function getMostPopularAuthors(books, authors) {
  const mostPopularAuthors = authors.reduce((popularAuthors, author) => {
    let firstName = author.name.first
    let lastName = author.name.last
    if (popularAuthors.includes(firstName && lastName) === false) {
      popularAuthors.push({name: `${firstName} ${lastName}`, count: 0})
    }
    books.forEach((book) => {
      popularAuthors.forEach((popularAuthor) => {
        if (popularAuthor.name.includes(firstName && lastName) === true && author.id === book.authorId) {
        popularAuthor.count += book.borrows.length
        }
      })
    })
    popularAuthors.sort((popularAuthorA, popularAuthorB) => popularAuthorB.count - popularAuthorA.count)
    return (popularAuthors.slice(0, 5))
  }, [])
  return (mostPopularAuthors)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
