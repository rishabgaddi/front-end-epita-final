import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { AuthState } from 'slices/authSlice';

export function HomePage() {
  const state: AuthState = useSelector((state: any) => state.auth);
  const [name, setName] = React.useState('Stranger');

  React.useEffect(() => {
    if (state.user) {
      setName(state.user.firstName + ' ' + state.user.lastName);
    }
  }, [state]);

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="A Movie App" />
      </Helmet>
      <span>Welcome {name}</span>
    </>
  );
}
