import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../actions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input, Button, H2, AuthFormError } from "../../components";
import { useResetForm } from "../../hooks";
import { Link, Navigate } from "react-router-dom";
import { selectUserRole } from "../../selectors";
import { ROLE } from "../../constants";
import styled from "styled-components";
import { request } from "../../utils/request";

const authFormSchema = yup.object().shape({
  login: yup
    .string()
    .required("Заполните логин!")
    .matches(
      /^\w+$/,
      "Неверно заполнен логин. Допускаются только буквы и цифры"
    )
    .min(3, "Неверно заполнен логин. Минимум 3 символа")
    .max(15, "Неверно заполнен логин. Максимум 15 символов"),
  password: yup
    .string()
    .required("Заполните пароль!")
    .matches(
      /^[\w#%]+$/,
      "Неверно заполнен пароль. Допускаются только буквы, цифры и знаки # %"
    )
    .min(6, "Неверно заполнен пароль. Минимум 6 символа")
    .max(30, "Неверно заполнен пароль. Максимум 30 символов"),
});

const StyledLink = styled(Link)`
  text-align: center;
  text-decoration: underline;
  margin: 20px 0;
  font-size: 18px;
`;

const ErrorMessage = styled.div`
  font-size: 18px;
  background-color: #fcadad;
  margin: 10px 0 0;
  padding: 10px;
`;

const AuthorizationContainer = ({ className }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { login: "", password: "" },
    resolver: yupResolver(authFormSchema),
  });

  const [serverError, setServerError] = useState("");

  const dispatch = useDispatch();

  useResetForm(reset);

  const onSubmit = ({ login, password }) => {
    //server.authorize(login, password).then(({ error, res }) => {
    request("/api/login", "POST", { login, password }).then(
      ({ error, user }) => {
        if (error) {
          setServerError(`Ошибка запроса: ${error}`);
          return;
        }
        dispatch(setUser(user));
        sessionStorage.setItem("userData", JSON.stringify(user));
      }
    );
  };

  const formError = errors?.login?.message || errors?.password?.message;
  const errorMessage = formError || serverError;

  const roleId = useSelector(selectUserRole);
  console.log(roleId);

  if (roleId !== ROLE.GUEST) {
    return <Navigate to="/" />;
  }

  return (
    <div className={className}>
      <H2>Авторизация</H2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Логин..."
          {...register("login", {
            onChange: () => setServerError(null),
          })}
        />
        <Input
          type="password"
          placeholder="Пароль..."
          {...register("password", {
            onChange: () => setServerError(null),
          })}
        />
        <Button type="submit" disabled={!!formError}>
          Авторизоваться
        </Button>
        {errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
        <StyledLink to="/register">Регистрация</StyledLink>
      </form>
    </div>
  );
};

export const Authorization = styled(AuthorizationContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > form {
    display: flex;
    flex-direction: column;
    width: 260px;
  }
`;
