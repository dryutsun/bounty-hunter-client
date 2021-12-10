function Display(props) {
    let display
    console.log(props.bounty)
    if (props.bounty.name) {
        display=(
            <>
                <h1>{props.bounty.name}</h1>
                <p>Wanted for: {props.bounty.wantedFor}</p>
                <p>Last seen: {props.bounty.lastSeen ? props.bounty.lastSeen : 'Unknown'}</p>
            </>
        )
    } else {
        display=(<p>Click more an any bounty to learn more.</p>)
    }
    return (
        <>
            {display}
        </>
    )
}

export default Display