import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // handle sign up form
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if(!fullName) {
      setError("Enter your full name");
      return;
    }

    if(!validateEmail(email)) {
      setError("Enter a valid email");
      return;
    }

    if(!password) {
      setError("Enter password");
      return;
    }

    // Signup API Call
    
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center ">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today to uplift yourself
        </p>

        <form onSubmit={handleSignUp}>

          <ProfilePhotoSelector
            image={profilePic} 
            setImage={setProfilePic}
          />

          <div className="grid grid-col-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John"
              type="text"
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="abc@example.com"
              type="text"
            />

            <div className="col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="min 6 characters"
                type="password"
              />
            </div>
          </div>
          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button type='submit' className='btn-primary'>Let's Go</button>

          <p className='text-[13px] text-slate-800 mt-3 '>
            Looks like you are already a member? {" "}
            <Link className='font-medium text-primary underline' to='/login'>
              Login
            </Link>
            {" "} here.
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
