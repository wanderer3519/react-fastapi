import React, { useEffect, useState } from 'react'



const LeadModal = ({ active, handleModal, token, id, setErrorMessage }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {

    // console.log('LeadModal', id);
    const getLead = async () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const response = await fetch(`/api/leads/${id}`, requestOptions);
      if (!response.ok) {
        setErrorMessage('Something went wrong while fetching lead');
        return;
      }
      const data = await response.json();
      setFirstName(data.first_name);
      setLastName(data.last_name);
      setCompany(data.company);
      setEmail(data.email);
      setNote(data.note);
    };

    if(id){
      getLead();
    }
    else{
      cleanFormData();
    }
  }, [id, token]);

  const cleanFormData = () => {
    setFirstName('');
    setLastName('');
    setCompany('');
    setEmail('');
    setNote('');
  }

  const handleCreateLead = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        company: company,
        email: email,
        note: note
      })
    }



    const response = await fetch('/api/leads', requestOptions);
    if(!response.ok){
      setErrorMessage('Something went wrong while creating lead');
      return;
    }
    cleanFormData();
    handleModal();

  }

  const handleUpdateLead = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        company: company,
        email: email,
        note: note
      })
    }

    const response = await fetch(`/api/leads/${id}`, requestOptions);
    if(!response.ok){
      setErrorMessage('Something went wrong while updating lead');
      return;
    }

    cleanFormData();
    handleModal();
  }

  return (
    <div className={`modal ${active && 'is-active'}`}>
      <div className="modal-background" onClick={handleModal}>
        <div className="modal-card" onClick={(e) => e.stopPropagation()}>
          <header className='modal-card-head has-background-primary-light'>
            <h1 className='modal-card-title'> {id? "Update Lead": "Create Lead"} </h1>
          </header>

          <section className='modal-card-body'>
            <form>
              <div className='field'>
                <label className='label'> First Name </label>
                <div className="control">
                  <input 
                    type="text" 
                    placeholder='Enter First Name' 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className='input'
                    required
                  />
                </div>
              </div>


              <div className='field'>
                <label className='label'> Last Name </label>
                <div className="control">
                  <input 
                    type="text" 
                    placeholder='Enter Last Name' 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className='input'
                  />
                </div>
              </div>

              <div className='field'>
                <label className='label'> Company </label>
                <div className="control">
                  <input 
                    type="text" 
                    placeholder='Enter Company' 
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className='input'
                  />
                </div>
              </div>

              <div className='field'>
                <label className='label'> Email </label>
                <div className="control">
                  <input 
                    type="email" 
                    placeholder='Enter email' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='input'
                  />
                </div>
              </div>

              <div className='field'>
                <label className='label'> Note </label>
                <div className="control">
                  <input 
                    type="text" 
                    placeholder='Enter Note' 
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className='input'
                  />
                </div>
              </div>

            </form>
          </section>

          <footer className='modal-card-foot has-background-primary-light'>
            {id ? (
              <button className='button is-info' onClick={handleUpdateLead}>
                Update
              </button>
            ) : (
              <button className='button is-primary' onClick={handleCreateLead}>
                Create
              </button>
            )}
            <button className='button' onClick={handleModal}>
              Cancel
            </button>
          </footer>

        </div>
      </div>
    </div>
  )
}

export default LeadModal