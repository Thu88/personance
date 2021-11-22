import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_SUBMENU } from '../../redux/actionTypes';

const Accounts = () => {
    const dispatch = useDispatch();

    dispatch({
        type: UPDATE_SUBMENU,
        payload: {
            submenu: [
                {
                    name: 'Create account',
                    active: false,
                }
            ]
        }
    });

    return (
        <>
            <h1>Accounts</h1>
        </>
    );
};

export default Accounts;