import React from 'react'
import AdminPage from '../../components/ui/AdminPage'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import Form from '../../components/ui/Form'
import { Input } from '../../components/ui/Input'

type FormData = {
  name: string;
  code: string;
}

const Services = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<FormData>({
    name: "",
    code: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  }

  return (
    <AdminPage>
      <div>
        <Modal buttonClassName='bg-primary w-fit text-white' title='Add Service' label='Add Service' loading={loading}>
          <Form onSubmit={handleSubmit}>
            <Input
              id='name'
              name='name'
              placeholder='Name'
              onChange={handleChange}
              value={data.name}
              loading={loading}
            />
            <Input
              id='code'
              name='code'
              placeholder='Code'
              onChange={handleChange}
              value={data.code}
              loading={loading}
            />
            <Button
              className='bg-primary text-white'
              disabled={loading || !data.name || !data.code}
            >
              Create
            </Button>
          </Form>
        </Modal>
      </div>
    </AdminPage>
  )
}

export default Services
