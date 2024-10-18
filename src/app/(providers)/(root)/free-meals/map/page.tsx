"use client";

import KakaoMap from "./_components/KakaoMap";

interface FreeMealStoresPageProps {
  searchParams: {
    lat: string;
    lng: string;
    brandName: string;
  };
}

function FreeMealStoresPage({
  searchParams: { lat, lng, brandName },
}: FreeMealStoresPageProps) {
  return (
    <div className="App">
      <KakaoMap lat={+lat} lng={+lng} brandName={brandName} />
    </div>
  );
}

export default FreeMealStoresPage;
