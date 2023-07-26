import ReactPaginate from "react-paginate";

function Pagination({ paginate, array, postsPerPage }) {
  return (
    <ReactPaginate
      className="pagination"
      onPageChange={paginate}
      pageCount={Math.ceil(array.length / postsPerPage)}
      previousLabel={"≪"}
      nextLabel={"≫"}
      containerClassName={"pagination"}
      pageLinkClassName={"page-number"}
      previousLinkClassName={"page-number"}
      nextLinkClassName={"page-number"}
      activeLinkClassName={"active"}
    />
  );
}

export default Pagination;
