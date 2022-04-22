import Head from "next/head";
import styles from "../styles/Home.module.css";
import { io } from "socket.io-client";
import { useState, useRef, useEffect } from "react";
import SendButton from "./components/SendButton";
import ScrollToNewest from "./components/ScrollToNewest";
import MessageBubble from "./components/MessageBubble";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

const socket = io("http://localhost:8000", { transports: ["websocket"] });

export default function Home() {
  const [currentMessages, setCurrentMessages] = useState([]);
  const [showAnim, setShowAnim] = useState(false);
  const [message, setMessage] = useState("");

  socket.on("newMessage", (data) => {
    setCurrentMessages([...currentMessages, data]);
  });

  const handleSendMessage = (ev) => {
    socket.emit("postMessage", { post: message });
    setCurrentMessages([
      ...currentMessages,
      {
        id: uuidv4(),
        message: message,
        timestamp: dayjs().format(),
        author: "user",
        recd: false,
      },
    ]);
    ev.target.chatInput.value = "";
    console.log(currentMessages);
  };

  console.log();

  return (
    <div className={styles.PageContainer}>
      <Head>
        <title>socket.io chat</title>
        <meta name="description" content="socket.io chat project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.MainContainer}>
        <header className={styles.ChatAppHeader}>
          <h1 className={styles.ChatAppHeaderTitle}>socket.io chat</h1>
        </header>
        <div className={styles.ChatAppContainer}>
          {/* <div className={styles.ChatSidebarContainer}></div> */}
          <div className={styles.ChatMessagesContainer}>
            <ul className={styles.ChatMessages}>
              {currentMessages.map((message) => {
                return <MessageBubble key={message.id} message={message} />;
              })}
              <ScrollToNewest />
            </ul>
            <form
              className={styles.ChatInputContainer}
              onSubmit={(ev) => {
                ev.preventDefault();
                handleSendMessage(ev);
              }}
            >
              <input
                className={styles.ChatInputField}
                key="chatInput"
                id="chatInput"
                type="text"
                autoComplete="off"
                onChange={(ev) => {
                  setMessage(ev.target.value);
                }}
              />
              <SendButton />
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
