import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import UpdateUserNav from '../../assets/UpdateUserNav'
import axios from 'axios';
import { DELETE_USER_DEV, SHOW_USERS_DEV } from '../../constants/constant';
import "../../styles/UpdateProduct.css"
import Alert from '../../assets/Alert';

const DeleteUser = () => {
    const token = localStorage.getItem("jwt")
    const [Data, setData] = useState([])
    const { id } = useParams();
    const [alert, setalert] = useState(null)

    useEffect(() => {
        if (!token) {
            window.location.href = "/"
        } else {
            axios.get(SHOW_USERS_DEV, {
                headers: {
                    'authorization': token
                }
            }).then(res => {
                setData(res.data.filter(usr => usr.userId === id));
            })
        }
    }, [])

    const deleteUser = async () => {
        try {
            const res = await axios.delete(DELETE_USER_DEV + id, {
                headers: {
                    'authorization': token
                }
            })
            const data = await res.data;
            if (data.message) {
                setalert({
                    msg: data.message,
                    type: "success"
                })
                setTimeout(() => {
                    setalert(null)
                    window.history.back();
                }, 1000);
            } else {
                console.log(data)
            }
        } catch (error) {
            setalert({
                msg: "Network Error !!!",
                type: "danger"
            })
            setTimeout(() => {
                setalert(null)
            }, 1000);
        }
    }

    const goOneStepBack = () => {
        window.history.back();
    }

    return (
        <>
            <UpdateUserNav />
            <Alert alert={alert}/>
            <div className="card mx-auto">
                <div className="card-body">
                    <h5 className="card-title text-light text-center">Delete User</h5>
                    {
                        Data.map(val => {
                            return (
                                <>
                                    <div className="mb-3">
                                        <label className="form-label text-light">User Name</label>
                                        <input type="email" className="form-control" id="formGroupExampleInput" value={val.userName} onChange={(e) => { }} />
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
                <div className="d-inline-flex mb-2">
                    <button className="btn btn-primary w-50 mx-2" onClick={deleteUser}>Delete User</button>
                    <button className="btn btn-success w-50 mx-2" onClick={goOneStepBack}>Back</button>
                </div>
            </div>
        </>
    )
}

export default DeleteUser