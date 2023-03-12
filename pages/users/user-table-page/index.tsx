import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import {useState} from 'react';


function App() {

  const [showPopup, setShowPopup] = useState(false);

  function handleClick() {
    setShowPopup(true);
    console.log(showPopup)
  }

  function handleHide() {
    setShowPopup(false);
  }

  return (
    <div className="App">
      <div className='main-content'>
        <div className='btn-add-user'>
          <button className="btn mt-28" onClick={handleClick} >Add User</button>
        </div>

        <div className='user-table'>
          <div className="overflow-x-auto w-full">
            <table className="table w-full">
            {/* head */}
              <thead>
              <tr>
              <th>MSV</th>
              <th>AVT  &  TÊN</th>
              <th>Lớp</th>
              <th>Ban</th>
              <th>ROLE</th>
              <th>TÙY CHỌN</th>
              </tr>
              </thead>
              <tbody>
              {/* row 1 */}
              <tr>
              <td>
                <div className='msv'>KIT12345</div>
              </td>
              <td>
              <div className="flex items-center space-x-3">
              <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src="https://raw.githubusercontent.com/KIT-Club/kit-manager/7569e716e54002590f5b3f3aa8f74ccd24f7a940/public/sample-avatar.jpg" />
              </div>
              </div>
              <div>
              <div className="font-bold">Hart Hagerty</div>
              <div className="text-sm opacity-50">United States</div>
              </div>
              </div>
              </td>
              <td>
                <div className='class'>CT7B</div>
              </td>
              <td>
              Ban truyền thông
              <br/>
              <span className="badge badge-ghost badge-sm">Mô tả ngắn của ban ở đây</span>
              </td>
              <td>Editor</td>
              <th>
                <div className='btn-table'>
                  <button className="btn btn-sm bg-cyan-500 text-white mr-1">Update</button>
                  <button className="btn btn-ghost btn-xs">Delete</button>
                </div>
              </th>
              </tr>
              {/* row 2 */}
              <tr>
              <td>
                <div className='msv'>KIT12345</div>
              </td>
              <td>
              <div className="flex items-center space-x-3">
              <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src="https://raw.githubusercontent.com/KIT-Club/kit-manager/7569e716e54002590f5b3f3aa8f74ccd24f7a940/public/sample-avatar.jpg" />
              </div>
              </div>
              <div>
              <div className="font-bold">Brice Swyre</div>
              <div className="text-sm opacity-50">China</div>
              </div>
              </div>
              </td>
              <td>
                <div className='class'>CT7B</div>
              </td>
              <td>
              Ban Chuyên Môn
              <br/>
              <span className="badge badge-ghost badge-sm">Mô tả ngắn của ban ở đây</span>
              </td>
              <td>Manager</td>
              <th>
                <div className='btn-table'>
                    <button className="btn btn-sm bg-cyan-500 text-white mr-1">Update</button>
                    <button className="btn btn-ghost btn-xs">Delete</button>
                </div>
              </th>
              </tr>
              {/* row 3 */}
              <tr>
              <td>
                <div className='msv'>KIT12345</div>
              </td>
              <td>
              <div className="flex items-center space-x-3">
              <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src="https://raw.githubusercontent.com/KIT-Club/kit-manager/7569e716e54002590f5b3f3aa8f74ccd24f7a940/public/sample-avatar.jpg" />
              </div>
              </div>
              <div>
              <div className="font-bold">Marjy Ferencz</div>
              <div className="text-sm opacity-50">Russia</div>
              </div>
              </div>
              </td>
              <td>
                <div className='class'>CT7B</div>
              </td>
              <td>
              Ban Hậu Cần
              <br/>
              <span className="badge badge-ghost badge-sm">Mô tả ngắn của ban ở đây</span>
              </td>
              <td>Deputy director</td>
              <th>
                <div className='btn-table'>
                    <button className="btn btn-sm bg-cyan-500 text-white mr-1">Update</button>
                    <button className="btn btn-ghost btn-xs">Delete</button>
                </div>
              </th>
              </tr>
              {/* row 4 */}
              <tr>
              <td>
                <div className='msv'>KIT12345</div>
              </td>
              <td>
              <div className="flex items-center space-x-3">
              <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src="https://raw.githubusercontent.com/KIT-Club/kit-manager/7569e716e54002590f5b3f3aa8f74ccd24f7a940/public/sample-avatar.jpg" />
              </div>
              </div>
              <div>
              <div className="font-bold">Yancy Tear</div>
              <div className="text-sm opacity-50">Brazil</div>
              </div>
              </div>
              </td>
              <td>
                <div className='class'>CT7B</div>
              </td>
              <td>
              Ban Bô Lão
              <br/>
              <span className="badge badge-ghost badge-sm">Mô tả ngắn của ban ở đây</span>
              </td>
              <td>Chairperson</td>
              <th>
                <div className='btn-table'>
                    <button className="btn btn-sm bg-cyan-500 text-white mr-1">Update</button>
                    <button className="btn btn-ghost btn-xs">Delete</button>
                </div>
              </th>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className='page-split'>
          <div className="btn-group">
            <button className="btn">«</button>
            <button className="btn">1</button>
            <button className="btn btn-active">2</button>
            <button className="btn">3</button>
            <button className="btn">4</button>
            <button className="btn">»</button>
          </div>
        </div>

        <div className='footer'></div>
      </div>

      {showPopup === true && 
      <div  className='popup-add-user'>
        <div className='content-add-user'>
          <div onClick = {handleHide} className='esc-popup-add bg-stone-600 text-white w-8 text-center h-7 rounded-lg mt-5 ml-5 opacity-60 cursor-pointer hover:opacity-90'>esc</div>
          <div className = 'form-add-user'>
            <h3 className="font-bold text-center mt-2">Add New User</h3>


            <div className="form-control">
              <label className="label">
                <span className="label-text">Mã số sinh viên</span>
                <input
                className="input input-bordered w-[12rem]"
                name="username"
                placeholder="Mã số sinh viên"
                />
              </label>
              <label className="label">
                <span className="label-text">Role</span>
                <select className="select select-bordered w-[12rem]">
                <option value="1">Admin</option>
                <option value="2">Moderator</option>
                <option value="3">Member</option>
                </select>
              </label>
              <label className="label">
                <span className="label-text">Ban</span>
                <div>
                  <label className="label cursor-pointer justify-start">
                    <input
                      type="checkbox"
                      className="checkbox"
                      id="ban1"
                      name="ban"
                    />
                    <label
                      htmlFor="ban1"
                      className="label-text inline-block pl-2"
                    >
                      Ban Điều Hành
                    </label>
                  </label>
                  <label className="label cursor-pointer justify-start">
                    <input
                      type="checkbox"
                      className="checkbox"
                      id="ban2"
                      name="ban"
                    />
                    <label
                      htmlFor="ban2"
                      className="label-text inline-block pl-2"
                    >
                      Ban Chuyên Môn
                    </label>
                    </label>
                    <label className="label cursor-pointer justify-start">
                    <input
                      type="checkbox"
                      className="checkbox"
                      id="ban3"
                      name="ban"
                    />
                    <label
                      htmlFor="ban3"
                      className="label-text inline-block pl-2"
                    >
                      Ban Truyền Thông
                    </label>
                  </label>
                </div>
              </label>
            </div>
            <div className="modal-action justify-start ml-5">
            <button type="submit" className="btn btn-primary ">
            Login
            </button>
            </div>
          </div>
        </div>
      </div>
      }

      <div className='popup-update-user'></div>
    </div>
  );
  
}



export default App;
