import { useEffect } from 'react';

export const AnuncioAdsense = () => {
  useEffect(() => {
    // Le decimos a AdSense que cargue un anuncio en este espacio cuando el componente se monte
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error("Error al cargar el anuncio de AdSense:", error);
    }
  }, []);

  return (
    <div style={{ textAlign: 'center', margin: '20px 0', overflow: 'hidden' }}>
      <ins 
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-1776306006362688"
        data-ad-slot="9035437820"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};