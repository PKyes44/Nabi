"use client";

import KakaoMap from "./_components/KakaoMap";

interface FreeMealStoresPageProps {
  searchParams: {
    lat: string;
    lng: string;
  };
}

function FreeMealStoresPage({
  searchParams: { lat, lng },
}: FreeMealStoresPageProps) {
  return (
    <div className="App">
      <KakaoMap lat={+lat} lng={+lng} />
    </div>
  );
}

export default FreeMealStoresPage;
