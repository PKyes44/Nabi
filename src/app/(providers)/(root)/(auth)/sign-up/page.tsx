"use client";
import ButtonGroup from "@/components/Button/ButtonGroup";
import Container from "@/components/Container/Container";
import InputGroup from "@/components/Inputs/InputGroup";
import { Role } from "@/types/profiles.types";
import useSignUp from "./_components/SignUp.hooks";

interface SignUpPageProps {
  searchParams: {
    role: Role;
  };
}

function SignUpPage({ searchParams: { role } }: SignUpPageProps) {
  const { errMsgs, handleSubmitSignUpForm } = useSignUp(role);

  return (
    <Container width="md" className="flex flex-col items-center">
      <h1 className="mt-20 mb-2 text-3xl font-bold sm:text-2xl">회원가입</h1>
      <span className="mb-10 text-sm text-center sm:text-xs">
        {role === "sponsor"
          ? "후원자로서 경제적으로 어려운 아이들을 도와보세요!"
          : "다양한 이유로 어려움을 가지고 있다면 나비에 가입하여 도움을 받아보세요!"}
      </span>

      <form
        onSubmit={handleSubmitSignUpForm}
        className="flex flex-col gap-y-2 sm:text-xs w-96 md:w-80 sm:w-72"
      >
        <InputGroup
          type="email"
          wrapperClassName="w-full"
          errorText={errMsgs.email}
          label="이메일"
          name="email"
        />
        <InputGroup
          type="password"
          wrapperClassName="w-full"
          errorText={errMsgs.password}
          label="비밀번호"
          name="password"
        />
        <InputGroup
          type="text"
          wrapperClassName="w-full"
          errorText={errMsgs.nickname}
          label="닉네임"
          name="nickname"
        />

        <ButtonGroup
          value="회원가입"
          size="md"
          className="w-full mt-5 sm:text-xs"
        />
      </form>
    </Container>
  );
}

export default SignUpPage;
