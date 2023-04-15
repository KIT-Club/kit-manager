import React from "react";

function CommitteeTable({
  committees,
  styles,
}: {
  committees: Array<any>;
  styles: any;
}) {
  return (
    <>
      <table className={`${styles["table-normal"]} ${styles["w-full"]}`}>
        {/* head */}
        <thead>
          <tr className={styles["head-row"]}>
            <th className={styles["table-cell"]}></th>
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
                      className={`btn btn-success ${styles["action-btn"]}`}
                    >
                      Update
                    </button>
                    <button className={`btn btn-error ${styles["action-btn"]}`}>
                      Delete
                    </button>
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
