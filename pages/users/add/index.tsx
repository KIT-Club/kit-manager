function UserAdd() {
  return (
    <div>
      <label htmlFor="add-user-modal" className="btn">
        Add user
      </label>
      <input type="checkbox" id="add-user-modal" className="modal-toggle" />

      <div className="modal">
        <form className="modal-box prose lg:prose-md">
          <label
            htmlFor="add-user-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg">Add New User</h3>
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
          <div className="modal-action justify-start">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default UserAdd;
