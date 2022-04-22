import Head from "next/head";
import styles from "../styles/Home.module.css";
import { io } from "socket.io-client";
import { useState } from "react";
const socket = io("http://localhost:8000", { transports: ["websocket"] });

export default function Home() {
  const chatInput = document.getElementById("chatInput");
  const [message, setMessage] = useState(chatInput);

  const handlePost = (ev) => {
    console.log(ev);
    socket.emit("postMessage", { post: message });
    chatInput.value = "";
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>socket.io chat</title>
        <meta name="description" content="socket.io chat project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>socket.io chat</h1>
        </header>
        <div className={styles.subcontainer}>
          <ul className={styles.messages}></ul>
          <form
            onSubmit={(ev) => {
              ev.preventDefault();
              handlePost(ev);
            }}
            className={styles.input}
          >
            <input
              key="chatInput"
              id="chatInput"
              type="text"
              onChange={(ev) => {
                console.log(ev);
                setMessage(ev.target.value);
              }}
            />
            <input type="submit" />
          </form>
        </div>
      </main>
    </div>
  );
}
