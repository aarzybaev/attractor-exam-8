import {CATEGORY} from '../../constants';
import {Link} from 'react-router-dom';

const Aside = () => {
  const category = CATEGORY.map(
    item =>
      <Link key={item.id} to={'/quotes/' + item.id}
            className="list-group-item list-group-item-action">{item.title}</Link>
  );
  return (
    <aside>
      <h4>Category</h4>
      <div className="list-group">
        <Link to={'/'} className="list-group-item list-group-item-action">All</Link>
        {category}
      </div>
    </aside>
  );
};

export default Aside;