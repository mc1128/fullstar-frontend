import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import Input from "../../Components/Input";
import Button from "../../Components/Button";

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Box = styled.div`
  ${(props) => props.theme.whiteBox}
  border-radius:0px;
  width: 100%;
  max-width: 350px;
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`;

const Link = styled.span`
  color: ${(props) => props.theme.blueColor};
  cursor: pointer;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 12px;
`;

const HanText = styled.p`
  padding: 7px;
  font-weight: 700;
  font-family: "Noto Sans KR", sans-serif;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;

export default ({
  action,
  username,
  firstName,
  lastName,
  email,
  setAction,
  secret,
  onSubmit,
}) => (
  <Wrapper>
    <Form>
      {action === "logIn" && (
        <>
          <Helmet>
            <title>로그인 | FullStar</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input placeholder={"Email"} {...email} type="email" />
            <Button text={"로그인"} />
          </form>
        </>
      )}
      {action === "signUp" && (
        <>
          <Helmet>
            <title>회원가입 | FullStar</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input placeholder={"First name"} {...firstName} />
            <Input placeholder={"Last name"} {...lastName} />
            <Input placeholder={"Email"} {...email} type="email" />
            <Input placeholder={"Username"} {...username} />
            <Button text={"회원가입"} />
          </form>
        </>
      )}
      {action === "confirm" && (
        <>
          <Helmet>
            <title>문자확인 | FullStar</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input placeholder="Paste your secret" required {...secret} />
            <Button text={"문자확인"} />
          </form>
        </>
      )}
    </Form>
    {action !== "confirm" && (
      <StateChanger>
        {action === "logIn" ? (
          <>
            <HanText>계정이 없나요?</HanText>
            <Link onClick={() => setAction("signUp")}>회원가입</Link>
          </>
        ) : (
          <>
            <HanText>계정이 있나요?</HanText>
            <Link onClick={() => setAction("logIn")}>로그인</Link>
          </>
        )}
      </StateChanger>
    )}
  </Wrapper>
);
