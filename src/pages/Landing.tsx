import Page from '../components/ui/Page'
import Logo from '../components/ui/Logo'
import Card from '../components/ui/Card'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'

const Landing = () => {
  const navigate = useNavigate();

  return (
      <Page className='flex items-center justify-center'>
        <Card title='FICELCO 2025 ANNUAL GENERAL MEMBERSHIP ASSEMBLY' className='max-w-4xl w-full mx-auto' childrenClassName='p-6'>
          <div className='flex flex-col gap-4'>
            <Logo className='w-full' />
            <div className='w-full flex flex-wrap items-center gap-4 justify-center'>
              <Button className='bg-primary w-full h-14 text-white' onClick={() => navigate('/online')}>
                Online Registration
              </Button>
              {/* <Button className='bg-primary text-white w-fit' onClick={() => navigate('/prereg')}>
                Pre Registration Admin Login
              </Button>
              <Button className='bg-primary text-white w-fit' onClick={() => navigate('/onsite')}>
                Onsite Registration Admin Login
              </Button>
              <Button className='bg-primary text-white w-fit' onClick={() => navigate('/admin-login')}>
                Admin Login
              </Button> */}
            </div>
          </div>
        </Card>
      </Page>
  )
}

export default Landing
