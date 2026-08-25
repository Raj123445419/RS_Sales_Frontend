import React from 'react';

export default function LoginIllustration({ className = "w-full max-w-lg" }) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 700 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-sm"
      >
        {/* Baseline Floor */}
        <line x1="40" y1="440" x2="660" y2="440" stroke="#7E7264" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />

        {/* ================= CENTER CIRCLE CALLOUT (AGREEMENT & HANDSHAKE) ================= */}
        <g id="agreement-bubble">
          {/* Outer circle halo */}
          <circle cx="340" cy="270" r="135" fill="#E6EEF8" />
          <circle cx="340" cy="270" r="135" stroke="#FFFFFF" strokeWidth="6" />

          {/* Clip path for inside circle */}
          <defs>
            <clipPath id="circleClip">
              <circle cx="340" cy="270" r="132" />
            </clipPath>
          </defs>

          <g clipPath="url(#circleClip)">
            {/* Agreement Document in background of bubble */}
            <g transform="translate(275, 175)">
              <rect x="0" y="0" width="130" height="110" rx="6" fill="#FFFFFF" stroke="#94B7EB" strokeWidth="2" />
              {/* Header bar */}
              <rect x="0" y="0" width="130" height="18" rx="6" fill="#6A97D8" />
              {/* Document lines */}
              <line x1="20" y1="32" x2="110" y2="32" stroke="#4A75B5" strokeWidth="3" strokeLinecap="round" />
              <line x1="25" y1="44" x2="105" y2="44" stroke="#94B7EB" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="25" y1="54" x2="105" y2="54" stroke="#94B7EB" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="25" y1="64" x2="90" y2="64" stroke="#94B7EB" strokeWidth="2.5" strokeLinecap="round" />
              {/* Stamp seals */}
              <circle cx="45" cy="85" r="9" stroke="#94B7EB" strokeWidth="2" fill="none" />
              <circle cx="85" cy="85" r="9" stroke="#94B7EB" strokeWidth="2" fill="none" />
            </g>

            {/* Gold Coins & Cash beneath hands */}
            <g transform="translate(280, 310)">
              {/* Cash banknote */}
              <rect x="50" y="10" width="70" height="35" rx="3" fill="#65A376" transform="rotate(-10 50 10)" />
              <rect x="53" y="13" width="64" height="29" rx="2" fill="#8AC79B" transform="rotate(-10 50 10)" stroke="#518A61" strokeWidth="1" />
              
              {/* Gold coin stacks */}
              <ellipse cx="25" cy="35" rx="20" ry="8" fill="#D99B26" />
              <ellipse cx="25" cy="30" rx="20" ry="8" fill="#F4B740" />
              <ellipse cx="25" cy="24" rx="20" ry="8" fill="#D99B26" />
              <ellipse cx="25" cy="19" rx="20" ry="8" fill="#F4B740" />
              <ellipse cx="25" cy="13" rx="20" ry="8" fill="#D99B26" />
              <ellipse cx="25" cy="8" rx="20" ry="8" fill="#FCD366" />
              
              {/* Big front coin */}
              <circle cx="55" cy="32" r="24" fill="#E89F1D" />
              <circle cx="55" cy="32" r="21" fill="#FFC94D" />
              <text x="55" y="41" textAnchor="middle" fill="#B3740A" fontSize="22" fontWeight="bold" fontFamily="Arial">$</text>
            </g>

            {/* Handshake: Left Arm (Blue) & Right Arm (Orange) */}
            {/* Left Arm sleeve */}
            <path d="M190 260 L280 320 L270 360 L180 290 Z" fill="#2050A0" />
            {/* Right Arm sleeve */}
            <path d="M490 260 L400 320 L410 360 L500 290 Z" fill="#DE6B32" />

            {/* Hands connecting */}
            {/* Left Hand */}
            <path d="M275 315 C295 305 320 310 335 315 L350 315 C355 315 360 320 355 330 C345 345 325 350 300 345 Z" fill="#E5A77B" />
            {/* Right Hand clasping */}
            <path d="M405 315 C385 305 360 310 345 315 L330 315 C325 315 320 320 325 330 C335 345 355 350 380 345 Z" fill="#DEA074" />
            <path d="M330 312 C338 318 348 322 355 322 C350 332 342 336 332 332 Z" fill="#C9885D" />
          </g>
        </g>

        {/* ================= LEFT CHARACTER (BUSINESSMAN WITH BRIEFCASE & PHONE) ================= */}
        <g id="left-businessman" transform="translate(60, 190)">
          {/* Head & Hair */}
          <circle cx="80" cy="40" r="16" fill="#1C3879" />
          <path d="M72 32 C78 24 92 24 96 32 C96 42 90 48 80 48 C72 48 70 42 72 32 Z" fill="#1C3879" />
          <circle cx="82" cy="44" r="12" fill="#E5A77B" />
          <rect x="79" y="52" width="7" height="12" fill="#DEA074" />

          {/* Torso & Blue Shirt */}
          <path d="M62 64 C70 60 94 60 102 64 L112 140 L52 140 Z" fill="#2050A0" />
          
          {/* Right Arm holding Briefcase */}
          <path d="M62 68 L36 140 L48 144 L70 82 Z" fill="#1C458A" />
          {/* Left Arm holding Phone */}
          <path d="M100 68 L138 120 L130 126 L94 80 Z" fill="#2050A0" />
          {/* Left Hand */}
          <circle cx="138" cy="120" r="7" fill="#E5A77B" />
          {/* Phone */}
          <rect x="135" y="108" width="10" height="18" rx="2" fill="#152033" transform="rotate(15 135 108)" />

          {/* Right Hand holding Briefcase */}
          <circle cx="36" cy="144" r="7" fill="#E5A77B" />
          {/* Briefcase */}
          <g transform="translate(8, 140)">
            <rect x="0" y="8" width="46" height="34" rx="4" fill="#1E3E7B" />
            <path d="M16 8 L16 3 C16 1 30 1 30 3 L30 8" stroke="#152A54" strokeWidth="3" fill="none" />
            <line x1="0" y1="18" x2="46" y2="18" stroke="#152A54" strokeWidth="2" />
          </g>

          {/* Orange Pants */}
          <path d="M52 140 L45 230 L60 230 L76 160 L92 230 L107 230 L112 140 Z" fill="#E8823A" />
          
          {/* Shoes */}
          <path d="M38 230 C38 226 58 226 62 230 L62 236 L30 236 Z" fill="#152A54" />
          <path d="M100 230 C100 226 120 226 124 230 L124 236 L92 236 Z" fill="#152A54" />
        </g>

        {/* Potted Plant near left man */}
        <g id="potted-plant" transform="translate(195, 330)">
          {/* Pot */}
          <polygon points="20,110 50,110 56,75 14,75" fill="#D68339" />
          <rect x="10" y="69" width="50" height="7" rx="2" fill="#BD6F28" />
          {/* Leaves */}
          <path d="M35 70 Q20 30 5 45 Q20 65 35 70 Z" fill="#78B887" />
          <path d="M35 70 Q50 30 65 45 Q50 65 35 70 Z" fill="#5F9E6E" />
          <path d="M35 70 Q35 15 25 25 Q30 55 35 70 Z" fill="#88C997" />
          <path d="M35 70 Q35 15 45 25 Q40 55 35 70 Z" fill="#6AA879" />
        </g>

        {/* ================= RIGHT CHARACTER (MAN ON STOOL WITH LAPTOP) ================= */}
        <g id="right-businessman" transform="translate(470, 190)">
          {/* Stool */}
          <g transform="translate(35, 140)">
            <ellipse cx="30" cy="12" rx="36" ry="12" fill="#D67438" />
            <ellipse cx="30" cy="8" rx="36" ry="12" fill="#EE8F55" />
            {/* Center leg */}
            <rect x="27" y="16" width="6" height="90" fill="#998370" />
            {/* Base */}
            <ellipse cx="30" cy="106" rx="28" ry="8" fill="#756250" />
            {/* Footrest rung */}
            <ellipse cx="30" cy="65" rx="18" ry="5" fill="none" stroke="#756250" strokeWidth="4" />
          </g>

          {/* Head & Hair */}
          <circle cx="75" cy="40" r="16" fill="#1C3879" />
          <path d="M68 32 C74 24 88 24 92 32 C92 42 86 48 76 48 C68 48 66 42 68 32 Z" fill="#1C3879" />
          <circle cx="72" cy="44" r="12" fill="#E5A77B" />
          <rect x="70" y="52" width="7" height="12" fill="#DEA074" />

          {/* Orange Torso */}
          <path d="M58 64 C68 60 88 60 96 64 L90 145 L48 145 Z" fill="#EE803B" />

          {/* Arms typing on laptop */}
          <path d="M62 68 L25 105 L35 110 L68 80 Z" fill="#DE6B2A" />
          <path d="M25 105 L-5 125 L6 130 L35 110 Z" fill="#DEA074" />

          {/* Laptop on knee/air */}
          <g transform="translate(-18, 105)">
            {/* Screen */}
            <rect x="0" y="0" width="3" height="30" rx="1" fill="#8AA8C9" transform="rotate(-20 0 0)" />
            <rect x="2" y="2" width="2" height="26" fill="#FFFFFF" transform="rotate(-20 2 2)" />
            {/* Base keyboard */}
            <polygon points="-8,28 26,28 20,32 -12,32" fill="#BACCE0" />
          </g>

          {/* Teal Pants (Legs Crossed) */}
          {/* Left leg hanging */}
          <path d="M50 140 L30 190 L40 230 L55 230 L45 190 L68 145 Z" fill="#3D9B9B" />
          {/* Right leg crossed over */}
          <path d="M58 140 L20 185 L50 205 L40 215 L10 185 L42 145 Z" fill="#348B8B" />

          {/* Shoes */}
          <path d="M40 230 C40 225 60 225 64 230 L64 236 L32 236 Z" fill="#152A54" />
          <path d="M40 215 L56 226 L48 232 L34 220 Z" fill="#152A54" />
        </g>
      </svg>
    </div>
  );
}
