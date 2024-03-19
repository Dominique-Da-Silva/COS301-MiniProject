import { useState } from 'react';
import { signUpNewUser } from '@utils/index';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const SignUp = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const status = await signUpNewUser(form.email, form.password);

    if (status === "error") {
      console.error('Error signing up');
    } else {
      navigate('/profile'); // Redirect to profile page if user is logged in
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
        </label>
        <label>
          Password:
          <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
        </label>
        <input type="submit" value="Sign Up" />
      </form>
    </div>
  );
};

export default SignUp;