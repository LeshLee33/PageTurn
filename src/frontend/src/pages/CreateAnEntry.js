import React from 'react';
import '../styles/CreateAnEntry.css';
import NavigationBar from '../components/NavigationBar';

function CreateAnEntry() {
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

  return (
    <div className='CreateAnEntry-container'>
      <NavigationBar />

      <div className='input-container'>
        <div className='title'>Название:</div>
        <input type="text" id="title" className='input-title' />

        <div className='title'>Содержание:</div>
        <textarea id="content" className='input-content'></textarea>
        <div className='title'>Выбор тэгов:</div>

        <div className='tags-container'>
          {tags.map((tag, index) => (
            <button key={index} className='tag-button'>{tag}</button>
          ))}
        </div>


        <button className='submit-button'>Подтвердить</button>
      </div>

    </div>
  );
}

export default CreateAnEntry;