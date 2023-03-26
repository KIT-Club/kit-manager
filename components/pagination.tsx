export default function Pagination({ data }: { data: any }) {
  return (
    <div className="page-split">
      <div className="btn-group">
        <button className="btn" disabled={!data.prev_page_url}>
          «
        </button>
        {data.current_page - 1 >= 1 && (
          <button className="btn">{data.current_page + 1}</button>
        )}
        <button className="btn btn-active">{data.current_page}</button>
        {data.current_page + 1 <= data.last_page && (
          <button className="btn">{data.current_page + 1}</button>
        )}
        <button className="btn" disabled={!data.next_page_url}>
          »
        </button>
      </div>
    </div>
  );
}
