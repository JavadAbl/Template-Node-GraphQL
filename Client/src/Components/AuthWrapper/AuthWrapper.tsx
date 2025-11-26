import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Hooks/StateHooks";
import { useAuth } from "../../Hooks/UseAuth";
import Loading from "../Indicators/Loading";
import type { User } from "../../Features/User/UserTypes";
import { userActions } from "../../Features/User/UserSlice";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authLoading } = useAuth();
  const isAuth = useAppSelector((s) => s.user.isAuth);

  /* const dispatch = useAppDispatch();

  useEffect(() => {
    // Simulate logging in
    const dummyUser: User = { id: 1, name: "John Doe" };
    dispatch(
      userActions.login({
        accessToken: "fake-jwt-token",
        refreshToken: "1",
        tokenObject: "1",
      })
    );
  }, [dispatch]); */

  if (authLoading) {
    return <Loading />;
  }

  return <>{children}</>;
}
