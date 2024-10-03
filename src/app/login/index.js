import {memo} from 'react';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import LoginFormContainer from '../../containers/login-form';
import LoginToolContainer from "../../containers/login-tool-container";

function Login() {
  const { t } = useTranslate();
  return (
    <PageLayout>
      <LoginToolContainer />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginFormContainer />
    </PageLayout>
  );
}

export default memo(Login);
