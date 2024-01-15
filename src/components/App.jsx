import React, { useEffect, useState } from 'react';

import { FormContact } from './FormContact/FormContact';
import { ContactsList } from './ContactsList/ContactsList';
import { ContactsFilter } from './ContactsFilter/ContactsFilter';

const CONTACTSLOCALST = 'contacts';

export function App() {
  const [contacts, setContacts] = useState(() => {
    const localData = localStorage.getItem(CONTACTSLOCALST);
    return JSON.parse(localData) ?? [];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(CONTACTSLOCALST, JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = obj => {
    if (isInContacts(obj)) {
      return alert(`${obj.name} is already in contacts`);
    }

    setContacts(prevState => [...prevState, obj]);

    localStorage.setItem(CONTACTSLOCALST, JSON.stringify(contacts));
  };

  function isInContacts({ name }) {
    return contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  }

  const handlerFilterChange = event => {
    setFilter(event.target.value);
  };

  const handleDeleteContact = contactId => {
    setContacts(prevState =>
      [...prevState].filter(contact => contact.id !== contactId)
    );
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      My phone book
      <FormContact handleAddContact={handleAddContact} />
      <h2>Contacts</h2>
      <ContactsFilter
        filter={filter}
        handlerFilterChange={handlerFilterChange}
      />
      {contacts.length > 0 && (
        <ContactsList
          options={filteredContacts}
          handleDeleteContact={handleDeleteContact}
        />
      )}
    </div>
  );
}
