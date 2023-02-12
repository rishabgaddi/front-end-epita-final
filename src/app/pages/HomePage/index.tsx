import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { AuthState } from 'slices/authSlice';

export function HomePage() {
  const state: AuthState = useSelector((state: any) => state.auth);
  const [name, setName] = React.useState(
    state.user?.firstName + ' ' + state.user?.lastName,
  );

  return (
    <>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <span>Welcome {name}</span>
    </>
  );
}
