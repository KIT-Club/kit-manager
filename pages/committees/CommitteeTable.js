import React from "react";

function CommitteeTable({committees, styles}) {
  return (
    <>
    <table className={`${styles["table-normal"]} ${styles["w-full"]}`}>
    {/* head */}
    <thead>
      <tr className={styles["head-row"]}>
        <th></th>
        <th>Tên ban</th>
        <th>Số lượng thuộc ban</th>
        <th>Hành động</th>
      </tr>
    </thead>
    <tbody className={styles["table-body"]}>
      {committees.map((committee, index) => {
        const {id, name, created_at} = committee;
         
        return (   
        <tr key={id}>
        <th>{id}</th>
        <td>{name}</td>
        <td>{created_at}</td>
        <td>
          <div className={styles["button-container"]}>
            <button className={`btn btn-success ${styles["action-btn"]}`}>Update</button>
            <button className={`btn btn-error ${styles["action-btn"]}`}>Delete</button>
          </div>
        </td>
      </tr>
      )})}
    </tbody>
    </table>
    </>
  );
  }

export default CommitteeTable;
