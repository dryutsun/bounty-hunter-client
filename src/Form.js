import {useState} from 'react'


function Form(props) {

    // Helper Method in COMPONENT?
    
    const [newBounty, setNewBounty] = useState({
        name: "",
        wantedFor: "",
        client: "",
        reward: 100000,
        captured: false
    })
    
    const handleChange = (e) => {
        setNewBounty({...newBounty, [e.target.name]: e.target.value})
        // Otherwise we have a shit ton of state, so we can manipulate one single state value...?
        //
    }

    const handleCheck = (e) => {
        setNewBounty({...newBounty, [e.target.name]: e.target.checked})
    }

    const postBounty = (e) => {
        e.preventDefault()
        let preJSONBody = {
            name: newBounty.name,
            wantedFor: newBounty.wantedFor,
            client: newBounty.client,
            reward: Number(newBounty.reward),
            captured: Boolean(newBounty.checked)
        }
        fetch('http://localhost:8001/bounties', {
            method: 'POST',
            body: JSON.stringify(preJSONBody),
            headers: {'Content-Type':'application/json'}
        })
            .then(response => response.json())
            .then(postedBounty => {
                props.refreshBounties()
                setNewBounty({
                    name: "",
                    wantedFor: "",
                    client: "",
                    reward: 100000,
                    captured: false
                })
                

            })
            .catch(err=>console.table(err))
    }

    return(
        <form onSubmit={postBounty}>
            <div>
                <label htmlFor="name">Name:</label>
                <input onChange={handleChange} type="text" name="name" id="name" value={newBounty.name}/>
            </div>
            <div>
                <label htmlFor="client">Client: </label>
                <input onChange={handleChange} type="text" name="client" id="client" value={newBounty.client}/>
            </div>
            <div>
                <label htmlFor="wantedFor">Wanted For: </label>
                <input onChange={handleChange} type="text" name="wantedFor" id="wantedFor" value={newBounty.wantedFor}/>
            </div>
            <div>
                <label htmlFor="reward">Reward</label>
                <input onChange={handleChange} type="number" name="reward" id="reward" value={newBounty.reward}/>
            </div>
            <div>
                <label htmlFor="captured">Captured?</label>
                <input type="checkbox" name="captured" id="captured"
                    onChange={handleCheck} checked={newBounty.captured ? "checked" : ""} />
            </div>
            <input type="submit" value="POST" />
        </form>
    )
}

export default Form