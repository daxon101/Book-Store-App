import BooksSingleCard from "./BooksSingleCard";

const BooksCard = ({ books }) => {
  return (
    <div className="grid sm:gird-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((book) => (
        <BooksSingleCard key={book._id} book={book}></BooksSingleCard>
      ))}
    </div>
  );
};
export default BooksCard;
