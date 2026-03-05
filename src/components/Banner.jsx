export default function Banner() {
  return (
    <div className="banner">
      <img
        src="/concept-de-collage-html-et-css-avec-pirate.jpg"
        alt="Cybersecurity Banner"
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.parentElement.style.background =
            'linear-gradient(135deg, #0d0d1a 0%, #0a1628 50%, #0d0d1a 100%)';
        }}
      />
    </div>
  );
}
