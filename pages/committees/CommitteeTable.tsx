function CommitteeTable({
  committees,
  styles,
  deleteCommittee,
}: {
  committees: Array<any>;
  styles: any;
  deleteCommittee: (id: number) => any;
}) {
  return (
    <>
      <table className={`${styles["table-normal"]} ${styles["w-full"]}`}>
        {/* head */}
        <thead>
          <tr className={styles["head-row"]}>
            <th className={styles["table-cell"]}>STT</th>
            <th className={styles["table-cell"]}>Tên ban</th>
            <th className={styles["table-cell"]}>Số lượng thuộc ban</th>
            <th className={styles["table-cell"]}>Hành động</th>
          </tr>
        </thead>
        <tbody className={styles["table-body"]}>
          {committees.map((committee) => {
            const {
              id,
              name,
              created_at,
            }: {
              id: number;
              name: string;
              created_at: string;
            } = committee;

            return (
              <tr key={id} className={styles["table-cell"]}>
                <th className={styles["table-cell"]}>{id}</th>
                <td className={styles["table-cell"]}>{name}</td>
                <td className={styles["table-cell"]}>{created_at}</td>
                <td className={styles["table-cell"]}>
                  <div className={styles["button-container"]}>
                    <button
                      className={`btn btn-sm bg-cyan-500 text-white mr-1
                      ${styles["action-btn"]}`}
                    >
                      Update
                    </button>
                    <div className="dropdown ">
                      <button
                        className={`btn btn-ghost btn-xs ${styles["action-btn"]}`}
                      >
                        Delete
                      </button>
                      <button
                        tabIndex={0}
                        className="btn btn-error dropdown-content menu p-2 shadow text-slate-600 rounded-box"
                        onClick={() => deleteCommittee(id)}
                      >
                        chắc chắn xóa ?
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default CommitteeTable;