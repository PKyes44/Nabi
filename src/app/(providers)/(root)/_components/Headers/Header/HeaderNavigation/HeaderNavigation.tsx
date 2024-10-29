import HeaderNavigationLink from "./HeaderNavigationLink";

function HeaderNavigation() {
  return (
    <nav className="flex items-center gap-x-5">
      <HeaderNavigationLink href="/funds" label="후원하기" />
      <HeaderNavigationLink href="/funds/report" label="후원 리포트" />
      <HeaderNavigationLink href="/free-meals/map" label="아동급식카드 지도" />
    </nav>
  );
}

export default HeaderNavigation;
