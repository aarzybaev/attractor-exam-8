import React, {useEffect, useState} from 'react';
import {CATEGORY} from '../../constants';
import {ApiQuote} from '../../type';
import axiosAPI from '../../axiosAPI';
import {useNavigate, useParams} from 'react-router-dom';

const NewQuote = () => {

  const [quote, setQuote] = useState({
    'category': CATEGORY[0].id,
    'author': '',
    'text': ''
  });

  const navigate = useNavigate();

  const params = useParams();
  let content;
  const changeQuote = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setQuote(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const category = CATEGORY.map(
    item => {
      if (item.id === quote.category) {
        return <option key={item.id} value={item.id} selected>{item.title}</option>;
      }
      return <option key={item.id} value={item.id}>{item.title}</option>;
    }
  );

  const toCreateQuote = async () => {
    try {
      await axiosAPI.post<ApiQuote | null>('/quotes.json', quote);
    } catch (e) {
      console.log(e);
    }
  };

  const toEditeQuote = async (id: string) => {
    try {
      await axiosAPI.put<ApiQuote | null>('/quotes/' + id + '.json', quote);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchPost = async () => {
    const response = await axiosAPI.get<ApiQuote | null>('/quotes/' + params.id + '.json');
    if (response.data) {
      setQuote(response.data);
    } else {
      navigate('/' + params.id);
    }
  };

  useEffect(() => {
    if (params.id) {
      void fetchPost();
    }
  }, []);

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (params.id) {
      void toEditeQuote(params.id);
    } else {
      void toCreateQuote();
    }
    navigate('/quotes/' + quote.category);
  };

  if (params.id) {

    content = (
      <form onSubmit={onFormSubmit} autoComplete="off">
        <h4>Add new quote</h4>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            className="form-select"
            onChange={changeQuote}
            required={true}>
            {category}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="title">Author</label>
          <input
            type="text"
            name="author"
            id="author"
            className="form-control"
            value={quote.author}
            onChange={changeQuote}
            required={true}
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">Quote text</label>
          <textarea style={{height: '200px'}}
                    name="text"
                    id="text"
                    className="form-control"
                    value={quote.text}
                    onChange={changeQuote}
                    required={true}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">Submit</button>
      </form>
    );

  } else {
    content = (
      <form onSubmit={onFormSubmit} autoComplete="off">
        <h4>Add new quote</h4>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            className="form-select"
            onChange={changeQuote}
            required={true}>
            {category}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="title">Author</label>
          <input
            type="text"
            name="author"
            id="author"
            className="form-control"
            value={quote.author}
            onChange={changeQuote}
            required={true}
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">Quote text</label>
          <textarea style={{height: '200px'}}
                    name="text"
                    id="text"
                    className="form-control"
                    value={quote.text}
                    onChange={changeQuote}
                    required={true}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">Submit</button>
      </form>
    );
  }


  return content;
};

export default NewQuote;