import React, { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import '../styles/PostPage.css';
import { getBookInfo, getDoc, getDoc_for_use } from '../API/Books';
import mammoth from 'mammoth';

function PostPage() {
    const { book_id } = useParams();
    const [bookData, setBookData] = useState(null); 
    const [docContent, setDocContent] = useState('');


    const getDocFromAPI = async (bookID) => {
        try {
            const fileData = await getDoc_for_use(bookID);
            const arrayBuffer = await fileData.arrayBuffer();
            const { value } = await mammoth.convertToHtml({ arrayBuffer }); 
            setDocContent(value); 
        } catch (error) {
            console.error("Ошибка при получении документа:", error);
        }
    };

    useEffect(() => {
        const getBook = async () => {
            try {  
                const data = await getBookInfo(book_id);
                setBookData(data);
                console.log(bookData)
                console.log("Get book information");
            } catch (error) {
                console.log("error", error);
            }
        };
        getBook();
        getDocFromAPI(book_id);
    }, [book_id]); 

    

    const uploadFunc = async (bookID) => {
        getDoc(bookID);
    };

    if (!bookData) {
        console.log(bookData)
        return <div>Loading...</div>; 
        
    }
    return (
        <div className='PostPage-container'>
            <NavigationBar />
            <div className='page-container'>
                <div className='date'>{bookData.release_date}</div>
                <div className='title'>
                    <div className='name'>{bookData.title}</div>
                </div>

                

                <h3 className='author'>{bookData.author}</h3>
                <h3 className='content'>{bookData.description}</h3>

                <div className='tags'>
                    {bookData.tags.map((tag, index) => (
                        <span key={index} className='tag'>{tag}</span>
                    ))}
                </div>
                <div>
                <button type="button" className="upload-button" onClick={() => uploadFunc(book_id)}>Скачать</button>
                </div>
                <div className='doc-content'>
                    <h3>Содержание:</h3>
                    <div className='doc-text' dangerouslySetInnerHTML={{ __html: docContent }} />
                </div>
                <div className='saving-count'>В закладках: {bookData.saving_count}</div>
                
            </div>
        </div>
    );
}
export default PostPage;