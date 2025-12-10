import { BrowserRouter as Router } from "react-router-dom"
import Header from "@widgets/header.ui"
import Footer from "@widgets/footer.ui"
import PostsManagerPage from "@pages/home"
import { ModalRoot } from "@shared/store/modal/modal-root"

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <PostsManagerPage />
        </main>
        <Footer />
      </div>
      <ModalRoot />
    </Router>
  )
}

export default App
