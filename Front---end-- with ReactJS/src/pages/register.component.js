import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../slices/user.slice';
import { useNavigate } from 'react-router-dom';

function RegisterComponent() {
    const dispatch = useDispatch();
    const navigate  = useNavigate();
    const { register, handleSubmit, formState: { errors }} = useForm();
    const { data, error } = useSelector((state) => state.userInfo);
    const registerUser = (data) => {
        console.log(data);
        dispatch(userRegister(data));
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
                    <h2 className='text-center mb-4'>Register</h2>
                    <form onSubmit={handleSubmit(registerUser)}>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">First Name</label>
                            <input type="text" name='firstName' className="form-control" {...register('firstName', {required: true})} id="firstName" placeholder="Please enter first name" />
                            <small className='text-danger'>{errors.firstName && <span>First Name is required</span>}</small>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Last Name</label>
                            <input type="text" name='lastName' className="form-control" {...register('lastName', {required: true})} id="lastName" placeholder="Please enter last name" />
                            <small className='text-danger'>{errors.lastName && <span>Last Name is required</span>}</small>
                        </div>
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
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Mobile No</label>
                            <input type="text" name='mobile' className="form-control" {...register('mobile', {required: true})} id="mobile" placeholder="Please enter Mobile No" />
                            <small className='text-danger'>{errors.mobile && <span>Mobile No is required</span>}</small>
                        </div>
                        <p className='text-danger'>{error && error.errorDescription}</p>
                        <input className='btn btn-success my-3' type="submit" placeholder="Register"/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterComponent;