import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUser,
  selectUser,
  selectUserLoading,
} from "../../store/slices/userSlice";

export function Header() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const loading = useSelector(selectUserLoading);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <header className="header">
      <h1>🛒 Интернет-магазин</h1>
      <div className="user-info">
        {loading || !user ? (
          <span>Загрузка...</span>
        ) : (
          <span>Привет, {user.name}!</span>
        )}
      </div>
    </header>
  );
}
