import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CreateAccount from '../../components/Accounts/CreateAccount';
import EditAccount from '../../components/Accounts/EditAccount';
import ViewReports from '../../components/Accounts/ViewReports';
import { UPDATE_SUBMENU } from '../../redux/actionTypes';

const Accounts = () => {
    useEffect(() => {
        dispatch({
            type: UPDATE_SUBMENU,
            payload: {
                submenu: [
                    {
                        name: 'Create account',
                        active: false,
                    },
                    {
                        name: 'Edit account',
                        active: false,
                    },
                    {
                        name: 'View reports',
                        active: false,
                    }
                ]
            }
        });
    }, []);
    const dispatch = useDispatch();
    const {submenu} = useSelector(state => state.submenu);
    let activeSubmenuEntry;
    submenu.forEach((elem) => {
        if (elem.active === true) {
            switch (elem.name) {
                case 'Create account':
                    activeSubmenuEntry = <CreateAccount />
                    break;
                case 'Edit account':
                    activeSubmenuEntry = <EditAccount />
                    break;
                case 'View reports':
                    activeSubmenuEntry = <ViewReports />
                    break;
            }
        }
    });

    return (
        <>
            {activeSubmenuEntry}
        </>
    );
};

export default Accounts;