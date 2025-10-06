import './App.css';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/leftPanel/LeftPanel';
import JournalList from './components/journalList/JournalList';
import Header from './components/header/Header';
import JournalAddButton from './components/journalAddButton/journalAddButton';
import JournalForm from './components/journalForm/JournalForm';
import { useLocalStorage } from './hooks/use-localstorage.hook';
import { UserContextProvider } from './context/user.context';
import { useState } from 'react';

const INITIAL_DATA = [
  // {
  //   id: 1,
  //   title: "Поход в годы",
  //   date: new Date(),
  //   text: "Горные походы открывают удивительные природные ландшафты, испытывают туристов физически и морально, дают возможность почувствовать себя первопроходцем."
  // },
  // {
  //   id: 2,
  //   title: "Поход в годы 2",
  //   date: new Date(),
  //   text: "Горные походы открывают 2"
  // }

]

function mapItems(items) {
  if (!items) {
    return [];
  }
  return items.map(i => ({
    ...i,
    date: new Date(i.date)
  }));
}

function App() {

  const [items, setItems] = useLocalStorage('data');
  const [selectedItem, setSelectedItem] = useState(null);

  console.log("App");

  const addItem = item => {

    if (!item.id) {
      setItems([...mapItems(items), {
        ...item,
        date: new Date(item.date),
        id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1
      }]);
    } else {
      setItems([...mapItems(items).map(i => {
        if(i.id === item.id) {
          return {
            ...item
          }
        }
        return i;
      })])
    };
  }

  const deleteItem = (id) => {
    setItems([...items.filter(i => i.id !== id)])
  }


  return (
    <UserContextProvider>
      <div className="app">
        <LeftPanel>
          <Header />
          <JournalAddButton clearForm={() => setSelectedItem(null)} />

          <JournalList items={mapItems(items)} setItem={setSelectedItem} />
        </LeftPanel>
        <Body>
          <JournalForm onSubmit={addItem} data={selectedItem} onDelete={deleteItem}/>
        </Body>
      </div>
    </UserContextProvider>
  )
}

export default App
