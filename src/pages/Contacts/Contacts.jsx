import React from 'react'

function ContactInfo() {
  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-4">
      <h2 className="text-3xl font-bold text-white">Контакты</h2>
      <p className="text-lg text-gray-300">
        Мы всегда рады ответить на ваши вопросы.  Оставьте свое сообщение, и мы постараемся ответить вам в ближайшее время.
      </p>
    </div>
  );
}

function ContactForm() {
  return (
    <form className="flex flex-col space-y-4">
      <label className="text-gray-300 text-sm font-medium">Введите ваше имя</label>
      <input
        className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
        type="text"
        placeholder="Имя"
      />
      <label className="text-gray-300 text-sm font-medium">Введите ваш e-mail</label>
      <input
        className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
        type="email"
        placeholder="Email"
      />
      <label className="text-gray-300 text-sm font-medium">Введите ваш вопрос</label>
      <textarea
        className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
        rows="4"
        placeholder="Ваш вопрос"
      ></textarea>
      <button className="btn btn-primary">Отправить вопрос</button>
    </form>
  );
}

function CompanyInfo() {
  return (
    <div className="flex flex-col space-y-2 text-gray-300">
      <p>ООО "Росток"</p>
      <div className="flex items-center space-x-2">
        <svg
          className="w-5 h-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M2 5a2 2 0 002-2h12a2 2 0 002 2v10a2 2 0 00-2 2H4a2 2 0 00-2-2V5zm14.59 3.59L10 13.17l-2.59-2.58a.5.5 0 00-.71-.7l-1-1a.5.5 0 00-.71-.7L4.09 7.41a.5.5 0 10.71.7L7.17 10l2.59-2.59a.5.5 0 00-.71-.7z"
            clipRule="evenodd"
          />
        </svg>
        <p>+ 8 800 876-88-88</p>
      </div>
      <div className="flex items-center space-x-2">
        <svg
          className="w-5 h-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
           fillRule="evenodd"
           d="M2.003 5.884c.39-1.324 1.237-2.165 2.003-2.794l1.77-1.773a.333.333 0 01.468 0l.94.94a.333.333 0 00.468 0l1.77-1.773a.333.333 0 01.468 0l1.77 1.773a.333.333 0 00.468 0l.94.94a.333.333 0 00.468 0l1.77-1.773a.333.333 0 01.468 0l1.77 1.773c.39 1.324 1.237 2.165 2.003 2.794l.94.94a.333.333 0 01-.468.468l-1.77 1.773a.333.333 0 00-.468 0l-.94-.94a.333.333 0 00-.468 0l-1.77 1.773a.333.333 0 00-.468 0l-1.77-1.773c-.39-1.324-1.237-2.165-2.003-2.794l-.94-.94a.333.333 0 00-.468-.468l-1.77-1.773a.333.333 0 00-.468 0zM10 15a4 4 0 008 0v5a2 2 0 004-2v-5z"
                       clipRule="evenodd"
                     />
                   </svg>
                   <a href="mailto:contact@rostok.com" className="text-blue-500 hover:underline">contact@rostok.com</a>
                 </div>
               </div>
             );
           }

function Contacts() {
  return (
    <div className="container mx-auto px-4 py-16 bg-gray-800 text-white">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <ContactInfo />
        <ContactForm />
      </div>
      <CompanyInfo />
    </div>
  </div>
  )
}

export default Contacts