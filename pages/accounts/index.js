import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CreateAccount from '../../components/Accounts/CreateAccount';
import EditAccount from '../../components/Accounts/EditAccount';
import ViewReports from '../../components/Accounts/ViewReports';
import Budget from '../../components/Accounts/Budget';
import { UPDATE_SUBMENU } from '../../redux/actionTypes';
import { useSession, getSession} from 'next-auth/client';
import { useRouter } from 'next/router';

const Accounts = () => {
    const dispatch = useDispatch();
    const {submenu} = useSelector(state => state.submenu);
    const router = useRouter();
    let session;
    
    let activeSubmenuEntry;

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
                    },
                    {
                        name: 'Budget',
                        active: false,
                    }
                ]
            }
        });
        getUser();
        async function getUser() {
            session = await getSession();
            if (!session) {
                router.push({
                    pathname: '/signin',
                    query: {
                        text: true,
                    }
                });
            }
        }
    }, []);
    
    if (true) {
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
                    case 'Budget':
                        activeSubmenuEntry = <Budget />
                        break;
                }
            }
        });
    } else {
        /* router.push({
            pathname: '/signin',
            query: {
                text: true,
            }
        }); */
    }
    

    return (
        <>
            {activeSubmenuEntry}
        </>
    );
};

export default Accounts;

