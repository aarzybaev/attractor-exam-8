import {Route, Routes} from 'react-router-dom';
import Appbar from './components/Appbar/Appbar';
import Quotes from './containers/Quotes/Quotes';
import NewQuote from './containers/NewQuote/NewQuote';
import Aside from './components/Aside/Aside';
const App = () => (
  <>
    <header>
      <Appbar/>
    </header>
    <main className="container-fluid">
      <div className="row">
        <div className="col-3 mt-3">
          <Aside/>
        </div>
        <div className="col-9 mt-3">
          <Routes>
            <Route path="/" element={<Quotes/>} />
            <Route path="/quotes/:categoryID" element={<Quotes/>} />
            <Route path="/new-quote" element={<NewQuote/>} />
            <Route path="/quotes/:id/edit" element={<NewQuote/>}/>
            <Route path="*" element={<h1>Not found</h1>} />
          </Routes>
        </div>
      </div>
    </main>
    </>
    );

    export default App;
