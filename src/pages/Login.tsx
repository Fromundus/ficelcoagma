import { useState } from 'react';
import { useAuth } from '../store/auth';
import api from '../api/axios';
import { Input } from '../components/ui/Input';
import Form from '../components/ui/Form';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Page from '../components/ui/Page';
import Logo from '../components/ui/Logo';

type Props = {
  title: string; 
  required_settings: 'prereg' | 'onsite' | 'admin'; 
  required_role: 'user' | 'admin';
}

type LoginData = {
  name: string;
  password: string;
  required_settings?: 'prereg' | 'onsite' | 'admin';
  required_role?: 'user' | 'admin';
}

export default function Login({ title, required_settings, required_role }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<LoginData>({
    name: "",
    password: "",
    required_settings: required_settings,
    required_role: required_role,
  });

  const [errors, setErrors] = useState<null>(null);

  const login = useAuth((state) => state.login);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors(null);

    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors(null);

    try {
      const res = await api.post('/login', data);
      console.log(res);
      login(res.data.user, res.data.access_token);
      setLoading(false);
    } catch (err: any) {
      setErrors(err.response.data.message);
      console.log(err);
      setLoading(false);
    }

  };

  return (
    <Page className='flex items-center justify-center'>
      <Card className='max-w-lg mx-auto w-full' title={title} childrenClassName='p-6'>
        <Form className='items-center' onSubmit={handleSubmit}>
          {/* <span className='font-bold text-lg'>Login</span> */}
          <Logo />
          <span className='text-sm text-red-500'>{errors}</span>
          <Input 
            id='name'
            name='name'
            label='Username'
            placeholder='Username'
            onChange={handleChange}
            value={data.name}
            loading={loading}
          />
          <Input
            type='password'
            id='password'
            name='password'
            label='Password'
            placeholder='Password'
            onChange={handleChange}
            value={data.password}
            loading={loading}
          />
          <Button 
            className='bg-primary text-white w-full' 
            disabled={!data.name || !data.password || loading}
            loading={loading}
          >
            Login
          </Button>
        </Form>
      </Card>
    </Page>
  );
}
