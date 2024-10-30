"use client";

import ButtonGroup from "@/components/Button/ButtonGroup";
import Container from "@/components/Container/Container";
import InputGroup from "@/components/Inputs/InputGroup";
import useLogIn from "./_components/LogIn.hooks";

function LogInPage() {
  const { errMsgs, handleSubmitLogInForm } = useLogIn();

  return (
    <Container width="sm" className="flex flex-col items-center">
      <h1 className="mt-32 mb-10 text-3xl font-bold">로그인 하기</h1>

      <form onSubmit={handleSubmitLogInForm} className="flex flex-col gap-y-3">
        <InputGroup
          type="email"
          errorText={errMsgs.email}
          label="이메일"
          name="email"
        />
        <InputGroup
          type="password"
          errorText={errMsgs.password}
          label="비밀번호"
          name="password"
        />

        <ButtonGroup
          errorText={errMsgs.global}
          className="w-full mt-5"
          size="md"
          value="로그인"
        />
      </form>
    </Container>
  );
}

export default LogInPage;
