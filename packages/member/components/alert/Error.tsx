export default function ErrorAlert(props: any) {
  return (
    <div className={"alert alert-error " + props.className}>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="stroke-current flex-shrink-0 h-6 w-6"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{props.msg}</span>
      </div>
    </div>
  );
}
