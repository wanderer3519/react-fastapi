import React, { useEffect, useState } from 'react'
import moment from 'moment'

import ErrorMessage from './ErrorMessage'
import { UserContext } from '../context/UserContext'
import LeadModal from './LeadModal'

const Table = () => {
  const [token] = React.useContext(UserContext);
  const [leads, setLeads] = useState([]);

  const [errorMessage, setErrorMessage] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  // const [leadId, setLeadId] = useState(null);
  const [id, setId] = useState(null);

  const handleUpdate = async (id) => {
    // setLeadId(id);
    setId(id);
    console.log(id);
    setActiveModal(true);
  }

  const handleDelete = async (id) => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };

    const response = await fetch(`/api/leads/${id}`, requestOptions);
    if(!response.ok) {
      setErrorMessage('Failed to delete lead');
      return;
    }
    getLeads();
  }

  const getLeads = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    };

    const response = await fetch('/api/leads', requestOptions);

    if (!response.ok) {
      setErrorMessage('Something went wrong');
      return;
    }
    const data = await response.json();
    setLeads(data);
    setLoaded(true);
  }

  useEffect(() => {
    getLeads();
  }, []);

  const handleModal = () => {
    setActiveModal(!activeModal);
    getLeads();
    setId(null);
  }

  return (
    <>
      <LeadModal
        active={activeModal} 
        handleModal={handleModal} 
        token={token} 
        id={id} 
        setErrorMessage={setErrorMessage}
      />

      <button className="button is-fullwidth mb-5 is-primary" onClick={
        () => {
          setActiveModal(true);
        }
      }>
        Create Lead
      </button>

      <ErrorMessage message={errorMessage} />
      {loaded && leads.length > 0 ? (
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th> First Name </th>
                <th> Last Name </th>
                <th> Company </th>
                <th> Email </th>
                <th> Note </th>
                <th> Last Updated </th>
                <th> Actions </th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td> {lead.first_name} </td>
                  <td> {lead.last_name} </td>
                  <td> {lead.company} </td>
                  <td> {lead.email} </td>
                  <td> {lead.note} </td>
                  <td> {moment(lead.last_updated).format('DD MM YYYY')} </td>
                  <td>
                    <button 
                      className="button mr-2 is-info is-light"
                      onClick={() => {
                        // console.log(lead.id);
                        handleUpdate(lead.id)
                        
                        }}>
                        Update
                    </button>
                    
                    <button 
                      className="button mr-2 is-danger is-light" 
                      onClick={() => handleDelete(lead.id)}>
                        Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      ): (
        <p>Loading</p>
      )}
    </>
  )
}

export default Table