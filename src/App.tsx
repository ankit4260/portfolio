import { useTheme } from "./useTheme"
import { Layout, Divider } from "./Layout"
import { Nav }       from "./Nav"
import { Hero }      from "./Hero"
import { Projects }  from "./Projects"
import { Stack }     from "./Stack"
import { Education } from "./Education"
import { Activity }  from "./Activity"
import { Thought }   from "./Thought"
import { Footer }    from "./Contact"

function App() {
  const { theme, toggle } = useTheme()

  return (
    <Layout>
      <Nav theme={theme} onToggle={toggle} />
      <Divider />

      <Hero />

      <Projects />
      <Divider />

      <Stack />
      <Divider />

      <Education />
      <Divider />

      <Activity />
      <Divider />

      <Thought />
      <Divider />

      <Footer />
    </Layout>
  )
}

export default App
