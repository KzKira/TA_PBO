import React, { useState, useRef, useEffect } from 'react';
import styles from './style.module.css';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Halo! Ada yang bisa saya bantu mengenai kursus kami?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // 1. Tambahkan pesan user ke UI
        const newLocalMessages = [...messages, { role: 'user', content: input }];
        setMessages(newLocalMessages);
        
        setInput('');
        setIsLoading(true);

        try {
            // 2. Siapkan history untuk dikirim ke API
            // Kita ambil 10 pesan terakhir saja agar tidak terlalu berat (opsional)
            const historyToSend = messages.slice(-10); 

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    message: input,
                    history: historyToSend // <--- INI PENTING: Kirim history lama
                }),
            });

            const data = await response.json();
            
            // 3. Tambahkan balasan AI ke UI
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: data.reply || "Maaf, terjadi kesalahan." 
            }]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: "Maaf, saya sedang offline saat ini." 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.chatWidget}>
            {isOpen && (
                <div className={styles.chatWindow}>
                    <div className={styles.header}>
                        <span>AI Assistant</span>
                        <button onClick={() => setIsOpen(false)} style={{background:'none', border:'none', color:'white', cursor:'pointer'}}>✕</button>
                    </div>
                    <div className={styles.messages}>
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`${styles.message} ${msg.role === 'user' ? styles.userMessage : styles.aiMessage}`}>
                                {msg.content}
                            </div>
                        ))}
                        {isLoading && <div className={styles.message} style={{fontStyle:'italic', color:'#888'}}>Sedang mengetik...</div>}
                        <div ref={messagesEndRef} />
                    </div>
                    <form className={styles.inputArea} onSubmit={handleSend}>
                        <input 
                            className={styles.input}
                            type="text" 
                            placeholder="Tulis pesan..." 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button type="submit" className={styles.sendButton}>➤</button>
                    </form>
                </div>
            )}
            
            <button className={styles.toggleButton} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? '✕' : '💬'}
            </button>
        </div>
    );
};

export default Chatbot;