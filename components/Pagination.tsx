export default function Pagination(props: any) {
  const { data, onPageChange } = props;
  return (
    <div className="page-split">
      <div className="btn-group">
        <button
          className="btn"
          disabled={!data.prev_page_url}
          onClick={() => onPageChange(1)}
        >
          «
        </button>
        {data.current_page - 1 >= 1 && (
          <button
            className="btn"
            onClick={() => onPageChange(data.current_page - 1)}
          >
            {data.current_page - 1}
          </button>
        )}
        <button className="btn btn-active">{data.current_page}</button>
        {data.current_page + 1 <= data.last_page && (
          <button
            className="btn"
            onClick={() => onPageChange(data.current_page + 1)}
          >
            {data.current_page + 1}
          </button>
        )}
        <button
          className="btn"
          disabled={!data.next_page_url}
          onClick={() => onPageChange(data.last_page)}
        >
          »
        </button>
      </div>
    </div>
  );
}
