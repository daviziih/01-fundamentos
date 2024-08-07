import { Post } from './components/Post'
import { Header } from './components/Header'
import { SideBar } from './components/Sidebar'

import './global.css'
import styles from './App.module.css'

export function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <SideBar />
        <main>
          <Post
            author="Davi Gabriel"
            content="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates quas, consequuntur pariatur deleniti facilis accusantium, suscipit, deserunt ut earum debitis expedita illo et odio? Tempora iusto at quas quo libero!"
          />
          <Post author="Davi Gabriel" content="Hello World" />
        </main>
      </div>
    </div>
  )
}
