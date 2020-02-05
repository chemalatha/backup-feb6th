import React from 'react';
import { connect } from 'react-redux'
const imgStyle = {
  hight: 'auto',
  width: '80%',
  border: '4px solid RebeccaPurple ',
  borderRadius: '5%'
};
const articleStyle = {
width: '50%',
margin: '0 auto',
color: 'olive',
border: '4px solid RebeccaPurple ',
}
let NewsItem = ({ article }) => (

article ?
article.map((item) => {
    return (
        <article key={item.id} style={articleStyle}>
            <div className="media">
            <div className="media-left">
                <img src={item.imageUrl} className="media-object" />
            </div>
            <div className="media-body">
                <h4 className="media-heading">{item.productName}</h4>
                <p>{item.description}</p>
            </div>
        </div>
        
        </article>
    )
})
 :
null
);

const mapStateToProps = (state) => (
{  
   article: state.news
})

NewsItem = connect(mapStateToProps,null)(NewsItem)
export default NewsItem;