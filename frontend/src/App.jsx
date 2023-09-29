import { Outlet } from "react-router-dom";

import useAuthCheck from "./hooks/useCheckAuth";

function App() {
  // useAuthCheck();
  useAuthCheck();
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
