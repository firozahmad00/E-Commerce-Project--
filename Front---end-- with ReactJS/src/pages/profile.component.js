import { useEffect } from 'react';
import { getUserDataById } from '../slices/user.slice';
import { useDispatch, useSelector } from 'react-redux';

function ProfileComponent() {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.userInfo);
    useEffect(() => {
        dispatch(getUserDataById());
    }, []);
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-sm'>
                    <h2>My Profile</h2>

                    <div className='my-3'>
                        <h4>First Name: {userInfo.firstName}</h4>
                    </div>
                    <div className='my-3'>
                        <h4>Last Name: {userInfo.lastName}</h4>
                    </div>
                    <div className='my-3'>
                        <h4>Email: {userInfo.email}</h4>
                    </div>
                    <div className='my-3'>
                        <h4>Mobile: {userInfo.mobile}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileComponent;