import CardButton from '../cardButton/CardButton';
import './JournalAddButton.css';


function JournalAddButton({clearForm}) {

    return (
        <CardButton className='journal-add' onClick={clearForm}>
            <img src="/plus.svg" alt="plus"/>
           <span>Новое воспоминание</span>
        </CardButton>
    )
}

export default JournalAddButton