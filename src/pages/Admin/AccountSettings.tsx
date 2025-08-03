import React from 'react'
import AdminPage from '../../components/ui/AdminPage'
import Card from '../../components/ui/Card'
import Form from '../../components/ui/Form'
import { useAuth } from '../../store/auth'
import type { User } from '../../types/User'
import api from '../../api/axios'
import { Input } from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import pushToast from '../../lib/toast'

type Errors = {
  name?: string;
  email?: string;
  password?: string;
}

const AccountSettings = () => {
  const { user, fetchUser } = useAuth();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [userAccount, setUserAccount] = React.useState<User>({
    name: user?.name ?? "",
    email: user?.email ?? "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = React.useState<Errors>({
    name: "",
    email: "",
    password: "",
  });

  const handleUpdateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const res = await api.put(`/updateuser/${user?.id}`, userAccount);
      console.log(res);
      setLoading(false);
      fetchUser();
      pushToast(res.data.message);
    } catch (err: any) {
      console.log(err);
      setErrors(err.response.data.message);
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const res = await api.put(`/changepassword/${user?.id}`, userAccount);
      console.log(res);
      setLoading(false);
      setUserAccount((prev) => {
        return {
          ...prev,
          password: "",
          password_confirmation: "",
        }
      })
      pushToast(res.data.message);
    } catch (err: any) {
      console.log(err);
      setErrors(err.response.data.message);
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserAccount((prev) => {
        return {
        ...prev,
        [name]: value
        }
    })
  }

  return (
    <AdminPage className='flex gap-4 flex-col items-center justify-center min-h-[80vh]'>
      <Card title='Account Details' className='max-w-md w-full mx-auto'>
        <Form onSubmit={handleUpdateAccount} className='p-6'>
          <Input
            id='name'
            name='name'
            label='Name'
            placeholder='Name'
            onChange={handleChange}
            value={userAccount.name}
            disabled={user?.role !== "admin" || loading}
            withExistingData={user?.role !== "admin"}
            error={errors?.name}
            readOnly={user?.role !== "admin"}
          />

          {/* <Input
            type='email'
            id='email'
            name='email'
            label='Email'
            placeholder='Email'
            onChange={handleChange}
            value={userAccount.email}
            loading={loading}
            disabled={loading}
            error={errors?.email}
          /> */}

          {user?.role === "admin" && <Button className='bg-primary text-white' loading={loading} disabled={loading}>
            Update
          </Button>}
        </Form>
      </Card>
      <Card title='Change Account Password' className='max-w-md w-full mx-auto'>
        <Form onSubmit={handleChangePassword} className='p-6'>
          <Input
            type='password'
            id='password'
            name='password'
            label='Password'
            placeholder='Password'
            onChange={handleChange}
            value={userAccount.password}
            loading={loading}
            disabled={loading}
          />

          <Input
            type='password'
            id='password_confirmation'
            name='password_confirmation'
            label='Confirm Password'
            placeholder='Confirm Password'
            onChange={handleChange}
            value={userAccount.password_confirmation}
            loading={loading}
            disabled={loading}
            error={errors?.password}
          />

          <Button className='bg-primary text-white' loading={loading} disabled={loading}>
            Change
          </Button>
        </Form>
      </Card>
    </AdminPage>
  )
}

export default AccountSettings
