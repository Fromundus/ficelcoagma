import React from 'react'
import PopUp from '../components/ui/PopUp';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Logo from '../components/ui/Logo';
import Card from '../components/ui/Card';
import Form from '../components/ui/Form';
import { Input } from '../components/ui/Input';
import api from '../api/axios';
import Select from '../components/ui/Select';
import validPhilippineIDs from '../data/ids';
import pushToast from '../lib/toast';
import { useAuth } from '../store/auth';

type FormData = {
    account_number?: string;
    book?: string;
    name?: string;
    address?: string;
    occupant?: string;
    id_presented?: string;
    id_number?: string;
    phone_number?: string;
    email?: string;
    created?: string;
    createdBy?: string;
    status?: string;
}

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
    created?: string;
    createdBy?: string;
    status?: string;
}

type ValidatedData = {
    account_number?: string;
    book?: string;
    name?: string;
    address?: string;
    occupant?: string;
    id_presented?: string;
    id_number?: string;
    phone_number?: string;
    email?: string;
    created?: string;
    createdBy?: string;
    status?: string;
}

const AccountRegistration = ({ role }: { role?: string }) => {
    const { user } = useAuth();
    const [validated, setValidated] = React.useState<boolean>(false);
    const [consentGiven, setConsentGiven] = React.useState<boolean>(false);
    const [popUp, setPopUp] = React.useState<boolean>(false);
    const [checked, setChecked] = React.useState<boolean>(false);

    const [memberNotFoundPopUp, setMemberNotFoundPop] = React.useState<boolean>(false);

    const navigate = useNavigate();

    let memberValidationUrl = "";
    let registerMemberUrl = "";

    if(role){
        memberValidationUrl = `/logged/member`;
        registerMemberUrl = `/logged/member-register`;
    } else {
        memberValidationUrl = `/member`;
        registerMemberUrl = `/member-register`;
    }

    const [loading, setLoading] = React.useState<boolean>(false);
    const [data, setData] = React.useState<FormData>({
        account_number: "",
        book: "",
        name: "",
        address: "",
        occupant: "",
        id_presented: "",
        id_number: "",
        phone_number: "",
        email: "",
        created: "",
        createdBy: "",
        status: "",
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
        created: "",
        createdBy: "",
        status: "",
    });

    const [validatedData, setValidatedData] = React.useState<ValidatedData>({
        account_number: "",
        book: "",
        name: "",
        address: "",
        occupant: "",
        id_presented: "",
        id_number: "",
        phone_number: "",
        email: "",
        created: "",
        createdBy: "",
        status: "",
    });

    const [errorMessage, setErrorMessage] = React.useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setData((prev) => {
            return {
            ...prev,
            [name]: value
            }
        })
    }

    function methodOfRegistration(role: string | undefined){
        if(role === "admin"){
            return "admin";
        } else if (role === "pre"){
            return "prereg";
        } else if (role === "ons"){
            return "onsite"
        } else {
            return "online"
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors(null);

        const dataToSend = {
            ...data,
            registration_method: methodOfRegistration(role),
        }

        try {
            const res = await api.post(`${memberValidationUrl}`, dataToSend);
            console.log(res);
            setLoading(false);
            
            if(res.status === 200){
                setValidated(true);

                setValidatedData({
                    account_number: res.data.data.account_number,
                    book: res.data.data.book,
                    name: res.data.data.name,
                    address: res.data.data.address,
                    occupant: res.data.data.occupant,
                    id_presented: res.data.data.id_presented,
                    id_number: res.data.data.id_number,
                    phone_number: res.data.data.phone_number,
                    email: res.data.data.email,
                    created: res.data.data.created,
                    createdBy: res.data.data.createdBy,
                    status: res.data.data.status,
                });
            } else if (res.status === 201){
                if(role){
                    pushToast("This member is already registered.");
                } else {
                    navigate(`/registered/${res.data.data.reference_number}`);
                }
            }
        } catch (err: any) {
            console.log(err);
            setLoading(false);
            setErrors(err.response.data.message);

            if(err.response.status === 404){
                setMemberNotFoundPop(true);
                setErrorMessage(err.response.data.message);
            } else if (err.response.status === 400){
                setMemberNotFoundPop(true);
                setErrorMessage(err.response.data.message);
            }
        }
    }

    const handleSubmitComplete = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors(null);

        const completeData = {
            account_number: validatedData.account_number ?? data.account_number ,
            book: validatedData.book ?? data.book ,
            name: validatedData.name ?? data.name ,
            address: validatedData.address ?? data.address ,
            occupant: validatedData.occupant ?? data.occupant ,
            id_presented: validatedData.id_presented ?? data.id_presented ,
            id_number: validatedData.id_number ?? data.id_number ,
            phone_number: validatedData.phone_number ?? data.phone_number ,
            email: validatedData.email ?? data.email ,
            created: validatedData.created ?? data.created ,
            createdBy: validatedData.createdBy ?? data.createdBy ,
            status: validatedData.status ?? data.status ,
            registration_method: methodOfRegistration(role),
            created_by: role ? (user?.name)?.toString() : null,
        }

        try {
            const res = await api.post(`${registerMemberUrl}`, completeData);
            console.log(res);
            setLoading(false);
            if(res.status === 200){
                if(role){
                    pushToast("Registered Successfully!");
                    setValidated(false);
                    setData({
                        account_number: "",
                        book: "",
                        name: "",
                        address: "",
                        occupant: "",
                        id_presented: "",
                        id_number: "",
                        phone_number: "",
                        email: "",
                        created: "",
                        createdBy: "",
                        status: "",
                    });
                } else {
                    navigate(`/registered/${res.data.data.reference_number}`);
                }
            } else if (res.status === 201){
                if(role){
                    pushToast("This member is already registered");
                } else {
                    navigate(`/registered/${res.data.data.reference_number}`);
                }
            }
        } catch (err: any) {
            console.log(err);
            setLoading(false);
            setErrors(err.response.data.message);
        }
    }

    React.useEffect(() => {
        const saved = localStorage.getItem("CONSENT_KEY");
        if(!saved){
            setPopUp(true);
            !role && document.body.classList.add('no-scroll');
        } else {
            setPopUp(false);
            setConsentGiven(true);
            !role && document.body.classList.remove('no-scroll');
        }
    }, []);

    const handleAgree = () => {
        localStorage.setItem(
            "CONSENT_KEY",
            JSON.stringify({ agreed_at: new Date().toISOString() })
        );
        !role && document.body.classList.remove('no-scroll');
        setConsentGiven(true);
        setPopUp(false);
    }

    const handleContinue = () => {
        if(checked){
            handleAgree();
        } else {
            setConsentGiven(false);
            setPopUp(true);
        }
    }

    // console.log(data);

    return (
        <>
            {!role && <PopUp title='WELCOME TO 46th AGMA!' popUp={popUp} setPopUp={setPopUp}>
                <div className='flex flex-col gap-6'>
                    <div className='w-full flex justify-center'>
                        <Logo className='w-full' />
                    </div>
                    <p>To continue, you must agree to our data privacy policy.</p>
                    <div className="w-full h-96 overflow-auto p-4 bg-white border border-gray-300 rounded text-sm text-graphite space-y-6">
                        <span className='font-bold text-primary text-lg'>Data Privacy Policy</span>
                        <p>Effective Date: August 1, 2025</p>

                        <section>
                            <h2 className="font-semibold mb-2">1. Information We Collect</h2>
                            <p className="mb-2">We may collect the following types of information:</p>
                            <ul className="list-disc pl-6 space-y-1">
                            <li>Personal Identification Information (e.g., name, email, phone)</li>
                            <li>Personal Documents</li>
                            <li>User-Provided Content</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-semibold mb-2">2. How We Use Your Information</h2>
                            <ul className="list-disc pl-6 space-y-1">
                            <li>To provide and improve our services</li>
                            <li>To process transactions and send updates</li>
                            <li>To respond to inquiries and support requests</li>
                            <li>To send promotional emails (with consent)</li>
                            <li>To comply with legal requirements</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-semibold mb-2">3. Sharing and Disclosure</h2>
                            <p className="mb-2">We do not sell your data. We may share data with:</p>
                            <ul className="list-disc pl-6 space-y-1">
                            <li>Service providers (e.g., hosting, analytics)</li>
                            <li>Legal authorities if required by law</li>
                            <li>Third parties in a business transfer</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-semibold mb-2">4. Your Rights</h2>
                            <p className="mb-2">You may have rights to:</p>
                            <ul className="list-disc pl-6 space-y-1">
                            <li>Access and correct your personal data</li>
                            <li>Request deletion of your data</li>
                            <li>Object to or restrict processing</li>
                            <li>Withdraw consent at any time</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-semibold mb-2">5. Contact Us</h2>
                            <p className="mb-2">If you have questions, contact us at:</p>
                            {/* <p>Email: <a href="mailto:johncarlcastrocueva@gmail.com" className="text-blue-600 hover:underline">johncarlcastrocueva@gmail.com</a></p>
                            <p>Phone: 09605510756</p>
                            <p>Address: Salvacion, Panganiban, Catanduanes</p> */}
                        </section>

                        <p>Last updated: August 1, 2025</p>
                        </div>

                    <div className='flex gap-2'>
                        <input
                            className='w-4 h-4 cursor-pointer'
                            id='agreement' 
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => setChecked(e.target.checked)}
                        />
                        <label htmlFor="agreement" className='font-semibold cursor-pointer'>
                            I have read and agree to the Data Privacy Policy.
                        </label>
                    </div>
                    <Button className='w-full bg-primary text-white' disabled={!checked} onClick={handleContinue}>
                        Continue
                    </Button>
                </div>
            </PopUp>}

            <div className='w-full'>
                {!validated && <Card className={`w-full ${!role ? "max-w-lg" : "max-w-md"} mx-auto`} title='Member Registration' childrenClassName='p-6 flex flex-col gap-6'>
                    {!role && <div className='w-full flex justify-center'>
                        <Logo className='w-full' />
                    </div>}
                    <Form onSubmit={handleSubmit}>
                        <Input
                            id='account_number'
                            name='account_number'
                            label='Account Number'
                            placeholder='XXXXXXXX'
                            onChange={handleChange}
                            value={data.account_number}
                            loading={loading}
                            disabled={loading || (!role ? !consentGiven : false)}
                            error={errors?.account_number}
                            minLength={8}
                            maxLength={8}
                        />
                        <Input
                            id='book'
                            name='book'
                            label='Book Number'
                            placeholder='XXXXXX'
                            onChange={handleChange}
                            value={data.book}
                            loading={loading}
                            disabled={loading || (!role ? !consentGiven : false)}
                            error={errors?.book}
                            minLength={6}
                            maxLength={6}
                        />
                        <Button
                            className='bg-primary text-white'
                            loading={loading}
                            disabled={loading || !data.account_number || !data.book || (!role ? !consentGiven : false)}
                        >
                            Validate
                        </Button>
                    </Form>
                </Card>}

                {validated && <Card className={`w-full ${!role && "max-w-lg"} mx-auto`} title='Complete Member Information' childrenClassName='p-6 flex flex-col gap-6'>
                    {!role && <div className='w-full flex justify-center'>
                        <Logo className='w-full' />
                    </div>}
                    <Form onSubmit={handleSubmitComplete}>
                        <div className={`grid grid-cols-1 ${role && "lg:grid-cols-2"} gap-4`}>
                            <Input
                                id='account_number'
                                name='account_number'
                                label='Account Number'
                                placeholder='XXXXXXXX'
                                onChange={handleChange}
                                value={validatedData.account_number}
                                loading={loading}
                                disabled={loading || (!role ? !consentGiven : false) || validatedData.account_number !== null}
                                withExistingData={validatedData.account_number !== null}
                                error={errors?.account_number}
                                maxLength={8}
                            />
                            <Input
                                id='book'
                                name='book'
                                label='Book Number'
                                placeholder='XXXXXX'
                                onChange={handleChange}
                                value={validatedData.book}
                                loading={loading}
                                disabled={loading || (!role ? !consentGiven : false) || validatedData.book !== null}
                                withExistingData={validatedData.book !== null}
                                error={errors?.book}
                                maxLength={6}
                            />
                            <Input
                                id='name'
                                name='name'
                                label='Name'
                                placeholder='Name'
                                onChange={handleChange}
                                value={validatedData.name}
                                loading={loading}
                                disabled={loading || (!role ? !consentGiven : false) || validatedData.name !== null}
                                withExistingData={validatedData.name !== null}
                                error={errors?.name}
                            />
                            <Input
                                id='address'
                                name='address'
                                label='Address'
                                placeholder='Address'
                                onChange={handleChange}
                                value={validatedData.address}
                                loading={loading}
                                disabled={loading || (!role ? !consentGiven : false) || validatedData.address !== null}
                                withExistingData={validatedData.address !== null}
                                error={errors?.address}
                            />
                            <Input
                                id='occupant'
                                name='occupant'
                                label='Occupant'
                                placeholder='Occupant'
                                onChange={handleChange}
                                value={validatedData.occupant}
                                loading={loading}
                                disabled={loading || (!role ? !consentGiven : false) || validatedData.occupant !== null}
                                withExistingData={validatedData.occupant !== null}
                                error={errors?.occupant}
                            />

                            <Select
                                id='id_presented'
                                name='id_presented'
                                label='Presented ID'
                                placeholder='Please Select an ID'
                                options={validPhilippineIDs} 
                                onChange={handleChange} 
                                value={data.id_presented}
                                loading={loading}
                                disabled={loading || (!role ? !consentGiven : false) || validatedData.id_presented !== null}
                                withExistingData={validatedData.id_presented !== null}
                                error={errors?.id_presented}
                            />

                            <Input
                                id='id_number'
                                name='id_number'
                                label='Presented ID Number'
                                placeholder='Presented ID Number'
                                onChange={handleChange}
                                value={validatedData.id_number}
                                loading={loading}
                                disabled={loading || (!role ? !consentGiven : false) || validatedData.id_number !== null || data.id_presented === null}
                                withExistingData={validatedData.id_number !== null}
                                error={errors?.id_number}
                            />

                            <Input
                                id='phone_number'
                                name='phone_number'
                                label='Phone Number (Optional)'
                                placeholder='Phone Number'
                                onChange={handleChange}
                                value={validatedData.phone_number}
                                loading={loading}
                                disabled={loading || (!role ? !consentGiven : false) || validatedData.phone_number !== null}
                                withExistingData={validatedData.phone_number !== null}
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
                                value={validatedData.email}
                                loading={loading}
                                disabled={loading || (!role ? !consentGiven : false) || validatedData.email !== null}
                                withExistingData={validatedData.email !== null}
                                error={errors?.email}
                            />
                        </div>

                        <Button
                            className='bg-primary text-white'
                            loading={loading}
                            disabled={loading || (!role ? !consentGiven : false)}
                        >
                            Submit
                        </Button>
                    </Form>
                </Card>}
            </div>

            {errorMessage && <PopUp title={"Error Message"} popUp={memberNotFoundPopUp} setPopUp={setMemberNotFoundPop} withClose={true}>
                <div className='flex flex-col gap-6'>
                    <p className='text-red-500 text-center'>{errorMessage}</p>
                    <Button className='w-full bg-primary text-white' onClick={() => setMemberNotFoundPop(false)}>
                        Close
                    </Button>
                </div>
            </PopUp>}
        </>
    )
}

export default AccountRegistration
