


interface IMessage{
    message : string;
    // isSender : boolean;
}

export default function Message(props:IMessage){
    return(<>
    <div className="messContainer" style={{}}>
        <p>{props.message}</p>

    </div>
    </>)
}