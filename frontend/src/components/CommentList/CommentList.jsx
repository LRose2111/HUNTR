import React from "react";
import './CommentList.css';
import Comment from "../Comment/Comment";


const CommentList = (props) => {

    
    return ( 
        <div>
        {props.allComments.map((comment) => { //use curly brackets to write JavaScript within HTML. The index will iterate the index values (Note it starts at 0)
        return (
            <div className = 'comm-list-contain' >
                <div className="list-text">Username:<span className="red-text">{comment.user.username} </span></div>
                <div className="list-text">Comment:<span className="red-text">{comment.text}</span></div>
                <div><Comment id={comment.id} {...props}/></div>
                {/* <div><ReplyList id={comment.id} {...props}/></div> */}
            </div>
        )
        })}
        </div>   
     );
}
 
export default CommentList;