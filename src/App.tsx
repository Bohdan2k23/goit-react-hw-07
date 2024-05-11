import css from "./App.module.css";
import ContactList from "./components/ContactList/ContactList";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactForm from "./components/ContactForm/ContactForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchContacts } from "./redux/contactsOps";
import { selectError, selectLoading } from "./redux/contactsSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts() as any);
  }, [dispatch]);

  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);

  return (
    <>
      <div>
        <h1 className={css.title}>Phonebook</h1>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error</p>}
        <ContactForm />
        <SearchBox />
        <ContactList />
      </div>
    </>
  );
}

export default App;
