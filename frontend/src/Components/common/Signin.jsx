import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../../assets/NavBar'
import axios from "axios"
import { DECODE_USER_DEV, SIGIN_URL_DEV } from '../../constants/constant'
import "../../styles/Signin.css"
import Alert from '../../assets/Alert'

const Signin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const token = localStorage.getItem("jwt");
  const [alert, setalert] = useState(null);

  useEffect(() => {
    if (token) {
      axios.post(DECODE_USER_DEV, "", {
        headers: {
          'authorization': token
        }
      })
        .then(res => {
          if (res.data.role === "vendor") {
            window.location.href = "/vendorProducts"
          } else if (res.data.role == "user") {
            window.location.href = "/products"
          } else {
            window.location.href = "/allProducts"
          }
        })
    }
  }, [])


  const signInUser = async () => {
    try {
      if (!email || !password) {
        setalert({
          msg: "Please Fill All Data !!!",
          type: "danger"
        })
        setTimeout(() => {
          setalert(null)
        }, 1000);
      } else {
        const response = await axios.post(SIGIN_URL_DEV, {
          email,
          password
        })
        const data = response.data;
        if (!data.token) {
          setalert({
            msg: data.message,
            type: "danger"
          })
          setTimeout(() => {
            setalert(null)
          }, 1000);
        } else {
          localStorage.setItem("jwt", data.token)
          const responseNext = await axios.post(DECODE_USER_DEV, "", {
            headers: {
              'authorization': data.token
            }
          })
          const nextData = await responseNext.data;
          const role = nextData.role;
          if (role === "vendor") {
            window.location.href = "/vendorProducts"
          } else if (role == "user") {
            window.location.href = "/products"
          } else {
            window.location.href = "/allProducts"
          }
        }
      }
    } catch (error) {
      console.log(error)
      setalert({
        msg: "Network Error !!!",
        type: "danger"
      })
      setTimeout(() => {
        setalert(null)
      }, 1000);
    }
  }

  return (
    <>
      <NavBar />
      <Alert alert={alert} />
      <div className="card mx-auto">
        <div className="card-body">
          <h5 className="card-title text-light text-center">Login Here</h5>
          <div className="mb-3">
            <label className="form-label text-light">Email or UserName</label>
            <input type="email" className="form-control" placeholder="Enter your Email or UserName" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label text-light">Password</label>
            <input type="password" className="form-control" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        <button className="btn btn-primary w-50 mx-auto mb-4" onClick={signInUser}>Sign In</button>
        <Link style={{ color: "blue", cursor: "pointer", textDecoration: "none" }} className="mx-auto" to="/forgetPassword">Forget Password</Link>
        <p className='text-light text-center mt-2'>New To Meri Dukaan ?  <Link style={{ color: "blue", cursor: "pointer", textDecoration: "none" }} to="/signup">Sign Up Here</Link></p>
      </div>
    </>
  )
}

export default Signin