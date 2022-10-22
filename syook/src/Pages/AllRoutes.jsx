import { Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import { PollPage, TabOne } from "./PollPage";
import { ResultPage } from "./ResultPage";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/pollpage" element={<PollPage />}></Route>
      <Route path="/resultPage" element={<ResultPage />}></Route>
    </Routes>
  );
};
