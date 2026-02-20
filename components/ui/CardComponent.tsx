"use client";

import React from 'react';
import LogoWhiteComponent from '@/components/icons/LogoWhiteComponent';
import CardLogoComponent from '@/components/icons/CardLogoComponent';

type CardVariant = 'green' | 'dark-blue' | 'gray';

interface CardComponentProps {
  variant: CardVariant;
  cardNumber: string; 
  holderName: string;
  expiryDate: string;
  className?: string;
}

const variantClasses: Record<CardVariant, string> = {
  green: 'bg-card-green',
  'dark-blue': 'bg-card-dark-blue',
  gray: 'bg-card-gray',
};

export const CardComponent = ({
  variant,
  cardNumber,
  holderName,
  expiryDate,
  className = '',
}: CardComponentProps) => {

  const maskCardNumber = (num: string) => {
    const cleanNumber = num.toString().replace(/\s/g, '');
    const lastFour = cleanNumber.slice(-4);
    return `**** **** **** ${lastFour}`;
  };

  return (
    <div
      className={`
        relative overflow-hidden shadow-2xl flex flex-col text-white 
        rounded-[15px] w-[353.35px] h-[208.46px] opacity-100
        ${variantClasses[variant]} 
        ${className}
      `}
    >
      <div className="absolute right-0 top-0 bottom-0 pointer-events-none translate-x-1/4">
        <CardLogoComponent width="100%" height="100%" />
      </div>

      <div className="relative z-10 pt-6 pl-6 w-28">
        <LogoWhiteComponent />
      </div>

      <div 
        className="absolute z-10 flex items-center"
        style={{
          width: '275.70px',
          height: '26.96px',
          top: '98.41px',
          left: '23.03px',
          opacity: 1
        }}
      >
        <span className="font-quicksand text-card-number tracking-[2px] whitespace-nowrap">
          {maskCardNumber(cardNumber)}
        </span>
      </div>

      <div className="absolute bottom-6 left-6 right-6 z-10 flex items-end">
        <div className="flex flex-col min-w-[140px]">
          <span className="font-lato text-card-name truncate">
            {holderName}
          </span>
        </div>

        <div className="flex flex-col items-start ml-8">
          <span className="font-lato text-card-expire mb-0.5 opacity-80 whitespace-nowrap">
            Expire date
          </span>
          <span className="font-lato text-card-name tracking-wider">
            {expiryDate}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;