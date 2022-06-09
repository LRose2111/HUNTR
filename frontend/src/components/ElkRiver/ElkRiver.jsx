import React, { useState, useEffect } from "react";
import './ElkRiver.css';
import { Link } from "react-router-dom";
import ElkRiverMap from "../GoogleMaps/ElkRiver";
import axios from "axios";
import CommentForm from "../../components/CommentForm/CommentForm";
import CommentList from "../CommentList/CommentList";
import LikeIndicator from "../LikeIndicator/LikeIndicator";
import useAuth from "../../hooks/useAuth";

const ElkRiver = () => {
    const [courseId, setCourseId] = useState(4);
    const [allComments, setAllComments] = useState([]);
    const [course, setCourse] = useState([]);
    const [user, token] = useAuth();

    useEffect(() => {
        getAllComments();
        getCourse();
        deleteComment();
      }, [])
    

    async function getAllComments(){
    let response = await axios.get(`http://127.0.0.1:8000/comment/${courseId}/`, {
        headers: {
        Authorization: 'Bearer ' + token
        }
    });
    setAllComments(response.data)   
    console.log(response.data) 
    }

    async function getCourse(){
    let response = await axios.get(`http://127.0.0.1:8000/course/${courseId}/`, {
        headers: {
        Authorization: 'Bearer ' + token
        }
    });
    setCourse(response.data)   
    console.log(response.data) 
    }


    async function postComment(text){
        let newComment = {
            text: text,
            course_id: courseId,
          }
        let response = await axios.post(`http://127.0.0.1:8000/course/`, newComment, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        });
        getAllComments();
      }
    
      async function postLike(){
        let response = await axios.put(`http://127.0.0.1:8000/course/${courseId}/`,{}, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        });
        getCourse();
      }

      async function postDisLike(){
        let response = await axios.patch(`http://127.0.0.1:8000/course/${courseId}/`,{}, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        });
        getCourse();
      }

      async function deleteComment(id){
        let response = await axios.delete(`http://127.0.0.1:8000/comment/${id}/`, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        });
        getAllComments();
      }

    return ( 
        <div className="entire-contain">
          <div>
              <div><h3 className="elkriver-title">Elk River Country Club</h3></div>
          </div>
        <div className="elkriver-contain">
            <div className="elkriver-image-contain">
                <img src ="/images/ERCC.jpg" className = "elkriver-image" alt = "elkriver course"/>
            </div>
            <div className="elkriver-map-contain">
                <ElkRiverMap/>
            </div>
        </div>
        <div>
        <div>
            <LikeIndicator postLike = {postLike} postDisLike = {postDisLike} course = {course} getCourse = {getCourse}/></div>
        </div>
        <div>
            <div><CommentForm postComment = {postComment}/></div>
            <div><CommentList allComments = {allComments} deleteComment = {deleteComment} getAllComments = {getAllComments}/></div>
        </div>
    </div>
     );
}
 
export default ElkRiver;