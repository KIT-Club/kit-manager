import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className = "Popup-delete-user">
        <div className="main-content w-3/5 bg-slate-800 shadow ring-1 ring-slate-900/5 rounded-lg rounded-2xl fixed">
          <div className="hide-popup w-12 text-center bg-zinc-600 p-1 opacity-60 rounded-3xl mt-3 ml-3 cursor-pointer hover:opacity-80">
            <p>Hide</p>
          </div>

          <div className="content-message text-center text-2xl mt-7">
            <p>Bạn có chắc chắn muốn xóa user X</p>
          </div>
          <div className ="btn-popup flex-wrap">
            <div className="btn-delete w-20 bg-rose-700 p-1 text-center rounded-2xl cursor-pointer hover:opacity-50">Xóa</div>
            <div className="btn-cancel btn-delete w-20 bg-gray-700 p-1 text-center rounded-2xl cursor-pointer hover:opacity-50">Hủy</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
