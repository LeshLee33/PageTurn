import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import '../styles/PostPage.css'
import { useParams } from 'react-router-dom';
import Like from '../assets/like.svg'
import Dislike from '../assets/dislike.svg'


function PostPage() {
    const { id } = useParams();

    const[checkLike, setCheckLike] = useState(0)

    const [book, setBook] =  useState (
        {
            id: 1,
            name: "Заголовок этого произведени",
            author: "George Orwell",
            tags: ["dystopian", "politics", "science fiction"],
            creationDate: "2024-06-08",
            likes: 2500,
            dislikes: 300,
            content: "В вестибюле пахло вареной капустой и старыми половиками. Против входа на стене висел цветной плакат, слишком большой для помещения. На плакате было изображено громадное, больше метра в ширину, лицо – лицо человека лет сорока пяти, с густыми черными усами, грубое, но по-мужски привлекательное. Уинстон направился к лестнице. К лифту не стоило и подходить. Он даже в лучшие времена редко работал, а теперь в дневное время электричество вообще отключали. Действовал режим экономии – готовились к Неделе ненависти. Уинстону предстояло одолеть семь маршей; ему шел сороковой год, над щиколоткой у него была варикозная язва; он поднимался медленно и несколько раз останавливался передохнуть. На каждой площадке со стены глядело все то же лицо. Портрет был выполнен так, что, куда бы ты ни стал, глаза тебя не отпускали. СТАРШИЙ БРАТ СМОТРИТ НА ТЕБЯ – гласила подпись.В квартире сочный голос что-то говорил о производстве чугуна, зачитывал цифры. Голос шел из заделанной в правую стену продолговатой металлической пластины, похожей на мутное зеркало. Уинстон повернул ручку, голос ослаб, но речь по-прежнему звучала внятно. Аппарат этот (он назывался телекран) притушить было можно, полностью же выключить – нельзя. Уинстон отошел к окну: невысокий тщедушный человек, он казался еще более щуплым в синем форменном комбинезоне партийца. Волосы у него были совсем светлые, а румяное лицо шелушилось от скверного мыла, тупых лезвий и холода только что кончившейся зимы."
        })
    
    const handleLike = () => {
        if (checkLike==1){
            setBook(prevBook => ({
                ...prevBook,
                likes: prevBook.likes - 1
            }));
            setCheckLike(0)
        } else if (checkLike==0) {
            setBook(prevBook => ({
                ...prevBook,
                likes: prevBook.likes + 1
            }));
            setCheckLike(1)
        } else if (checkLike==2) {
            setBook(prevBook => ({
                ...prevBook,
                likes: prevBook.likes + 1,
                dislikes: prevBook.dislikes - 1
            }));
            setCheckLike(1)
        }
    }

    const handleDislike = () => {
        if (checkLike==2){
            setBook(prevBook => ({
                ...prevBook,
                dislikes: prevBook.dislikes - 1
            }));
            setCheckLike(0)
        } else if (checkLike==0) {
            setBook(prevBook => ({
                ...prevBook,
                dislikes: prevBook.dislikes + 1
            }));
            setCheckLike(2)
        } else if (checkLike==1) {
            setBook(prevBook => ({
                ...prevBook,
                likes: prevBook.likes - 1,
                dislikes: prevBook.dislikes + 1
            }));
            setCheckLike(2)
        }
    }
    
    console.log(id)
    return (
        <div className='PostPage-container'>
            <NavigationBar />
            <div className='page-container'>
                <div className='date'>{book.creationDate}</div>
                <div className='title'>
                    <div className='name'>{book.name}</div>
                    <div className='assessments'>
                        <div
                            className='like'
                            onClick={handleLike}
                            style={{
                                color: checkLike === 2 ? 'rgba(0, 0, 0, 0.2)' : 'initial',
                                opacity: checkLike === 2 ? 0.4 : 1
                            }}
                        >
                            <img src={Like}></img>
                            <div style={{color: "#3DFF5C"}}>{book.likes + " "}</div>
                        </div>
                        
                        {book.likes - book.dislikes}

                        <div
                            className='dislike'
                            onClick={handleDislike}
                            style={{
                                color: checkLike === 1 ? 'rgba(0, 0, 0, 0.2)' : 'initial',
                                opacity: checkLike === 1 ? 0.4 : 1
                            }}
                        >
                            <img src={Dislike}></img>
                            <div style={{color: "#DD3939"}}>{" " + book.dislikes}</div>
                        </div>
                    </div>
                </div>

                <h3 className='author'>{book.author}</h3>
                <h3 className='content'>{book.content}</h3>

            </div>
       </div>
    );
}

export default PostPage;