import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import ContactsForm from 'components/ContactsForm/ContactsForm';
import ContactsList from 'components/ContactsList/ContactsList';
import Filter from 'components/Filter/Filter';

import styles from '../../styles/App.module.css';

const App = () => {
  const [phonebook, setPhonebook] = useState({
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
  });

  const [filter, setFilter] = useState({
    filter: '',
  });

  const addToList = contact => {
    const isInContacts = phonebook.contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isInContacts) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    const updatedContacts = [
      { id: nanoid(), ...contact },
      ...phonebook.contacts,
    ];

    setPhonebook(prevState => ({
      ...prevState,
      contacts: updatedContacts,
    }));
  };

  const removeFromList = contactId => {
    const updatedContacts = phonebook.contacts.filter(
      ({ id }) => id !== contactId
    );

    setPhonebook(prevState => ({
      ...prevState,
      contacts: updatedContacts,
    }));
  };

  const handleFilterChange = event => {
    const filterValue = event.target.value;
    setFilter(prevFilter => ({
      ...prevFilter,
      filter: filterValue,
    }));
  };

  const filteredContacts = phonebook.contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter.filter.toLowerCase())
  );

  return (
    <section className={styles.app}>
      <ContactsForm onSubmit={addToList} />
      <Filter filter={handleFilterChange} value={filter.filter} />
      <ContactsList
        contactList={filteredContacts}
        onContactRemove={removeFromList}
      />
    </section>
  );
};

export default App;

// import React, { Component } from 'react';
// import { nanoid } from 'nanoid';
// import ContactsForm from 'components/ContactsForm/ContactsForm';
// import ContactsList from 'components/ContactsList/ContactsList';
// import Filter from 'components/Filter/Filter';

// import styles from '../../styles/App.module.css';

// class App extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       phonebook: {
//         contacts: [
//           { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//           { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//           { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//           { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//         ],
//       },
//       filter: {
//         filter: '',
//       },
//     };
//   }

//   addToList = contact => {
//     const { phonebook } = this.state;
//     const isInContacts = phonebook.contacts.some(
//       ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
//     );

//     if (isInContacts) {
//       alert(`${contact.name} is already in contacts`);
//       return;
//     }

//     const updatedContacts = [
//       { id: nanoid(), ...contact },
//       ...phonebook.contacts,
//     ];

//     this.setState(prevState => ({
//       phonebook: {
//         ...prevState.phonebook,
//         contacts: updatedContacts,
//       },
//     }));
//   };

//   removeFromList = contactId => {
//     this.setState(prevState => ({
//       phonebook: {
//         ...prevState.phonebook,
//         contacts: prevState.phonebook.contacts.filter(
//           ({ id }) => id !== contactId
//         ),
//       },
//     }));
//   };

//   handleFilterChange = event => {
//     const filterValue = event.target.value;
//     this.setState(prevState => ({
//       filter: {
//         ...prevState.filter,
//         filter: filterValue,
//       },
//     }));
//   };

//   render() {
//     const { phonebook, filter } = this.state;
//     const filteredContacts = phonebook.contacts.filter(({ name }) =>
//       name.toLowerCase().includes(filter.filter.toLowerCase())
//     );

//     return (
//       <section className={styles.app}>
//         <ContactsForm onSubmit={this.addToList} />
//         <Filter filter={this.handleFilterChange} value={filter.filter} />
//         <ContactsList
//           contactList={filteredContacts}
//           onContactRemove={this.removeFromList}
//         />
//       </section>
//     );
//   }
// }

// export default App;
