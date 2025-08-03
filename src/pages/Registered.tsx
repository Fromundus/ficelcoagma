import React from 'react'
import Page from '../components/ui/Page'
import api from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import QRCode from 'react-qr-code';
import Logo from '../components/ui/Logo';
import type { RegisteredMember } from '../types/RegisteredMember';

const Registered = () => {
    const { reference_number } = useParams();
    const [loading, setLoading] = React.useState<boolean>(false);

    const navigate = useNavigate();

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
        created_at: "",
    });

    const fetchRegisteredMember = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/registered-member/${reference_number}`);
            setRegisteredMember(res.data.data);
            setLoading(false);
            console.log(res);
        } catch (err){
            console.log(err);
            setLoading(false);
        }
    }

    React.useEffect(() => {
        fetchRegisteredMember();
    }, []);

    console.log(registeredMember);

    if(loading){
        return (
            <Page className='flex flex-col items-center justify-center'>
                Loading...
            </Page>
        )
    }

    if(!loading && registeredMember.account_number === ""){
        return (
            <Page className='flex flex-col gap-4 items-center justify-center'>
                Sorry we can't find that reference number.
                <Button className='bg-black text-white' onClick={() => navigate('/')}>
                    Register
                </Button>
            </Page>
        )
    }

    return (
        <>
            <Page className='flex flex-col items-center justify-center'>
                <Card className='p-6 w-full max-w-xl mx-auto'>
                    <div className='w-full max-w-xl mx-auto flex flex-col gap-6 items-center text-center'>
                        <Logo />
                        <span className='text-3xl font-bold text-blue-500'>CONGRATULATIONS!</span>
                        <div>
                            <img className='max-w-[200px] w-full' src="https://www.svgrepo.com/show/397713/party-popper.svg" alt="" />
                        </div>
                        <div className='text-sm flex flex-col gap-4'> 
                            <span>You have successfully registered to <strong>AGMA 2025</strong>.</span>
                            <span>You may receive an SMS, call, or email from us.</span>
                            <span className='font-semibold'>Please keep this Reference Number as this will serve as your certificate of registration.</span>
                        </div>
                        <span className='text-2xl font-bold text-green-600'>{registeredMember.reference_number}</span>

                        <p className='text-sm text-graphite'>Thank you for registering. We wish you the best of luck in the raffle draw!</p>

                        {/* <div className='flex flex-col items-start w-full text-sm mt-4 gap-2'>
                            <span className='font-semibold'>MEMBER DETAILS</span>
                            <span>Account Number: {registeredMember.account_number}</span>
                            <span>Book: {registeredMember.book}</span>
                            <span>Name: {registeredMember.name}</span>
                            <span>Address: {registeredMember.address}</span>
                            <span>Occupant: {registeredMember.occupant}</span>
                            <span>ID Presented: {registeredMember.id_presented}</span>
                            <span>ID Number: {registeredMember.id_number}</span>
                            <span>Phone Number: {registeredMember.phone_number}</span>
                            <span>Email: {registeredMember.email}</span>
                            <span>Reference Number: {registeredMember.reference_number}</span>
                        </div> */}
                        
                        <div className='w-full flex items-center gap-4 justify-center'>
                            <Modal title='Member Details' buttonClassName='bg-blue-500 text-white w-full text-nowrap' label='VIEW DETAILS'>
                                <div className='flex flex-col gap-4'>
                                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 items-center'>
                                        <div className='w-full flex justify-center flex-col items-center gap-2'>
                                            <QRCode className='w-[150px] h-[150px] border p-2 rounded' value={registeredMember.reference_number} />
                                            <span>Ref. No: <span className='font-semibold text-blue-500'>{registeredMember.reference_number}</span></span>
                                        </div>
                                        <div className='w-full flex flex-col gap-4'>
                                            {registeredMember.account_number && <Input
                                                id='account_number'
                                                name='account_number'
                                                label='Account Number'
                                                placeholder='XXXXXXXX'
                                                value={registeredMember.account_number}
                                                loading={loading}
                                                readOnly
                                                className='border-0 focus:ring-0 outline-0 text-lg'
                                            />}

                                            {registeredMember.book && <Input
                                                id='book'
                                                name='book'
                                                label='Book Number'
                                                placeholder='XXXXXX'
                                                value={registeredMember.book}
                                                loading={loading}
                                                readOnly
                                                className='border-0 focus:ring-0 outline-0 text-lg'
                                            />}

                                        </div>
                                    </div>
                                    {registeredMember.name && <Input
                                        id='name'
                                        name='name'
                                        label='Name'
                                        placeholder='Name'
                                        value={registeredMember.name}
                                        loading={loading}
                                        readOnly
                                        className='border-0 focus:ring-0 outline-0 text-lg'
                                    />}

                                    {registeredMember.address && <Input
                                        id='address'
                                        name='address'
                                        label='Address'
                                        placeholder='Address'
                                        value={registeredMember.address}
                                        loading={loading}
                                        readOnly
                                        className='border-0 focus:ring-0 outline-0 text-lg'
                                    />}

                                    {registeredMember.occupant && <Input
                                        id='occupant'
                                        name='occupant'
                                        label='Occupant'
                                        placeholder='Occupant'
                                        value={registeredMember.occupant}
                                        loading={loading}
                                        readOnly
                                        className='border-0 focus:ring-0 outline-0 text-lg'
                                    />}

                                    {registeredMember.id_presented && <Input
                                        id='id_presented'
                                        name='id_presented'
                                        label='Presented ID'
                                        placeholder='Presented ID'
                                        value={registeredMember.id_presented}
                                        loading={loading}
                                        readOnly
                                        className='border-0 focus:ring-0 outline-0 text-lg'
                                    />
}
                                    {registeredMember.id_number && <Input
                                        id='id_number'
                                        name='id_number'
                                        label='Presented ID Number'
                                        placeholder='Presented ID Number'
                                        value={registeredMember.id_number}
                                        loading={loading}
                                        readOnly
                                        className='border-0 focus:ring-0 outline-0 text-lg'
                                    />}

                                    {registeredMember.phone_number && <Input
                                        id='phone_number'
                                        name='phone_number'
                                        label='Phone Number (Optional)'
                                        placeholder='Phone Number'
                                        value={registeredMember.phone_number}
                                        loading={loading}
                                        readOnly
                                        className='border-0 focus:ring-0 outline-0 text-lg'
                                    />}

                                    {registeredMember.email && <Input
                                        type='email'
                                        id='email'
                                        name='email'
                                        label='Email (Optional)'
                                        placeholder='Email'
                                        value={registeredMember.email}
                                        loading={loading}
                                        readOnly
                                        className='border-0 focus:ring-0 outline-0 text-lg'
                                    />}

                                    <p className='mt-6'><strong>Note:</strong> Your personal information is encrypted and stored securely. We do not share your data with any third parties. Only authorized personnel can access your information in accordance with our privacy policy.</p>
                                </div>
                            </Modal>
                            <Button className='bg-primary text-white w-full text-nowrap' onClick={() => navigate('/online')}>
                                REGISTER OTHER ACCOUNT
                            </Button>
                        </div>
                    </div>
                </Card>
            </Page>

            
        </>
    )
}

export default Registered
