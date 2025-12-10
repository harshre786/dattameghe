"use client";

import { useState } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    const newMessages = [...messages, { text: inputValue, sender: 'user' as 'user' }];
    setMessages(newMessages);
    setInputValue('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputValue }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response from the bot');
      }

      const data = await response.json();
      setMessages([...newMessages, { text: data.response, sender: 'bot' as 'bot' }]);
    } catch (error) {
      console.error(error);
      setMessages([...newMessages, { text: 'Sorry, something went wrong.', sender: 'bot' as 'bot' }]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button onClick={() => setIsOpen(!isOpen)} className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
        Chat
      </button>
      {isOpen && (
        <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg w-80 h-96 flex flex-col">
          <div className="p-4 border-b border-gray-500">
            <h3 className="text-lg font-bold">AstroBot</h3>
          </div>
          <div className="flex-grow p-4 overflow-y-auto">
            {messages.map((msg, i) => (
              <div key={i} className={`my-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <p className={`p-2 rounded-lg inline-block ${msg.sender === 'user' ? 'bg-blue-500' : 'bg-gray-700'}`}>
                  {msg.text}
                </p>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-500 flex">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask something..."
              className="bg-gray-800 text-white rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
            />
            <button onClick={handleSendMessage} className="bg-blue-500 text-white rounded-r-md px-4 py-2 hover:bg-blue-600">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
