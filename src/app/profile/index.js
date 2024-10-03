import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import LocaleSelect from '../../containers/locale-select';
import LoginToolContainer from "../../containers/login-tool-container";
import ProfileLayout from "../../components/profile-layout";

function Profile() {
  const navigate = useNavigate();

  const select = useSelector(state => ({
    user: state.login.user,
    isLogin: state.login.isLogin,
  }));

  useEffect(() => {
    if (select.isLogin === false) {
      navigate('/login');
    }
  }, [select.isLogin, navigate]);

  return (
    <PageLayout>
      <LoginToolContainer />
      <Head title='Магазин'>
        <LocaleSelect />
      </Head>
      <Navigation />
      <ProfileLayout profile={select.user} />
    </PageLayout>
  );
}

export default memo(Profile);
