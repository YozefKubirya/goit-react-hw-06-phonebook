import React, { useState } from "react";
import { nanoid } from "nanoid";
import PropTypes from 'prop-types'
import { getContactValue,addContact } from '../../redux/contactSlice';
import { useDispatch, useSelector } from "react-redux";

export const Form = () =>{
const [name,setName]=useState('')
const[number,setNumber]=useState('');

 const contacts=useSelector(getContactValue);
 const dispatch=useDispatch();

 const createContact = ({name, number}) => ({
            id: nanoid(),
            name,
            number,
          });

const addContactToState=contact => contact = dispatch(addContact(contact));

   const  handleChange = event => {
      const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
   }
   const reset = () => {
      setName('');
      setNumber('')
   };

 const  handleSubmit = event => {
   event.preventDefault();
   const includeName = contacts.find(user => user.name === name);
            if (includeName) {
              alert(`${name} is already in contacs`);
            
            } else {
            addContactToState(createContact({name,number}));
            reset();
            }
          }
   
   
      const inputNameId = nanoid();
      const inputNumbId = nanoid();
      return (
         <>
            <form onSubmit={handleSubmit}>
               <label htmlFor={inputNameId}>Name
                  <input
                     id={inputNameId}
                     value={name}
                     onChange={handleChange}
                     type="text"
                     name="name"
                     pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                     title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                     required />
               </label>
               <label htmlFor={inputNumbId}>Number
                  <input
                     id={inputNumbId}
                     onChange={handleChange}
                     value={number}
                     type="tel"
                     name="number"
                     pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
                     title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                     required
                  />
               </label>
               <button type="submit" >Add contact</button>
            </form>
         </>)
   
}

Form.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
};