// import styles from './SelectUser.module.css';
import { UserContext } from '../../context/user.context';
import { useContext } from 'react';
import styles from './SelectUser.module.css';




function SelectUser() {
    const { userId, setUserId } = useContext(UserContext);

    const changeUser = (e) => {
        setUserId(Number(e.target.value));
    }


    return (
        <>
            {/* <img className={styles.logo} src="/logo.svg" alt="Логотип журнала" /> */}
            <select className={styles['select']} name="user" id="user" value={userId} onChange={changeUser}>
                <option value="1">Антон</option>
                <option value="2">Вася</option>
            </select>
        </>
    )
}

export default SelectUser