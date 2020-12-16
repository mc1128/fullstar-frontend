import React, { useState } from "react";

import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import {
  LOG_IN,
  CREATE_ACCOUNT,
  CONFIRM_SECRET,
  LOCAL_LOG_IN,
} from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("logIn");
  const username = useInput("");
  //const password = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");

  const secret = useInput("");

  const [requestSecretMutation] = useMutation(LOG_IN, {
    /*update: (_, { data }) => {
      const { requestSecret } = data;
      if (!requestSecret) {
        toast.error("없는 계정입니다.");
        setTimeout(() => setAction("signUp"), 2000);
      } else {
        toast.success("비밀문자를 입력해주세요");
      }
    },*/
    variables: { email: email.value },
  });
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value,
    },
  });
  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      email: email.value,
      secret: secret.value,
    },
  });

  const [localLogInMutation] = useMutation(LOCAL_LOG_IN);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (action === "logIn") {
      if (email.value !== "") {
        try {
          const {
            data: { requestSecret },
          } = await requestSecretMutation();
          if (!requestSecret) {
            toast.error("없는 계정입니다.");
            setTimeout(() => setAction("signUp"), 2000);
          } else {
            toast.success("비밀문자를 입력해주세요");
            setTimeout(() => setAction("confirm"), 2000);
          }
        } catch {
          toast.error("연결에 실패하였습니다.");
        }
      } else {
        toast.error("이메일을 필수로 적어야합니다");
      }
    } else if (action === "signUp") {
      if (
        email.value !== "" &&
        username.value !== "" &&
        firstName.value !== "" &&
        lastName.value !== ""
      ) {
        try {
          const {
            data: { createAccount },
          } = await createAccountMutation();
          if (!createAccount) {
            toast.error("계정 생성이 불가합니다.");
          } else {
            toast.success("계정 생성 성공, 로그인을 해주세요!");
            setTimeout(() => setAction("logIn"), 2000);
          }
        } catch {
          toast.error("계정을 생성할 수 없습니다.");
        }
      } else {
        toast.error("입력사항을 다 입력해주세요");
      }
    } else if (action === "confirm") {
      if (secret.value !== "") {
        try {
          const {
            data: { confirmSecret: token },
          } = await confirmSecretMutation();
          if (token !== "" && token !== undefined) {
            localLogInMutation({ variables: { token } });
            window.location.reload();
          } else {
            throw Error();
          }
        } catch {
          toast.error("문자가 맞지않습니다.");
        }
      }
    }
  };

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      username={username}
      //password={password}
      firstName={firstName}
      lastName={lastName}
      email={email}
      secret={secret}
      onSubmit={onSubmit}
    />
  );
};
