import './JournalList.css';
import JournalItem from '../journalItem/JournalItem';
import CardButton from '../cardButton/CardButton';
import { useContext, useMemo } from 'react';
import { UserContext } from '../../context/user.context';




function JournalList({ items, setItem }) {

    const sortItems = (a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    }


    const { userId } = useContext(UserContext);

    const filteredItems = useMemo(() => items
        .filter(el => el.userId === userId)
        .sort(sortItems), [items, userId]);


    if (items.length === 0) {

        return <p>Записей пока нет</p>;
    }

    return <>{
        filteredItems.map(el => (
            <CardButton key={el.id} onClick={() => setItem(el)}>
                <JournalItem title={el.title} text={el.text} date={el.date} />
            </CardButton>
        ))}</>;
}

export default JournalList