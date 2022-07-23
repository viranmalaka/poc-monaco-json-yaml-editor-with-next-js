import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import dynamic from "next/dynamic";
// import Editor from "../components/editor";
const MonacoEditor = dynamic(() => import("../components/MonacoEditor"), { ssr: false });

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <MonacoEditor />
    </div>
  )
}

export default Home
