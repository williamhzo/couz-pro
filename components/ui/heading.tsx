import { FC, PropsWithChildren } from 'react';

export const Heading: FC<PropsWithChildren> = ({ children }) => {
  return <h1 className="text-lg">{children}</h1>;
};
