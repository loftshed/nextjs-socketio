import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
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
        <div className={styles.subcontainer}>stuff</div>
      </main>
    </div>
  );
}
