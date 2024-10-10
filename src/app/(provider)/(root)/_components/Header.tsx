import Link from "next/link";

function Header() {
  return (
    <header className="h-16 shadow-lg">
      <div className="h-full flex items-center justify-between">
        <Link href="/">나비</Link>

        <nav>
          <ul className="flex gap-x-5">
            <li>
              <Link href="/log-in">로그인</Link>
            </li>
            <li>
              <Link href="/sign-up">회원가입</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
