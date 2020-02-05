import React from 'react';
import Button from '../containers/Button';
import NewsItem from '../containers/NewsItem'
import Loading from '../containers/Loading'
let App = () => (
  <div>
     <Button />
     <Loading />
     <br/>
     <NewsItem />
  </div>
);
export default App;