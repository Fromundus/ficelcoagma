// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../api/axios';
// import { useAuth } from '../store/auth';

// export default function Register() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [role, setRole] = useState<'admin' | 'user'>('user');
//   const [password, setPassword] = useState('');
//   const [errors, setErrors] = useState<string | null>(null);
//   const navigate = useNavigate();
//   const login = useAuth((state) => state.login);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setErrors(null);

//     try {
//       // Register user
//       await api.post('/register', {
//         name,
//         email,
//         password,
//         role,
//       });

//       // Auto-login after registration
//       const res = await api.post('/login', { email, password });
//       login(res.data.user, res.data.access_token);
//       navigate('/');
//     } catch (err: any) {
//       if (err.response?.data?.errors) {
//         const messages = Object.values(err.response.data.errors)
//           .flat()
//           .join('\n');
//         setErrors(messages);
//       } else {
//         setErrors('Registration failed.');
//       }
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-4 border rounded">
//       <h2 className="text-xl font-bold mb-4">Register</h2>
//       {errors && <div className="text-red-500 mb-4 whitespace-pre-line">{errors}</div>}
//       <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="border p-2 rounded"
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="border p-2 rounded"
//           required
//         />
//         <select
//           value={role}
//           onChange={(e) => setRole(e.target.value as 'admin' | 'user')}
//           className="border p-2 rounded"
//         >
//           <option value="user">User</option>
//           <option value="admin">Admin</option>
//         </select>
//         <input
//           type="password"
//           placeholder="Password (min 6)"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="border p-2 rounded"
//           required
//         />
//         <button type="submit" className="bg-blue-600 text-white py-2 rounded">
//           Register
//         </button>
//       </form>
//     </div>
//   );
// }

import { useState } from 'react';
import { useAuth } from '../store/auth';
import api from '../api/axios';
import { Input } from '../components/ui/Input';
import Form from '../components/ui/Form';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Page from '../components/ui/Page';

type LoginData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

type Errors = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export default function Register() {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<LoginData>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState<Errors | null>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const login = useAuth((state) => state.login);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setErrors(null);
    setLoading(true);

    try {
      // Register user
      await api.post('/register', data);
      setLoading(false);

      // Auto-login after registration
      const res = await api.post('/login', data);
      login(res.data.user, res.data.access_token);
      // navigate('/');
    } catch (err: any) {
      console.log(err);
      setErrors(err.response.data.errors);
      setLoading(false);
    }
  };

  return (
    <Page className='flex items-center justify-center'>
      <Card className='p-6 max-w-lg mx-auto w-full'>
        <Form className='items-center' onSubmit={handleSubmit}>
          <span className='font-bold text-lg'>Register</span>
          <Input 
            id='name'
            name='name'
            placeholder='Name'
            onChange={handleChange}
            value={data.name}
            error={errors?.name}
            loading={loading}
            disabled={loading}
          />
          <Input 
            id='email'
            name='email'
            placeholder='Email'
            onChange={handleChange}
            value={data.email}
            error={errors?.email}
            loading={loading}
            disabled={loading}
          />
          <Input
            type='password'
            id='password'
            name='password'
            placeholder='Password'
            onChange={handleChange}
            value={data.password}
            loading={loading}
            disabled={loading}
          />
          <Input
            type='password'
            id='password_confirmation'
            name='password_confirmation'
            placeholder='Password Confirmation'
            onChange={handleChange}
            value={data.password_confirmation}
            error={errors?.password}
            loading={loading}
            disabled={loading}
          />

          <Button 
            className='bg-primary text-white w-full' 
            disabled={!data.email || !data.password}
            loading={loading}  
          >
            Register
          </Button>
          
          <Link className='text-sm' to={'/onsite'}>
            Already have an account? <span className='text-primary font-semibold'>Login</span>
          </Link>
        </Form>
      </Card>
    </Page>
  );
}

