import './App.css';
import {useState,useEffect} from 'react';

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()
  
export default function DetailsRole(){
  return (
    <QueryClientProvider client={queryClient}>
      <RoleTable />
    </QueryClientProvider>
  )
}


function RoleTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const { isFetching, error, data, refetch } = useQuery({
    queryKey: ['repoData', currentPage],
    queryFn: () =>
      fetch(`https://kit.ngosangns.com/api/users?page=${currentPage}`).then(
        (res) => res.json(),
      ),
  });

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  if (isFetching) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message
  return (
    <section id="detais_member_role" data-theme="dark">
      <div className="detais_member_rolecontainer mx-auto py-5">
        <div className="title_member_role ml-5">
          <h1>
            <span>Tên role: </span>
            Điều hành
          </h1>
          <h2>Danh sách user thuộc role</h2>
        </div>
        <div className="overflow-x-auto my-3">
          <table className="table table-normal w-full text-center">
            <thead>
              <tr>
                <th>MSSV</th>
                <th>Họ và tên</th>
                <th>Ban</th>
              </tr>
            </thead>
            <tbody id="listingTable">
              {data.data.map((item, index) => (
                <tr key={index}>
                  <td>{item.username}</td>
                  <td>{item.name}</td>
                  <td>{item.major}</td>
                </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="pangation_member_role flex my-3">
          <div className="mx-auto">
            <div className="btn-group col mx-auto my-5">
              <button className="btn" id="btn_prev" onClick={() => handlePageClick(currentPage - 1)}>
                Prev Page
              </button>
              <button className={`btn ${currentPage === 1 ? 'btn-active' : ''}`} onClick={() => handlePageClick(1)}>
                1
              </button>
              <button className={`btn ${currentPage === 2 ? 'btn-active' : ''}`} onClick={() => handlePageClick(2)}>
                2
              </button>
              <button className={`btn ${currentPage === 3 ? 'btn-active' : ''}`} onClick={() => handlePageClick(3)}>
                3
              </button>
              <button className="btn" id="btn_next" 
                onClick={() => {
                  handlePageClick(currentPage + 1)
                }}
              >
                Next Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

