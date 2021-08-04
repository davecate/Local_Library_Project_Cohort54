const { forEach } = require("../../test/fixtures/accounts.fixture")

function findAuthorById(authors, id) {
  let found = authors.find((author) => author.id === id)
  return found
}

function findBookById(books, id) {
  let found = books.find((book) => book.id === id)
  return found
}

function partitionBooksByBorrowedStatus(books) {
  const booksByBorrowed = [[], []]
  const borrowedBooks = booksByBorrowed[0]
  const returnedBooks = booksByBorrowed[1]
  books.forEach((book) => {
    const mostRecentBorrow = book.borrows[0]
    if (mostRecentBorrow.returned === false) {
    borrowedBooks.push(book)
  } else {
    returnedBooks.push(book)
  }
})
  return booksByBorrowed
}

function getBorrowersForBook(book, accounts) {
  const transactions = book.borrows
  for (transaction of transactions) {
    for (account of accounts) {
      if (transaction.id === account.id) {Object.assign(transaction, account)}
    }
  }
  return (transactions.slice(0, 10))
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
