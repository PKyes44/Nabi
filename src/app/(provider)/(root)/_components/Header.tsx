import Link from "next/link";

function Header() {
  return (
    <header>
      <Link href="/">나비</Link>

      <nav>
        <ul>
          <li>
            <Link href="/log-in">로그인</Link>
          </li>
          <li>
            <Link href="/sign-up">회원가입</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
