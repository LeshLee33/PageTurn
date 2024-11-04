import '../styles/CreateAnEntry.css';
import React, { useState} from 'react';
import { useParams } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import file_img from "../assets/file.svg"
import plus from "../assets/plus.svg"
import { useAuth } from '../components/AufContext';
import { addBook } from '../API/Books';

function CreateAnEntry() {
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);

  const { id } = useParams();
  console.log(id)

  const {nickname,aufToken} = useAuth();

  const [selected_tags, setSelectedTags] = useState([]);
  const tags = [
    'Фантастика',
    'Фэнтези',
    'Научная фантастика',
    'Приключения',
    'Роман',
    'Драма',
    'Комедия',
    'Триллер',
    'Ужасы',
    'Мистика',
    'Исторический роман',
    'Классика',
    'Поэзия',
    'Современная проза',
    'Литература для детей',
    'Молодежная литература',
    'Детектив',
    'Автобиография',
    'Сказки',
    'Эссе',
    'Психология',
    'Социальная фантастика',
    'Эпопея',
    'Отношения',
    'Криминал',
    'Мифология',
    'Легенды',
    'Философия',
    'Журналистика',
    'Кулинария',
    'Аниме',
    'Ранобэ',
    'Историческая фантастика',
    'Постапокалиптика',
    'Супергерои',
    'Хоррор',
    'Спорт',
    'Семейные отношения',
    'Фантастические существа',
    'Нон-фикшн',
    'Трилогия',
    'Дилогия',
    'ЛитРПГ',
    'Комиксы',
    'Современные мифы',
    'Экспериментальная проза',
    'Стейплер',
    'Киберпанк',
    'Попаданец',
    'Выживание'
  ];

  const add_tag = (tag) => {
    if (!selected_tags.includes(tag)) {
      setSelectedTags([...selected_tags, tag]);
    }
  };

  const del_tag = (tag) => {
    setSelectedTags(selected_tags.filter(t => t !== tag));
  };

  

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    const allowedFileTypes = ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedFileTypes.includes(file.type)) {
      setFile(file);
    } else {
      console.error(`File type not allowed: ${file.type}`);
    }
  };

  const resetFile = () => {
    setFile(null);
    document.getElementById('file').value = '';
  };

  const submitFunc = async () => {
    try {
      const release_date = new Date().toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
      
      const data = await addBook(aufToken, title, nickname, release_date, content, selected_tags, file);
      if (data==null) alert('add Book failed: ');
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='CreateAnEntry-container'>
      <NavigationBar />

      <div className='input-container'>
        <div className='title'>Название:</div>
        <input type="text" id="title" className='input-title' value={title} onChange={(e) => setTitle(e.target.value)}/>

        <div className='title'>Описание:</div>
        <textarea id="content" className='input-content' value={content} onChange={(e) => setContent(e.target.value)}></textarea>

        <div className='title'>Добавить файл:</div>
        <div className='file-input-container'>
          <input type="file" id="file" className='input-file' onChange={handleFileChange} accept=".pdf, .docx, .txt" multiple={false} />
          <div className='drag-and-drop-area' onDragOver={handleDragOver} onDrop={handleDrop}>
            {file ? (
              <p><div className='img-container'><img src={file_img} alt="file" className="file" /> {file.name}</div></p>
            ) : (
              <p><img src={plus} alt="file" className="file" /></p>
            )}
          </div>
          <button className='reset-file-button' onClick={resetFile}>Сбросить файл</button>
        </div>

        <div className='title'>Выбор тегов:</div>
        <div className='tags-container'>
          {selected_tags.map((tag, index) => (
            <button key={index} onClick={() => del_tag(tag)} className='tag-button-selected'>{tag}</button>
          ))}
        </div>
        <div></div>

        <div className='tags-container'>
          {tags.map((tag, index) => (
            <button key={index} onClick={() => add_tag(tag)} className="tag-button">{tag}</button>
          ))}
        </div>

        <button  type="submit" className='submit-button' onClick={() => submitFunc()}>Подтвердить</button>
      </div>

    </div>
  );
}

export default CreateAnEntry;