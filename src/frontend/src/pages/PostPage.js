import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import '../styles/PostPage.css'
import { useParams } from 'react-router-dom';
import Bookmark21 from '../assets/bookmark21.svg'
import Bookmark22 from '../assets/bookmark22.svg'


function PostPage() {
    const { id } = useParams();
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(!clicked); 
    };

    const [book, setBook] =  useState (
        {
            id: 1,
            name: "Заголовок этого произведени",
            author: "George Orwell",
            tags: ["dystopian", "politics", "science fiction"],
            creationDate: "2024-06-08",
            content: "В вестибюле пахло вареной капустой и старыми половиками. Против входа на стене висел цветной плакат, слишком большой для помещения. На плакате было изображено громадное, больше метра в ширину, лицо – лицо человека лет сорока пяти, с густыми черными усами, грубое, но по-мужски привлекательное. Уинстон направился к лестнице. К лифту не стоило и подходить. Он даже в лучшие времена редко работал, а теперь в дневное время электричество вообще отключали. Действовал режим экономии – готовились к Неделе ненависти. Уинстону предстояло одолеть семь маршей; ему шел сороковой год, над щиколоткой у него была варикозная язва; он поднимался медленно и несколько раз останавливался передохнуть. На каждой площадке со стены глядело все то же лицо. Портрет был выполнен так, что, куда бы ты ни стал, глаза тебя не отпускали. СТАРШИЙ БРАТ СМОТРИТ НА ТЕБЯ – гласила подпись.В квартире сочный голос что-то говорил о производстве чугуна, зачитывал цифры. Голос шел из заделанной в правую стену продолговатой металлической пластины, похожей на мутное зеркало. Уинстон повернул ручку, голос ослаб, но речь по-прежнему звучала внятно. Аппарат этот (он назывался телекран) притушить было можно, полностью же выключить – нельзя. Уинстон отошел к окну: невысокий тщедушный человек, он казался еще более щуплым в синем форменном комбинезоне партийца. Волосы у него были совсем светлые, а румяное лицо шелушилось от скверного мыла, тупых лезвий и холода только что кончившейся зимы."
        })
    
    console.log(id)
    return (
        <div className='PostPage-container'>
            <NavigationBar />
            <div className='page-container'>
                <div className='date'>{book.creationDate}</div>
                <div className='title'>
                    <div className='name'>{book.name}</div>

                    <div className='bookmark2' onClick={handleClick} style={{ userSelect: 'none' }}>
                        {clicked ? 
                            <img src={Bookmark22}  alt="Bookmark Icon 1" /> :
                            <img src={Bookmark21}  alt="Bookmark Icon 2" />
                        }
                    </div>

                </div>

                <h3 className='author'>{book.author}</h3>
                <h3 className='content'>{book.content}</h3>

            </div>
       </div>
    );
}

export default PostPage;