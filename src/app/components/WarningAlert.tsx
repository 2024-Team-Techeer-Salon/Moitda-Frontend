import { warningAlertProps } from '@/types/component.ts';

function WarningAlert({ errorMessage, showAlert }: warningAlertProps) {
  return (
    <div className="fixed top-0 z-50 flex w-full items-center justify-center file:left-0">
      <div
        role="alert"
        className={`alert-gray alert fixed top-0 mt-4 w-2/3 bg-[#ff6262] text-black ${
          showAlert ? 'alert-enter' : 'alert-exit'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{errorMessage}</span>
      </div>
    </div>
  );
}

export default WarningAlert;
