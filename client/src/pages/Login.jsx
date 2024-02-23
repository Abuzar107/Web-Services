import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../store/auth.jsx"
import { toast } from 'react-toastify';

const URL = 'http://localhost:5000/auth/login';

export const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const {stroreTokenInLS} = useAuth();

  // let handle the input field value
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        "body": JSON.stringify(user)
    });
    if(response.ok){
      const res_data = await response.json();
      stroreTokenInLS(res_data.token);
      setUser({username: "", password: ""});
      toast.success('Login Successfully');
      navigate("/");
    }else{
      //for zod validation
      const jsonData = await response.json();
      console.log("from login", jsonData.extraDetails);
      toast.error(jsonData.extraDetails ? jsonData.extraDetails : jsonData.message);
    }
    console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                <img
                  src="/images/register.png"
                  alt="a nurse with a cute look"
                  width="400"
                  height="500"
                />
              </div>
              {/* our main registration code  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Login form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="email"
                    />
                  </div>

                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="password"
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Register Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Login