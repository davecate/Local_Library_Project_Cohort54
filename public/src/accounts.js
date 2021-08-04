function findAccountById(accounts, id) {
  let found = accounts.find((account) => account.id === id)
  return found
}

function sortAccountsByLastName(accounts) {
return accounts.sort( (accountA, accountB) => 
accountA.name.last > accountB.name.last ? 1: -1 )
}

function getTotalNumberOfBorrows(account, books) {
  let total = 0
  for (book of books) { 
    for (borrowed of book.borrows) {
      if (borrowed.id === account.id) {total ++}
    }
  }
  return total
}

function getBooksPossessedByAccount(account, books, authors) {
  const borrowedBooks = [];
  books.forEach((book) => {
    let bookBorrows = book.borrows;
    bookBorrows.forEach((borrow) => {
      if (borrow.id === account.id && !borrow.returned) {
        borrowedBooks.push(book);
      }
    });
  });
  let result = borrowedBooks.map((book) => {
    return { ...book, author: _getAuthor(book, authors) };
  });
  return result;
}

function _getAuthor(book, authors) {
  const author = authors.find((author) => author.id === book.authorId);
  return author;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};