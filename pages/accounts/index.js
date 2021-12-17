import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CreateAccount from '../../components/Accounts/CreateAccount';
import EditAccount from '../../components/Accounts/EditAccount';
import ViewReports from '../../components/Accounts/ViewReports';
import Budget from '../../components/Accounts/Budget';
import { UPDATE_SUBMENU } from '../../redux/actionTypes';
import {getSession} from 'next-auth/client';
import { useRouter } from 'next/router';

const Accounts = () => {
    const dispatch = useDispatch();
    const {submenu} = useSelector(state => state.submenu); //Subscribe to submenu state from Redux
    const router = useRouter();
    let session;
    
    let activeSubmenuEntry;

    useEffect(() => {
        //When user clicks on Accounts menu button, give the submenu state from Redux its default values
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
        /*  This function gets the current user session. If there is no session then no 
            user has logged in, and the user is then redirected to the signin page. */

            session = await getSession(); //Get session

            if (!session) { //Redirect if no session availible
                router.push({
                    pathname: '/signin',
                    query: {
                        text: true,
                    }
                });
            }
        }
    }, []);
    
    //Checking if the user has clicked on one of the submeny buttons. 
    //If thats the case, the component representing the active submenu is saved
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
    }
    

    return (
        <>
            {activeSubmenuEntry} {/* Return the saved component representing the active submenu item */}
        </>
    );
};

export default Accounts;

