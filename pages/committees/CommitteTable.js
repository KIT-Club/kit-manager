
import styles from '../../styles/committee-table-page.module.css';
import committees from './data'; //placeholder data

function CommitteTable() {
  return (
    <>
    <header>
    <button className={`btn btn-outline ${styles["add-committee-btn"]}`}><b>+ Thêm ban</b></button>
    </header>
   
     <section className={styles["table-wrapper"]}>
    <table className={`${styles["table-normal"]} ${styles["w-full"]}`}>
    {/* head */}
    <thead>
      <tr className={styles["head-row"]}>
        <th></th>
        <th>Tên ban</th>
        <th>Số lượng thuộc ban</th>
        <th>Acions</th>
      </tr>
    </thead>
    <tbody>
      {committees.map((committee, index) => {
        const {name, numberOfMember} = committee;
         
        return (    
        <tr>
        <th>{index+1}</th>
        <td>{name}</td>
        <td>{numberOfMember}</td>
        <td>
          <div className={styles["button-container"]}>
            <button className={`btn btn-success ${styles["action-btn"]}`}>Update</button>
            <button className={`btn btn-error ${styles["action-btn"]}`}>Delete</button>
          </div>
        </td>
      </tr>
      )})}
    </tbody>
    <div className={`btn-group ${styles.pagnitation}`}> {/*btn-group is DasyUI class} */}
    <button className="btn pagnitation-button">«</button>
    <button className="btn pagnitation-button">Page 22</button>
    <button className="btn pagnitation-button">»</button>
  </div>
  </table>

  </section>
    </>
  );
  }

export default CommitteTable;
