import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DraftCard from "../Drafts/draftcard";  
import "./yourdraft.css";  

const DraftsPage = () => {
    const [drafts, setDrafts] = useState([]);
    const navigate = useNavigate();
    const editorId = sessionStorage.getItem("editorId"); 
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const fetchDrafts = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/blogs/drafts/${editorId}`);
                setDrafts(response.data);
            } catch (error) {
                console.error("Error fetching drafts:", error);
            }
        };

        fetchDrafts();
    }, [editorId]);

    const handleDelete = async (id) => {
        try {
            const token = sessionStorage.getItem("token");  
            await axios.delete(`http://localhost:5000/blogs/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDrafts(drafts.filter(draft => draft.id !== id));
            setSuccessMessage("Blog deleted Successfully !")
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    };
    

    return (
        <div className="drafts-container">
            <h2 className="drafts-heading">Your Drafts</h2>
            {successMessage && (<div className="success-message">{successMessage}</div>)}
            {drafts.length > 0 ? (
                <div className="drafts-list">
                    {drafts.map((draft) => (
                        <DraftCard key={draft.id} blog={draft} onDelete={handleDelete} />
                    ))}
                </div>
            ) : (
                <p className="no-drafts">No drafts found.</p>
            )}
        </div>
    );
};

export default DraftsPage;
