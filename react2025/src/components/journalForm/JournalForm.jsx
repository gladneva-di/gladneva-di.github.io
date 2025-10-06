import { useContext, useEffect, useReducer, useRef } from 'react';
import Button from '../button/Button';
import styles from './JournalForm.module.css';
import { formReducer, INITIAL_STATE } from './JournalForm.state.js';
import Input from '../input/Input.jsx';
import { UserContext } from '../../context/user.context';

// const INITIAL_STATE = {
//     title: true,
//     text: true,
//     date: true,
// }

function JournalForm({ onSubmit, data, onDelete }) {

    const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);

    const { isValid, isFormReadyToSubmit, values } = formState;

    const titleRef = useRef();
    const dateRef = useRef();
    const textRef = useRef();
    const { userId } = useContext(UserContext);

    const focusError = (isValid) => {
        switch (true) {
            case !isValid.title:
                titleRef.current.focus();
                break;
            case !isValid.date:
                dateRef.current.focus();
                break;
            case !isValid.text:
                textRef.current.focus();
                break;

        }
    }

    useEffect(() => {
        if (!data) {
            dispatchForm({ type: 'CLEAR' });
            dispatchForm({ type: 'SET_VALUE', payload: { userId } });
        }
        dispatchForm({ type: 'SET_VALUE', payload: { ...data } });
    }, [data]);

    // const [formValidState, setFormValidState] = useState(INITIAL_STATE);

    useEffect(() => {
        let timerId;
        if (!isValid.date || !isValid.text || !isValid.title) {
            focusError(isValid);
            timerId = setTimeout(() => {
                console.log('Очистка поведения');
                dispatchForm({ type: 'RESET_VALIDITY' });
                // setFormValidState(INITIAL_STATE);
            }, 2000)
        }
        return () => {
            clearTimeout(timerId);
        }

    }, [isValid])

    useEffect(() => {
        if (isFormReadyToSubmit) {
            console.log('очистка формы')
            onSubmit(values);
            dispatchForm({ type: 'CLEAR' });
            dispatchForm({ type: 'SET_VALUE', payload: { userId } });
        }

    }, [isFormReadyToSubmit, values, onSubmit, userId])

    const addJournalItem = (e) => {
        e.preventDefault();
        dispatchForm({ type: 'SUBMIT' });
    }

    useEffect(() => {
        dispatchForm({ type: 'SET_VALUE', payload: { userId } });
    }, [userId])

    const onChange = (e) => {
        dispatchForm({ type: 'SET_VALUE', payload: { [e.target.name]: e.target.value } });
    }

    const deleteJournalItem = () => {
        onDelete(data.id);
        dispatchForm({ type: 'CLEAR' });
        dispatchForm({ type: 'SET_VALUE', payload: { userId } });
    }


    return (

        <form className={styles['journal-form']} onSubmit={addJournalItem}>
            <div className={styles['form-row']}>
                <Input appearence="title" type="text" name="title" isValid={isValid.title} ref={titleRef} onChange={onChange} value={values.title} />
                {data?.id && <button className={styles['delete']} type='button' onClick={deleteJournalItem}>
                    <img src='/del.svg' alt="Кнопка удалить" />
                </button>}
            </div>
            <div className={styles['form-row']}>
                <label htmlFor="date" className={styles['form-label']}>
                    <img src="/date.svg" alt="Иконка календаря" />
                    <span>Дата</span>
                </label>
                <Input type="date" id="date" name="date" isValid={isValid.date} ref={dateRef} onChange={onChange} value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ''} />
            </div>
            <div className={styles['form-row']}>
                <label htmlFor="tag" className={styles['form-label']}>
                    <img src="/dir.svg" alt="Иконка папки" />
                    <span>Метки</span>
                </label>
                <Input type="text" name="tag" isValid={isValid.text} onChange={onChange} value={values.tag} id="tag" />
            </div>
            <textarea name="text" ref={textRef} onChange={onChange} value={values.text} id="" cols="30" rows="10"></textarea>
            <Button>Сохранить</Button>
        </form>
    )
}

export default JournalForm