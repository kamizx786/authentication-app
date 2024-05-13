import React from "react";
import Image from "next/image";
const Logo = () => {
  return (
    <div>
      <Image
        src="https://res.cloudinary.com/die5mkbau/image/upload/v1715608926/png-transparent-logo-contracting-photography-logo-symbol-removebg-preview_qdzc22.png"
        className="mr-3 h-6 sm:h-9"
        alt="Logo"
        width={50}
        height={20}
      />
    </div>
  );
};

export default Logo;
