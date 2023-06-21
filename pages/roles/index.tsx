import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider, useQuery, useQueryClient} from '@tanstack/react-query';
import {getAllRoles, createRole, deleteRole} from "@/repositories/Role.repository";
 
import Pagination from "@/components/Pagination";

const queryClient = new QueryClient();


function TableRole() {
  const [currentPage, setCurrentPage] = useState(1)
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['roles'],
    queryFn: async () => {
      const limit = 5
      const params = {
        page: currentPage,
        limit: limit,
      }
      return await getAllRoles(params)
    }
  })

  const pageData = data

  useEffect(() => {
    refetch();
  }, [currentPage]);

  const handlePageChange =  async (page: any) => {
    setCurrentPage(page)
  }

  const queryClient = useQueryClient();

  const [num, setNum] = useState(0);
  const [count, setCount] = useState(0);

  const handleDelete = async (id: any) => {
    try {
      await deleteRole(id);
      setNum(0);
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      refetch();
    } catch (err) {
      alert("Đã xảy ra lỗi");
      console.log(err);
    }
  };

  const handleAdd = async (value: string) => {
    try {
      await createRole({
        name: value,
      });
      setCount(0);
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      refetch();
    } catch (err) {
      alert("Đã xảy ra lỗi");
      console.log(err);
    }
  }

  const [valueRole, setValueRole] = useState("");

  const showBtn = () => {
    if(num === 0) {
      setNum(1);
    }

    if(num === 1) {
      setNum(0);
    }
  }

  const showAddForm = () => {
    if(count === 0) {
      setCount(1);
    }

    if(count === 1) {
      setCount(0);
    }
  }
  

  if (isLoading) return <div>Loading...</div>;



  if (error) {
    if (typeof error === 'object' && 'message' in error) {
      console.log(error.message);
    } else {
      console.log('An error has occurred');
    }
  }
  

  return (
    <section className="relative">
    <div className="btn text-white" onClick={showAddForm}>
      Thêm Ban
    </div>
    {count === 1 && 
    <form
      className="modal-box absolute z-[2] fixed"
      onSubmit={(e) => {e.preventDefault()}}
    >
      <h3 className="text-2xl font-semibold pb-4 border-b-2 mb-2">
        Thêm Role
      </h3>
      <div className="form-control  first-letter:max-w-sm pb-5">
        <label htmlFor="input_committee_name" className="label">
          <span className="label-text font-semibold text-base">
            Tên Role
            <span className="text-[red]">*</span>
          </span>
        </label>
        <input
          onChange={(e) => setValueRole(e.target.value)}
          id="input_committee_name"
          type="text"
          placeholder="Type here"
          className="input input-bordered "
          required
        />
      </div>
      <div className="modal-action">
        <button className="btn" onClick={() => handleAdd(valueRole)}>Thêm</button>
      </div>
    </form>
    }
    <table className={`table w-full mt-4 text-white z-[1]`}>
        {/* head */}
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên role</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
        {pageData.data.map((dt: any, index: any) => (
              <tr key={index}>
                <th>{dt.id}</th>
                <td>{dt.name}</td>
                <td>{dt.created_at}</td>
                <td>{dt.updated_at}</td>
                <td>
                  <div>
                    <button
                      className={`btn btn-sm bg-cyan-500 text-white mr-1`}
                    >
                      Cập nhật
                    </button>
                    <div className="dropdown ">
                      <button
                        className={`btn btn-sm bg-error-500 text-white mr-1`}
                        onClick={showBtn}
                      >
                        Xóa
                      </button>
                      {num === 1 && <button
                        className="btn btn-error dropdown-content menu p-2 shadow
                         text-white rounded-box"
                         onClick={() => handleDelete(dt.id)}
                      >
                        Chắc chắn xóa!
                      </button>}
                    </div>
                  </div>
                </td>
              </tr>
          ))}
        </tbody>
      </table>
      <Pagination data={pageData} onPageChange={handlePageChange} />
    </section>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TableRole />
    </QueryClientProvider>
  );
}