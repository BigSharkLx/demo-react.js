import React from 'react';
import {Row,Col, Menu, Icon,Button, Modal,Form,Checkbox,Input,message,Card }from 'antd';
import{Link} from 'react-router';
export default class PCNewsImage
extends React.Component{
  constructor(){
    super();
    this.state={
      newsImage:''
    };
  }
  componentWillMount(){
    var myFetchOptions={
      method:'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="+this.props.type+"&count="+this.props.count , myFetchOptions).then(response=>response.json()).then(json=>this.setState({newsImage:json}));
  }
  render(){
    const styleImage = {
      display: "block",
      width: this.props.imageWidth,
      height: "90px"
    };
    const styeH3 = {
      width: this.props.imageWidth,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    };
    const {newsImage}=this.state;
    const newsList=newsImage.length
    ?
    newsImage.map((newsItem,index)=>
    (
      <div key={index} class="imageblock">
      <Link to={`details/${newsItem.uniquekey}`} target="_blank">
      <div class="custom-image">
      <img style={styleImage} src={newsItem.thumbnail_pic_s}/>
      </div>
      <div class="custom-card">
      <h3 style={styeH3}>
      {newsItem.title}
      </h3>
      <p>{newsItem.author_name}</p>
      </div>
      </Link>
      </div>
    ))
    :
    '没加载到新闻';


    return(
      <div class="topNewsList">
      <Card title={this.props.cardname} bordered={true}
      style={{width:this.props.width}} >
      {newsList}
      </Card>
      </div>
    );
  }
}
