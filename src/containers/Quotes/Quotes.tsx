import {useCallback, useEffect, useState} from 'react';
import {ApiQuotes, Quote} from '../../type';
import axiosAPI from '../../axiosAPI';
import Spinner from '../../components/Spinner/Spinner';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {CATEGORY} from '../../constants';

const Quotes = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const fetchQuotes = useCallback(async () => {
    setIsLoading(true);
    let subURL = '/quotes.json';

    if (params.categoryID) {
      subURL += `?orderBy="category"&equalTo="${params.categoryID}"`;
    }
    const response = await axiosAPI.get<ApiQuotes | null>(subURL);
    const quotes = response.data;

    if (quotes) {
      setQuotes(Object.keys(quotes).map(id => ({
        ...quotes[id],
        id
      })));
    } else {
      setQuotes([]);
    }
    setIsLoading(false);
  }, [params.categoryID, quotes.length]);

  useEffect(() => {
    void fetchQuotes();
  }, [fetchQuotes]);

  let QuotesArea = <Spinner/>;

  const getCategoryTitle = (id: string | undefined) => {
    let title = 'All';
    if (id) {
      const index = CATEGORY.findIndex(item => item.id === params.categoryID);
      title = CATEGORY[index].title;
    }
    return title;
  };

  const deleteQuote = async (id: string | undefined) => {
    if (id) {
      try {
        await axiosAPI.delete('/quotes/' + id + '.json');
      } catch (e) {
        console.log(e);
      }
    }
    navigate('/');
  };
  if (!isLoading) {
    QuotesArea = (
      <>
        <h4>{getCategoryTitle(params.categoryID)}</h4>
        <div className="d-flex flex-column gap-3">
          {
            quotes.map(quote => (
              <div key={quote.id} className="card">
                <div className="card-header">
                  Quote
                </div>
                <div className="card-body">
                  <blockquote className="blockquote mb-0">
                    <p>{quote.text}</p>
                    <footer className="blockquote-footer">{quote.author}
                    </footer>
                  </blockquote>
                </div>
                <div className="d-flex justify-content-end m-1">
                  <Link className="btn btn-warning btn-sm" to={'/quotes/' + quote.id + '/edit'}>Edit</Link>
                  <button className="btn btn-danger btn-sm ms-1" onClick={() => deleteQuote(quote.id)}>Delete</button>
                </div>
              </div>
            ))
          }
        </div>
      </>
    );
  }

  return QuotesArea;
};

export default Quotes;