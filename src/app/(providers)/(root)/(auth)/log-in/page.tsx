"use client";

import ButtonGroup from "@/components/Button/ButtonGroup";
import Container from "@/components/Container/Container";
import InputGroup from "@/components/Inputs/InputGroup";
import useLogIn from "./_components/LogIn.hooks";

function LogInPage() {
  const { errMsgs, handleSubmitLogInForm } = useLogIn();

  return (
    <Container width="sm" className="flex flex-col items-center">
      <h1 className="mt-32 mb-10 text-3xl font-bold sm:text-2xl sm:mt-20">
        로그인 하기
      </h1>

      <form
        onSubmit={handleSubmitLogInForm}
        className="flex flex-col gap-y-3 sm:text-xs w-96 md:w-80 sm:w-72"
      >
        <InputGroup
          type="email"
          errorText={errMsgs.email}
          wrapperClassName="w-full"
          label="이메일"
          name="email"
        />
        <InputGroup
          type="password"
          errorText={errMsgs.password}
          wrapperClassName="w-full"
          label="비밀번호"
          name="password"
        />

        <ButtonGroup
          errorText={errMsgs.global}
          className="w-full mt-5 sm:text-xs"
          size="md"
          value="로그인"
        />
      </form>
    </Container>
  );
}

export default LogInPage;
