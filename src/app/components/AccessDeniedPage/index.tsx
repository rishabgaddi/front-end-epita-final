import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';

export function AccessDeniedPage() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>Access Denied</title>
        <meta name="description" content="Access Denied" />
      </Helmet>
      <Wrapper>
        <H1>{t('access_denied')}</H1>
        <P>{t('not_authorised')}</P>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 20px;
  text-align: center;
`;

const H1 = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 1.5rem 0;
`;

const P = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  margin: 0.625rem 0 1.5rem 0;
`;
