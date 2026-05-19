const PersonForm = ({ addPerson, newName, newNumber, handlePersonAdd, handlePersonNumberAdd }) => {
    return (
        <>
            <form onSubmit={addPerson}>
                <div> name: <input value={newName} onChange={handlePersonAdd}/> </div>
                <div> number: <input value={newNumber} onChange={handlePersonNumberAdd}/> </div>
                <div> <button type="submit">add</button> </div>
            </form>
        </>
    )
}

export default PersonForm;