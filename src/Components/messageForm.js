import React,{useState,useEffect,useRef} from "react";
import {useLocation, Link} from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import { SendCheckFill} from 'react-bootstrap-icons';
import Cookies from 'universal-cookie';
import { db, storage } from '../firebase';
import { collection, query, where, onSnapshot, addDoc, Timestamp, orderBy } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

let ChatMsg = () => {

  let scrollRef = useRef();
  let cookies = new Cookies();
  let UserId = cookies.get('userid');
  let Username = cookies.get('name');
  let data = useLocation();
  const queryId = data.state.id;
  const queryTitle = data.state.title;
  let path = '/query/' + queryId + '/view';
  
  
  let queryText = () => {
    return (
      <>
         <Link className="link" to={path}>{queryTitle}</Link> 
      </>
    );
}

  let [msg, setmsg] = useState(queryTitle?queryText():"");
  let [allmsgs, setallMsgs] = useState([]);

  let selectUser = async() => {
    // let sender = UserId.toString();
    
    let id = "earnser";

    if(id){
      let msgsRef = collection(db, "messages", id, "chat");
      let q = query(msgsRef, orderBy("createdAt", "asc"));
      
      await onSnapshot(q, (querySnapshot) => {
        let getmsgs = [];
        querySnapshot.forEach((doc) => {
          getmsgs.push(doc.data());
        });
        setallMsgs(getmsgs);
      });
    }
  }

  let sendMessage = async() => {
    let sender = UserId.toString();
    let name = Username.toString();
    let id = "earnser";

    await addDoc(collection(db, 'messages', id, 'chat'), {
        message: msg,
        sender: sender,
        name: name,
        createdAt: Timestamp.fromDate(new Date()),
    });
    await selectUser();
    // setmsg('');
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allmsgs]);

  useEffect(() => {
    selectUser();
  },[msg]);

    return (
        <>
            <div className="message-output my-3" >
                {
                    allmsgs.length &&
                    allmsgs.map((data,index) => {
                        return(
                            <div key={index} >
                                {
                                (UserId == data.sender)
                                ?<p className="text-right mx-5 my-2 currentUserMsg border ">
                                  <h6 className="text-left  mx-2 mt-2 text-uppercase chatUserName font-weight-bold ">{data.name}</h6>
                                  <p className="text-left ml-2">{data.message}</p>
                                 </p>
                                :<p className="mx-5 my-2 otherUsersMsg border ">
                                    <h6 className="text-left  mx-2 mt-2 text-uppercase chatUserName font-weight-bold">{data.name}</h6>
                                    <p className="ml-2">{data.message}</p>
                                 </p>
                                }
                            </div>
                        )
                    })
                }
            </div>
            
            <Form className="mb-3">
                <Row >
                    <Col md={11}>
                        <Form.Group >
                            <Form.Control type="text" placeholder="Type message..." onChange={(e)=>{setmsg(e.target.value)}} ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={1} className="">
                        <Button onClick={sendMessage} >
                            <SendCheckFill size={25} />
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default ChatMsg;