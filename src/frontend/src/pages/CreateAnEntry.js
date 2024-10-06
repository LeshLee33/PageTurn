import '../styles/CreateAnEntry.css';
import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar';

function CreateAnEntry() {
  const [selected_tags, setSelectedTags] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

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

  const submitFunc = () => {
    console.log(selected_tags, title, content)
  }

  return (
    <div className='CreateAnEntry-container'>
      <NavigationBar />

      <div className='input-container'>
        <div className='title'>Название:</div>
        <input type="text" id="title" className='input-title' value={title} onChange={(e) => setTitle(e.target.value)}/>

        <div className='title'>Содержание:</div>
        <textarea id="content" className='input-content' value={content} onChange={(e) => setContent(e.target.value)}></textarea>
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


        <button className='submit-button' onClick={() => submitFunc()}>Подтвердить</button>
      </div>

    </div>
  );
}

export default CreateAnEntry;