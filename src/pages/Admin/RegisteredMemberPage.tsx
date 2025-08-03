import React from 'react'
import type { RegisteredMember } from '../../types/RegisteredMember';
import api from '../../api/axios';
import AdminPage from '../../components/ui/AdminPage';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Form from '../../components/ui/Form';
import { Input } from '../../components/ui/Input';
import validPhilippineIDs from '../../data/ids';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import pushToast from '../../lib/toast';

type Errors = {
  account_number?: string;
  book?: string;
  name?: string;
  address?: string;
  occupant?: string;
  id_presented?: string;
  id_number?: string;
  phone_number?: string;
  email?: string;
  createdBy?: string;
  status?: string;
}

const RegisteredMemberPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = React.useState<boolean>(false);
  const [registeredMember, setRegisteredMember] = React.useState<RegisteredMember>({
      account_number: "",
      book: "",
      name: "",
      address: "",
      occupant: "",
      id_presented: "",
      id_number: "",
      phone_number: "",
      email: "",
      createdBy: "",
      status: "",
      reference_number: "",
  });

  const [errors, setErrors] = React.useState<Errors | null>({
      account_number: "",
      book: "",
      name: "",
      address: "",
      occupant: "",
      id_presented: "",
      id_number: "",
      phone_number: "",
      email: "",
      createdBy: "",
      status: "",
  });

  const fetchRegisteredMember = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/registered-member-an/${id}`);
      console.log(res);
      setRegisteredMember(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchRegisteredMember();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = e.target;

      if(name === "id_presented"){
        setRegisteredMember((prev) => {
          return {
            ...prev,
            id_number: ""
          }
        })
      }

      setRegisteredMember((prev) => {
          return {
          ...prev,
          [name]: value
          }
      })
  }

  const handleSubmitComplete = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    setErrors(null);

    try {
      const res = await api.put('/member-update', registeredMember);
      console.log(res);
      setSubmitLoading(false);
      if(res.status === 200){
        pushToast("Updated Successfully!");
        setRegisteredMember({
            account_number: res.data.data.account_number ,
            book: res.data.data.book ,
            name: res.data.data.name ,
            address: res.data.data.address ,
            occupant: res.data.data.occupant ,
            id_presented: res.data.data.id_presented ,
            id_number: res.data.data.id_number ,
            phone_number: res.data.data.phone_number ,
            email: res.data.data.email ,
            createdBy: res.data.data.createdBy ,
            status: res.data.data.status ,
            reference_number: res.data.data.reference_number ,
        });
      }
    } catch (err: any) {
        console.log(err);
        setSubmitLoading(false)
        setErrors(err.response.data.message);
    }
  }

  console.log("registeredMember", registeredMember);

  if(loading){
    return (
      <AdminPage className='flex items-center justify-center min-h-[80vh]'>
        <span>Loading...</span>
      </AdminPage>
    )
  }

    if(!loading && registeredMember.account_number === ""){
      return (
        <AdminPage className='flex flex-col gap-4 items-center justify-center min-h-[80vh]'>
          Sorry we can't find that account number.
          <Button className='bg-black text-white' onClick={() => navigate('/admin/registered-members')}>
              Go Back
          </Button>
        </AdminPage>
      )
    }

  return (
    <AdminPage className='flex flex-col gap-4'>
      <Button className='w-fit bg-primary text-white' onClick={() => navigate('/admin/registered-members')}>
        Back
      </Button>
      <Card className={`w-full mx-auto`} title='Update Member Information' childrenClassName='p-6 flex flex-col gap-6'>
        <Form onSubmit={handleSubmitComplete}>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <Input
                    id='account_number'
                    name='account_number'
                    label='Account Number'
                    placeholder='XXXXXXXX'
                    onChange={handleChange}
                    value={registeredMember.account_number}
                    loading={loading || submitLoading}
                    disabled={loading || submitLoading}
                    withExistingData={true}
                    error={errors?.account_number}
                    maxLength={8}
                    readOnly
                />
                <Input
                    id='book'
                    name='book'
                    label='Book Number'
                    placeholder='XXXXXX'
                    onChange={handleChange}
                    value={registeredMember.book}
                    loading={loading || submitLoading}
                    disabled={loading || submitLoading}
                    withExistingData={true}
                    error={errors?.book}
                    maxLength={6}
                    readOnly
                />
                <Input
                    id='name'
                    name='name'
                    label='Name'
                    placeholder='Name'
                    onChange={handleChange}
                    value={registeredMember.name}
                    loading={loading || submitLoading}
                    disabled={loading || submitLoading}
                    withExistingData={true}
                    error={errors?.name}
                    readOnly
                />
                <Input
                    id='address'
                    name='address'
                    label='Address'
                    placeholder='Address'
                    onChange={handleChange}
                    value={registeredMember.address}
                    loading={loading || submitLoading}
                    disabled={loading || submitLoading}
                    withExistingData={true}
                    error={errors?.address}
                    readOnly
                />
                <Input
                    id='occupant'
                    name='occupant'
                    label='Occupant'
                    placeholder='Occupant'
                    onChange={handleChange}
                    value={registeredMember.occupant}
                    loading={loading || submitLoading}
                    disabled={loading || submitLoading}
                    error={errors?.occupant}
                />

                <Select
                    id='id_presented'
                    name='id_presented'
                    label='Presented ID'
                    placeholder='Please Select an ID'
                    options={validPhilippineIDs} 
                    onChange={handleChange} 
                    value={registeredMember.id_presented}
                    loading={loading || submitLoading}
                    disabled={loading || submitLoading}
                    error={errors?.id_presented}
                />

                <Input
                    id='id_number'
                    name='id_number'
                    label='Presented ID Number'
                    placeholder='Presented ID Number'
                    onChange={handleChange}
                    value={registeredMember.id_number}
                    loading={loading || submitLoading}
                    disabled={loading || submitLoading || registeredMember.id_presented === null || registeredMember.id_presented === ""}
                    error={errors?.id_number}
                />

                <Input
                    id='phone_number'
                    name='phone_number'
                    label='Phone Number (Optional)'
                    placeholder='Phone Number'
                    onChange={handleChange}
                    value={registeredMember.phone_number}
                    loading={loading || submitLoading}
                    disabled={loading || submitLoading}
                    error={errors?.phone_number}
                    minLength={11}
                    maxLength={11}
                />

                <Input
                    type='email'
                    id='email'
                    name='email'
                    label='Email (Optional)'
                    placeholder='Email'
                    onChange={handleChange}
                    value={registeredMember.email}
                    loading={loading || submitLoading}
                    disabled={loading || submitLoading}
                    error={errors?.email}
                />
            </div>

            <Button
                className='bg-primary text-white'
                loading={loading || submitLoading}
                disabled={loading || submitLoading}
            >
                Update
            </Button>
        </Form>
      </Card>
    </AdminPage>
  )
}

export default RegisteredMemberPage
