import React, { useState, useEffect } from "react";
import './SWMO.css';
import { Link } from "react-router-dom";
import SWMOMap from "../GoogleMaps/SWMOMap";
import axios from "axios";
import CommentForm from "../CommentForm/CommentForm";
import CommentList from "../CommentList/CommentList";
import useAuth from "../../hooks/useAuth";

const SWMO = () => {
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
              <div><h3 className="pi-title">SWMO Hunting Property</h3></div>
          </div>
        <div className="pi-contain">
            <div className="pi-image-contain">
                <img src ="/images/SWMO.jpg" className = "pi-image" alt = "pi course"/>
            </div>
            <div className="pi-map-contain">
                <SWMOMap/>
            </div>
        </div>
        <div className="about-listing"><h3 className="">90 Acres of prime hunting property!</h3></div>
        <div className="about-listing"><h3 className="">Price: $4500 | Currently Available | Message to Book </h3></div>
        <div>
        <div>
        </div>
        </div>
        <div>
            <div><CommentForm postComment = {postComment}/></div>
            <div><CommentList allComments = {allComments} deleteComment = {deleteComment} getAllComments = {getAllComments}/></div>
        </div>
    </div>
     );
}
 
export default SWMO;