import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function FooterContainer({ children }: Props) {
  return (
    <div className="h-full bg-black text-[#a6aab6]">
      {children}
    </div>
  );
}
