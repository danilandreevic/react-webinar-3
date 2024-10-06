import { memo} from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import LocaleSelect from '../../containers/locale-select';
import LoginToolContainer from "../../containers/login-tool-container";
import ProfileLayout from "../../components/profile-layout";
import withSessionCheck from "../../hooks/withSessionCheck";
import useSelector from "../../hooks/use-selector";

function Profile() {
  const select = useSelector(state => ({
    profile: state.login.user,
    isLogin: state.login.isLogin,
  }));

  return (
    <PageLayout>
      <LoginToolContainer />
      <Head title='Магазин'>
        <LocaleSelect />
      </Head>
      <Navigation />
      <ProfileLayout profile={select.profile} />
    </PageLayout>
  );
}

export default withSessionCheck(memo(Profile));
