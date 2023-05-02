import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../slices/user.slice';
import { useNavigate } from 'react-router-dom';

function LoginComponent() {
    const dispatch = useDispatch();
    const navigate  = useNavigate();
    const { register, handleSubmit, formState: { errors }} = useForm();
    const { data } = useSelector((state) => state.userInfo);
    const loginUser = (data) => {
        console.log(data);
        dispatch(userLogin(data));
    }
    useEffect(() => {
        if (data && data.userId) {
            navigate('/');
        }
    }, [data]);
    return (
        <div className="container text-start my-5">
            <div className="row">
                <div className="col-sm">
                    <h2 className='text-center mb-4'>Login</h2>
                    <form onSubmit={handleSubmit(loginUser)}>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                            <input type="email" name='email' className="form-control" {...register('email', {required: true})} id="email" placeholder="Please enter email" />
                            <small className='text-danger'>{errors.email && <span>Email is required</span>}</small>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
                            <input type="password" name='password' className="form-control" id="password" {...register('password', {required: true})} placeholder="Please enter password" />
                            <small className='text-danger'>{errors.password && <span>Password is required</span>}</small>
                        </div>
                        <input className='btn btn-success my-3' type="submit" placeholder="Login"/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent;