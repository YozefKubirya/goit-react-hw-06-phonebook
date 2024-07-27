import React from "react";
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux";
import { getFilterValue } from '../../redux/filterSlice';
import { deleteContact, getContactValue } from '../../redux/contactSlice'
export  const Contacts=() => {
  const filter= useSelector(getFilterValue);
  const contacts=useSelector(getContactValue);
  const dispatch=useDispatch();
  const handleDelete = id => dispatch(deleteContact(id));
  const filterContacts= contacts.filter(contact=>contact.name.toLowerCase().includes(filter.toLowerCase()))
   return <>
        <ul>
          {filterContacts.map(({ name, id, number,}) => {
              return <li key={id}>{name}: {number}
                <button key={id} type="button" onClick={()=>handleDelete(id)}> delete</button>
                </li>
            })}
      </ul>
    </>
}
Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
};