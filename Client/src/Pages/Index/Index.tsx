import Loading from "../../Components/Indicators/Loading";
import { useAppSelector } from "../../Hooks/StateHooks";
import Home from "../Home/Home";

export default function Index() {
  const isAuth = useAppSelector((s) => s.user.isAuth);

  /*   if (!isAuth) {
    return <Loading />;
  } */
  return (
    <>
      <Home />
    </>
  );
}
