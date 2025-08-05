import Page from '../components/ui/Page'
import AccountRegistration from '../components/AccountRegistration'
import React from 'react';
import api from '../api/axios';
import Card from '../components/ui/Card';
import Logo from '../components/ui/Logo';

const OnlineRegistration = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [status, setStatus] = React.useState<string>();

  const fetchSettings = async () => {
    setLoading(true);
      try {
          const res = await api.get('/settings-online');
          console.log(res);
          setStatus(res.data.data);
          setLoading(false);
      } catch (err){
          console.log(err);
          setLoading(false);
      }
  }

  React.useEffect(() => {
    fetchSettings();
  }, []);

  if(loading){
    return (
      <Page className='flex items-center justify-center'>
        <span>Loading...</span>
      </Page>
    )
  }

  if(!loading && status && status === "inactive"){
    return (
      <Page className='flex items-center justify-center'>
        <Card className='max-w-xl mx-auto w-full' childrenClassName='p-6'>
          <div className='flex flex-col gap-6 items-center'>
            <Logo />
            <span className='text-center text-red-500'>Online registration is currently closed and will open on <strong>September 6, 2025 at 12:01 AM</strong></span>
          </div>
        </Card>
      </Page>
    )
  }

  return (
    <Page className='flex items-center justify-center'>
        <AccountRegistration />
    </Page>
  )
}

export default OnlineRegistration
